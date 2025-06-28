import { gql, useMutation } from '@apollo/client';

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const useLogout = () => {
  const [logout, { loading, error }] = useMutation(LOGOUT, {
    onCompleted: (data: { logout: string }) => {
      // 로컬 스토리지 클리어
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // 페이지 새로고침 또는 리다이렉트
      window.location.href = '/';
    },
    onError: (error: any) => {
      console.error('로그아웃 실패:', error);
    },
  });

  return { logout, loading, error };
};
