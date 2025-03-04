function Navbar() {
    return <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
                <div className="flex items-center justify-between mr-4">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Resto App</span>
                </div>
            </div>
        </div>
    </nav>
}

export default Navbar