'use server'

import { redirect } from 'next/navigation'
import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/auth_definitions'
import { createUser, getUserByEmail, verifyPassword } from '@/app/lib/users'
import { createSession, deleteSession } from '@/app/lib/session'

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return {
            message: 'User with this email already exists.',
        }
    }

    try {
        const user = await createUser(email, password)

        await createSession(user.id, user.email)
    } catch (error) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }

    redirect('/dashboard')
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data

    const user = await verifyPassword(email, password)

    if (!user) {
        return {
            message: 'Invalid email or password.',
        }
    }

    try {
        await createSession(user.id, user.email)
    } catch (error) {
        return {
            message: 'An error occurred while logging you in.',
        }
    }

    redirect('/dashboard')
}

export async function logout() {
    await deleteSession()
    redirect('/login')
}