import ContentContainer from "./Content"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

// https://flowbite.com/blocks/application/shells/
function Layout({ children }: { children: React.ReactNode }) {
    return <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Sidebar />
        <ContentContainer>
            {children}
        </ContentContainer>
    </div>
}

export default Layout
