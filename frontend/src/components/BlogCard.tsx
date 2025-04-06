
export const BlogCard = ({ authorName, title, content, publishDate }: BlogCardProps) => {
    return (
        <div className="py-8 px-5 border-b-2 border-gray-200">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex justify-center items-center bg-blue-200 rounded-full">
                    <span className="text-blue-900 font-semibold">{authorName.split(" ").map(word => word[0]).join('').toUpperCase()}</span>
                </div>
                <span className="capitalize">{authorName}</span>
                <span className="text-sm text-gray-500">{publishDate}</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">{title}</h2>
            <p className="font-serif text-balance mb-2 text-gray-700">{content.length > 300 ? content.slice(0, 300) + "..." : content}</p>
            <p className="text-sm text-gray-500">{Math.ceil(content.length / 100)} min read</p>
        </div>
    )
};

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishDate: string
}