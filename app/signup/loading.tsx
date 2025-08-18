export default function Loading() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36 animate-pulse">
                        <div className="h-8 bg-blue-300 rounded"></div>
                    </div>
                </div>
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded mb-4"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-10 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-10 bg-gray-300 rounded"></div>
                            <div className="h-10 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}