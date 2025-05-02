import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import UserAccountNavbar from './ui/userAccountNavbar';
import { authOptions } from '@/lib/auth';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  // if(!session?.user) {
  //   return <h2 >Per favore accedi per vedere questa pagina </h2>;
  // }

  return (
    <div className="fixed w-full z-10 top-0 flex justify-end items-center p-6 bg-gray-900">
      <div className="flex items-center justify-between">
        {/* <Link href='/'>
          <HandMetal />
        </Link> */}
        { session?.user ? (
          <UserAccountNavbar username={session.user.username}/> // lo passo come child props
          ) : (
            <Link className={buttonVariants()} href="/sign-in"> Sign In </Link>
          )
        }
      </div>
    </div>
  );
};
