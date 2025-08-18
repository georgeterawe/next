// 'use client'

// import { signup } from '@/app/actions/auth'
// import { useActionState } from 'react'

// export default function SignupForm() {
//   const [state, action, pending] = useActionState(signup, undefined)

//   return (
//     <form action={action}>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input id="name" name="name" placeholder="Name" />
//       </div>
//       {state?.errors?.name && <p>{state.errors.name}</p>}

//       <div>
//         <label htmlFor="email">Email</label>
//         <input id="email" name="email" placeholder="Email" />
//       </div>
//       {state?.errors?.email && <p>{state.errors.email}</p>}

//       <div>
//         <label htmlFor="password">Password</label>
//         <input id="password" name="password" type="password" />
//       </div>
//       {state?.errors?.password && (
//         <div>
//           <p>Password must:</p>
//           <ul>
//             {state.errors.password.map((error) => (
//               <li key={error}>- {error}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <button disabled={pending} type="submit">
//         Sign Up
//       </button>
//     </form>
//   )
// }
'use client'

import { useActionState } from 'react'
import { signup } from '@/app/actions/auth'
import Link from 'next/link'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl font-bold">Create your account</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
            </div>
            {state?.errors?.email && (
              <div className="text-red-500 text-sm mt-1">
                {state.errors.email.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
              <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              </div>
            </div>
            {state?.errors?.password && (
              <div className="text-red-500 text-sm mt-1">
                <div className="mb-2">Password must:</div>
                <ul className="list-disc list-inside">
                  {state.errors.password.map((error) => (
                    <li key={error} className="text-xs">{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-400 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded"
        >
          {pending ? 'Creating account...' : 'Sign up'}
        </button>

        {state?.message && (
          <div className="text-red-500 text-sm mt-2">
            <p>{state.message}</p>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}