import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from '@/app/lib/session'
import { getUserById } from '@/app/lib/users'

export const verifySession = cache(async () => {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.userId) {
        redirect('/login')
    }

    return { isAuth: true, userId: session.userId, email: session.email }
})

export const getSession = cache(async () => {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.userId) {
        return null
    }

    return { userId: session.userId, email: session.email }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const user = await getUserById(session.userId)

        if (!user) {
            return null
        }

        return {
            id: user.id,
            email: user.email,
        }
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})  