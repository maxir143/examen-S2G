'use client'

import { useRouter } from 'next/navigation'
import { Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { login } from '@/server_actions/auth'
import { setCookie } from '@/server_actions/cookies'
import { KeyIcon } from './icons/key'
import { LetterIcon } from './icons/letter'

export function LoginForm({ goToPath = '/dashboard' }: { goToPath?: string }) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 w-full h-1/3">
      <h1 className="text-2xl">Login form</h1>
      <Formik
        validateOnChange
        validateOnBlur
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          await login({
            email: values.email,
            password: values.password,
          }).then(async ({ token, error }) => {
            if (!token) throw Error(error || "Error logging in, refresh and try again")
            await setCookie('token', token)
            return router.push(goToPath)
          }).catch((e) => {
            toast.error(e)
            setSubmitting(false)
          })
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-4 justify-between h-full">
            <div className="flex flex-col gap-4">
              <label className="input w-full pe-0">
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
              <label className="input w-full pe-0">
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
            </div>
            <div>
              {errors.email && (
                <small className="text-error">{errors.email}</small>
              )}
              {errors.password && (
                <small className="text-error">{errors.password}</small>
              )}
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
