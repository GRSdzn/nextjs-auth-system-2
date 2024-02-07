import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import statement
import { useUserStore } from '@/store/UserStore';
import { toast } from 'react-toastify';

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { isAuth, isToken, tryAuth } = useUserStore((state) => ({
    isAuth: state.isAuth,
    isToken: state.isToken,
    tryAuth: state.tryAuth,
  }));
  // const isAuth = true;
  // const isToken = true;
  // const tryAuth = () => {};
  const authCheck = async () => {
    try {
      await tryAuth();

      if (isAuth) {
        toast.success('Authentication successful! 🎉');
        router.push('/auth/dashboard');
      }
    } catch (error) {
      toast.error(`Error in user authentication: ${error.message} ❌`);
      router.push('/auth/log-in');
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      if (isToken && !isAuth) {
        await authCheck();
      } else {
        if (isAuth) {
          toast.success('Вы успешно вошли под своим аккаунтом');
        } else {
          router.push('/auth/log-in');
        }
      }
    };

    handleAuth();
  }, [isAuth, isToken, tryAuth]);

  return children;
}
