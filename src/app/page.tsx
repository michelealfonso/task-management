import SignInForm from "@/components/form/SignInForm"
import Link from "next/link"

export default function Home() {
  return(
    <div className="w-full h-auto flex flex-col justify-center items-center">
      {/* <h1 className='text-4xl'> Home </h1>
      <Link href='/dashboard/admin'> 
      <p className="px-4 py-2 font-medium rounded-md text-white bg-primary/90"> Open My Admin </p>
      </Link>  */}
      <SignInForm />
    </div>
  )
}
