import { RegisterForm } from '@/components/register_form'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <RegisterForm />
      <Link className="text-xs mt-4 text-center" href="/login">
        already registered? login
      </Link>
    </>
  )
}
