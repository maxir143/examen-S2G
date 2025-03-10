'use client'

import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { signUp } from '@/server_actions/auth'
import { LetterIcon } from './icons/letter'
import { KeyIcon } from './icons/key'

export function RegisterForm() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-4 w-full  h-1/3">
      <h1 className="text-2xl">Sign up form</h1>
      <Formik
        validateOnChange
        validateOnBlur
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const { error, success } = await signUp({
            email: values.email,
            password: values.password,
          })

          if (!success) {
            setSubmitting(false)
            toast.error(error || 'Error signing up, refresh and try again')
            return
          }
          resetForm()
          toast.success('Sign up success')
          router.push('/login')
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-4 justify-between h-full">
            <div className="flex flex-col gap-4">
              <label
                className="input validator w-full pe-0"
              >
                <LetterIcon />
                <Field
                  required
                  className="ps-2"
                  type="email"
                  name="email"
                  minLength={5}
                  placeholder="Email"
                />
              </label>
              <label
                className="input validator w-full pe-0"
              >
                <KeyIcon />
                <Field
                  required
                  className="ps-2"
                  type="password"
                  name="password"
                  minLength={8}
                  placeholder="Password"
                />
              </label>
              <label
                className="input validator w-full pe-0"
              >
                <KeyIcon />
                <Field
                  required
                  className="ps-2"
                  type="password"
                  name="confirmPassword"
                  minLength={8}
                  placeholder="Confirm password"
                />
              </label>
            </div>
            <button
              className="btn w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
