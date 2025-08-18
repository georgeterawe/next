import 'server-only'
import { User } from '@/app/lib/auth_definitions'
const users: User[] = [
    {
        id: '1',
        email: 'user@example.com',
        password: 'password123!',
    },
]

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    return user || null
}

export async function createUser(email: string, password: string): Promise<User> {
    const newUser: User = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        password,
    }

    users.push(newUser)
    return newUser
}

export async function getUserById(id: string): Promise<User | null> {
    const user = users.find(u => u.id === id)
    return user || null
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await getUserByEmail(email)

    if (!user) {
        return null
    }

    if (user.password === password) {
        return user
    }

    return null
}