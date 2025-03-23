import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { Book } from "lucide-react";


// Fetch article content
const getArticle = async (slug: string[]) => {

    const filePath = path.join(process.cwd(), "articles", `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return {
        title: data.title,
        content: htmlContent,
        date: data.date,
        author: data.author,
        image: data.image
    };
};

export async function generateStaticParams() {
    const articlesDirectory = path.join(process.cwd(), "articles");
    const filenames = fs.readdirSync(articlesDirectory);

    return filenames.map((filename) => {
        const filePath = path.join(articlesDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return ({ slug: data.slug });
    });
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params;

    const { title, content, date, author, image } = await getArticle(slug);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <div
                className="bg-gradient-to-r from-blue-500 to-green-600 text-white py-20"
            >
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <Book size={48} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{title}</h1>
                    <p className="text-lg mb-2">By {author}</p>
                    <Link href="/guide" className="inline-block bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition">
                        &larr; Go Back
                    </Link>
                </div>
            </div>


            {/* Article Content */}
            <div className="max-w-4xl mx-auto py-10 px-6">
                <img
                    src={`${image}`}
                    alt="Article Hero"
                    className="w-full h-full object-cover opacity-50 rounded-md"
                />

                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
            </div>
        </div>
    );
}
