import { gql, useMutation } from '@apollo/client';

export const WITHDRAW = gql`
  mutation Withdraw {
    withdraw
  }
`;

export const useWithdraw = () => {
  const [withdraw, { loading, error }] = useMutation(WITHDRAW, {
    onCompleted: (data: { withdraw: boolean }) => {
      if (data.withdraw) {
        // 로컬 스토리지 클리어
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // 페이지 새로고침 또는 리다이렉트
        window.location.href = '/';
      }
    },
    onError: (error: any) => {
      console.error('회원탈퇴 실패:', error);
    },
  });

  return { withdraw, loading, error };
};
