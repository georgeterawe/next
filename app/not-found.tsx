import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="text-center">
                <h2 className="text-6xl font-bold text-gray-900 mb-4">404</h2>
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    Page Not Found
                </h3>
                <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist.
                </p>
                <Link
                    href="/"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}