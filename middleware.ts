// import { NextRequest, NextResponse } from 'next/server'

// // Define your routes
// const publicRoutes = ['/', '/login', '/signup']
// const protectedRoutes = ['/dashboard']

// export async function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname
//     const isPublicRoute = publicRoutes.includes(path)
//     const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

//     // Get the session token from cookies
//     const sessionCookie = request.cookies.get('session')
//     const sessionToken = sessionCookie?.value

//     // Debug logs!
//     console.log('Middleware path:', path)
//     console.log('Session cookie:', sessionCookie)
//     console.log('Session token:', sessionToken)

//     // Redirect to login if accessing protected route without session
//     if (isProtectedRoute && !sessionToken) {
//         console.log('Redirecting to /login...')
//         return NextResponse.redirect(new URL('/login', request.nextUrl))
//     }

//     // Redirect to dashboard if accessing public route with valid session
//     if (isPublicRoute && sessionToken && path !== '/') {
//         console.log('Redirecting to /dashboard...')
//         return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
//     }

//     return NextResponse.next()
// }

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     ],
// }
import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some(route =>
        path.startsWith(route)
    )
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}