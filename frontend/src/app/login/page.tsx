import { LoginForm } from '@/components/login_form'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <LoginForm />
      <Link className="text-xs mt-4 text-center" href="/sign-up">
        not registered? sign up
      </Link>
    </>
  )
}
