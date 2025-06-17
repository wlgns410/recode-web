import React, { useEffect } from 'react';
import { useCreateUserProfile, useUpdateUserProfile } from './graphql/mutations/profile.mutation';
import { useGetUserProfile } from './graphql/queries/profile.query';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  blog: string;
}

interface PersonalInfoTabProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
}

const PersonalInfoTab = ({ personalInfo, setPersonalInfo }: PersonalInfoTabProps) => {
  const [createUserProfile] = useCreateUserProfile();
  const [updateUserProfile] = useUpdateUserProfile();
  const { data, loading, error } = useGetUserProfile();

  const validateInput = (): string | null => {
    const { name, email, phone, blog } = personalInfo;

    if (!name || !/^[가-힣]{2,}$/.test(name)) {
      return '이름은 2자 이상 한국어로 입력해주세요.';
    }

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return '올바른 이메일 주소를 입력해주세요.';
    }

    if (!phone || !/^01[0-9]-\d{3,4}-\d{4}$/.test(phone)) {
      return '전화번호는 010-0000-0000 형식으로 입력해주세요.';
    }

    if (blog && !/^https?:\/\/.+$/.test(blog)) {
      return '블로그 주소는 http:// 또는 https://로 시작해야 합니다.';
    }

    return null;
  };

  // 서버에서 받아온 정보로 초기값 설정
  useEffect(() => {
    if (data?.getMyUserProfile) {
      const profile = data.getMyUserProfile;
      setPersonalInfo({
        name: profile.name ?? '',
        email: profile.email ?? '',
        phone: profile.phone ?? '',
        blog: profile.blog ?? '',
      });
    }
  }, [data]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const errorMessage = validateInput();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    try {
      const input = {
        name: personalInfo.name || undefined,
        email: personalInfo.email || undefined,
        phone: personalInfo.phone || undefined,
        blog: personalInfo.blog || undefined,
      };

      if (data?.getMyUserProfile) {
        await updateUserProfile({ variables: { input } });
        alert('개인정보가 수정되었습니다.');
      } else {
        await createUserProfile({ variables: { input } });
        alert('개인정보가 저장되었습니다.');
      }
    } catch (err: any) {
      console.error(err);
      alert(err?.message || '저장에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">개인정보</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          저장
        </button>
      </div>
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
            <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="2자리 이상 한국어만 입력하세요."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="test@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="010-0000-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">블로그</label>
            <input
              type="url"
              value={personalInfo.blog}
              onChange={(e) => handleInputChange('blog', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
