import { useUserStore } from '@/store/UserStore';
import { Loader } from '@mantine/core';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { shallow } from 'zustand/shallow';

const Header = () => {
  const { logout, isAuth, loading } = useUserStore(
    (state) => ({
      isAuth: state.isAuth,
      isToken: state.isToken,
      tryAuth: state.tryAuth,
      user: state.user,
      loading: state.loading,
      logout: state.logout,
    }),
    shallow
  );
  const onLogout = () => {
    logout();
    redirect('/auth/login');
  };

  const GuestLinks = () => {
    return (
      <>
        <Link href="/auth/log-in">Login</Link>
        <Link href="/auth/sign-up">Register</Link>
      </>
    );
  };
  const IsAuthLinks = () => {
    return (
      <>
        <Link href={'/auth/dashboard'}>DashBoard</Link>
        <Link href={'/auth/dashboard'}>
          <button onClick={onLogout} className="bg-red-500 p-2 hover:bg-red-400 duration-200 text-white rounded-lg">
            LOGOUT
          </button>
        </Link>
      </>
    );
  };

  return (
    <header>
      <ul className="p-4 gap-5 flex items-center text-gray-700 font-bold">
        <Link href="/">Main</Link>
        <Link href="/contacts">Contacts</Link>
        {loading ? <Loader /> : !isAuth && <GuestLinks />}
        {isAuth && <IsAuthLinks />}
      </ul>
    </header>
  );
};

export default Header;
