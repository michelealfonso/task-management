import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className=" w-full h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4 py-10">{children}</div>;
};

export default AuthLayout;
