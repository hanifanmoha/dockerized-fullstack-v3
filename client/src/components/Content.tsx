
interface IContentContainerProps extends React.PropsWithChildren {
}

function ContentContainer({ children }: IContentContainerProps) {
    return <main className="p-4 md:ml-64 h-auto pt-20">
        <div className="min-h-screen bg-white rounded-lg p-6 border border-gray-200">
            {children}
        </div>
    </main>
}

export default ContentContainer