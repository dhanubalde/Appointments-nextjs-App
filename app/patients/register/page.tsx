import RegisterForm from '@/components/auth/register-form'
import Image from 'next/image'
import React from 'react'

interface RegisterProps { 
  params: { userId: string}
}
const Register = ({ params}: RegisterProps) => {
  return (
    <div className='flex h-screen w-screen'>
      <section className='remove-scrollbar container'>
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
         src="/assets/images/register-img.png"
         height={1000}
         width={1000}
         alt="patient"
         className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default Register