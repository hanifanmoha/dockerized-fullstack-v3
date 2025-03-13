interface IPaginationControllerProps {
    currentPage: number,
    pageCount: number
    goToPage: (page: number) => void
    goToFirstPage: () => void
    goToLastPage: () => void
}

function PaginationController({ currentPage, pageCount, goToPage, goToFirstPage, goToLastPage }: IPaginationControllerProps) {

    return <ul className="inline-flex items-stretch -space-x-px">
        <li>
            <span onClick={() => goToFirstPage()} className="flex items-center justify-center cursor-pointer text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {'<<'}
            </span>
        </li>
        {
            Array.from({ length: pageCount }).map((_, i) => (
                <li key={i}>
                    <span onClick={() => goToPage(i)} className={"flex items-center justify-center cursor-pointer text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" + (currentPage === i ? ' bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white' : '')}>{i + 1}</span>
                </li>
            ))
        }
        <li >
            <span onClick={() => goToLastPage()} className="flex items-center justify-center cursor-pointer text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {'>>'}
            </span>
        </li>
    </ul>
}

export default PaginationController