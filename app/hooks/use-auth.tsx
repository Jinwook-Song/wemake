import { useOutletContext } from 'react-router';

/**
 * 사용자 인증 정보를 가져오는 훅
 * @returns 로그인 상태, 이름, 사용자명, 아바타 URL 등의 사용자 정보
 */
export const useAuth = () => {
  return useOutletContext<{
    isLoggedIn: boolean;
    userId?: string;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
};
