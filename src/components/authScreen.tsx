import React, { useState } from 'react';
import type { FormEvent, ChangeEvent, MouseEvent } from 'react';
import { FileText, Mail, Check, AlertCircle } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { REQUEST_EMAIL_VERIFICATION } from '../auth/graphql/requestEmailVerification.mutation';
import { VERIFY_EMAIL_CODE } from '../auth/graphql/verifyEmailCode.mutation';
import { SIGN_UP } from '../auth/graphql/signUp.mutation';
import { SIGN_IN } from '../auth/graphql/signIn.mutation';

interface AuthScreenProps {
  setIsLoggedIn: (value: boolean) => void;
  setCurrentScreen: (screen: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ setIsLoggedIn, setCurrentScreen }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [showVerificationInput, setShowVerificationInput] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 상태 초기화 함수
  const resetForm = (): void => {
    setIsEmailVerified(false);
    setShowVerificationInput(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setAgreeToTerms(false);
    setVerificationCode('');
    setEmailSent(false);
    setError('');
  };

  // 이메일 인증 요청
  const [requestEmailVerification] = useMutation(REQUEST_EMAIL_VERIFICATION);
  const [verifyEmailCodeMutation] = useMutation(VERIFY_EMAIL_CODE);
  const [signUpMutation] = useMutation(SIGN_UP);
  const [signInMutation] = useMutation(SIGN_IN);

  const handleEmailVerification = async (): Promise<void> => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data } = await requestEmailVerification({
        variables: { email },
      });

      if (data?.requestEmailVerification) {
        setEmailSent(true);
        setShowVerificationInput(true);
      } else {
        setError('이메일 발송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('이메일 인증 요청 실패:', err);
      setError('이메일 발송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 인증번호 확인
  const handleVerification = async (): Promise<void> => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('인증번호 6자리를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data } = await verifyEmailCodeMutation({
        variables: {
          email,
          code: verificationCode,
        },
      });

      if (data?.verifyEmailCode === true) {
        setIsEmailVerified(true);
        setShowVerificationInput(false);
      } else {
        setError('인증번호가 올바르지 않습니다.');
      }
    } catch (err) {
      console.error(err);
      setError('서버 요청에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인 처리
  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data } = await signInMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      if (data?.signIn?.jwt) {
        // 👇 토큰 저장 (선택)
        localStorage.setItem('token', data.signIn.jwt);

        // 👇 로그인 상태 업데이트
        setIsLoggedIn(true);
        setCurrentScreen('home');
      } else {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } catch (err) {
      console.error(err);
      setError('서버 오류로 로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 처리
  const handleSignup = async (): Promise<void> => {
    if (!username || !password || !confirmPassword || !agreeToTerms) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data } = await signUpMutation({
        variables: {
          input: {
            email,
            username,
            password,
            confirmPassword,
            nickname: '', // 닉네임 없으면 빈 문자열
            termsAgreed: agreeToTerms,
          },
        },
      });

      if (data?.signUp?.token) {
        // 로그인 처리
        setIsLoggedIn(true);
        setCurrentScreen('home');
        resetForm();
        setIsLogin(true);
      } else {
        setError('회원가입에 실패했습니다.');
      }
    } catch (err: any) {
      console.error(err);

      const serverMessage =
        err?.graphQLErrors?.[0]?.message ?? '회원가입에 실패했습니다. 다시 시도해주세요.';

      if (serverMessage.includes('email already exists')) {
        setError('이미 가입된 이메일입니다.');
      } else {
        setError(serverMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isLogin) {
      handleLogin();
    } else {
      if (!isEmailVerified) {
        handleEmailVerification();
      } else {
        handleSignup();
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
  };

  const handleAgreeToTermsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAgreeToTerms(e.target.checked);
  };

  const handleModeToggle = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    resetForm();
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4 overflow-x-hidden">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ResumeLog</h1>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 입력 */}
          <div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={(!isLogin && isEmailVerified) || isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-left disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="이메일을 입력하세요"
              required
              title="이메일 주소를 입력해주세요"
            />
          </div>

          {/* 회원가입 - 이메일 인증 버튼 */}
          {!isLogin && !isEmailVerified && !showVerificationInput && (
            <button
              type="button"
              onClick={handleEmailVerification}
              disabled={!email || isLoading}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '이메일 발송 중...' : '이메일 인증하기'}
            </button>
          )}

          {/* 이메일 발송 완료 메시지 */}
          {!isLogin && emailSent && !isEmailVerified && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center justify-center space-x-2 text-orange-700">
                <Mail className="w-4 h-4" />
                <span className="text-sm">인증 이메일이 발송되었습니다.</span>
              </div>
            </div>
          )}

          {/* 인증번호 입력 */}
          {!isLogin && showVerificationInput && !isEmailVerified && (
            <div className="space-y-4">
              <input
                type="text"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-left"
                placeholder="인증번호 6자리를 입력하세요"
                maxLength={6}
                required
                title="이메일로 전송된 6자리 인증번호를 입력해주세요"
              />
              <button
                type="button"
                onClick={handleVerification}
                disabled={verificationCode.length !== 6 || isLoading}
                className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '인증 확인 중...' : '인증번호 확인'}
              </button>
            </div>
          )}

          {/* 이메일 인증 완료 표시 */}
          {!isLogin && isEmailVerified && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-green-700">
                <Check className="w-4 h-4" />
                <span className="text-sm">이메일 인증이 완료되었습니다.</span>
              </div>
            </div>
          )}

          {/* 회원가입 - 추가 정보 입력 */}
          {!isLogin && isEmailVerified && (
            <>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-left"
                  placeholder="사용자 이름을 입력하세요"
                  required
                  title="사용자 이름을 입력해주세요"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-left"
                  placeholder="영문 소문자·숫자·특수문자 포함 8자리 비밀번호 입력"
                  required
                  title="영문 소문자, 숫자, 특수문자를 포함한 8자리 이상의 비밀번호를 입력해주세요"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-left"
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                  title="위에서 입력한 비밀번호를 한 번 더 입력해주세요"
                />
              </div>

              {/* 개인정보 동의 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={handleAgreeToTermsChange}
                    className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    required
                    title="개인정보 수집 및 이용에 동의해주세요"
                  />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">개인정보 수집 및 이용에 동의</span>
                    합니다.
                    <div className="mt-1 text-xs text-gray-500">
                      회원가입을 위해 필요한 최소한의 정보만 수집됩니다.
                    </div>
                  </div>
                </label>
              </div>
            </>
          )}

          {/* 로그인 - 비밀번호 입력 */}
          {isLogin && (
            <div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-left"
                placeholder="비밀번호를 입력하세요"
                required
                title="비밀번호를 입력해주세요"
              />
            </div>
          )}

          {/* 최종 제출 버튼 */}
          {(isLogin || (!isLogin && isEmailVerified)) && (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? isLogin
                  ? '로그인 중...'
                  : '회원가입 중...'
                : isLogin
                  ? '로그인'
                  : '회원가입 완료'}
            </button>
          )}
        </form>

        {/* 하단 버튼들 */}
        <div className="mt-6 text-center">
          <button
            onClick={handleModeToggle}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentScreen('home')}
            className="text-gray-500 hover:text-gray-600 text-sm"
          >
            ← 홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
