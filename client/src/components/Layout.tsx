import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

// https://flowbite.com/blocks/application/shells/
function Layout({ children }: { children: React.ReactNode }) {
    return <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <Navbar />

        {/* Sidebar */}

        <Sidebar />

        <main className="p-4 md:ml-64 h-auto pt-20">
            <div className="p-2 min-h-screen">
                {children}
            </div>
        </main>
    </div>
}

export default Layout
