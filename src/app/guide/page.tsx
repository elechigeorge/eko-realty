import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Book, Home } from "lucide-react";

type Article = {
    slug: string;
    title: string;
    date: string;
    author: string;
    excerpt: string;
};

// Function to fetch articles
const getArticles = (): Article[] => {
    const articlesDirectory = path.join(process.cwd(), "articles");
    const filenames = fs.readdirSync(articlesDirectory);

    return filenames.map((filename) => {
        const filePath = path.join(articlesDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            date: data.date,
            author: data.author,
            image: data.image,
        };
    });
};

export default function BlogPage() {
    const articles = getArticles();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <div
                className="bg-gradient-to-r from-blue-500 to-green-600 text-white py-20"
            >
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <Book size={48} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Submit Property Request</h1>
                    <p className="text-xl text-blue-100">
                        Let us help you find your perfect property
                    </p>
                </div>
            </div>

            {/* Articles List */}
            <div className="max-w-4xl mx-auto py-10 px-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {articles.map((article) => (
                        <Link href={`/guide/${article.slug}`} key={article.slug} className="group">
                            <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-lg hover:scale-[1.02] transform transition">
                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-indigo-600 transition">
                                    {article.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-600 mb-4">{article.excerpt}</p>

                                {/* Meta Information */}
                                <div className="flex items-center text-gray-500 text-sm space-x-4">
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3"></path>
                                        </svg>
                                        <span>{article.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h10M8 12h6m-6 5h10m-7-9l1.5 1.5M17.5 7L19 8.5"></path>
                                        </svg>
                                        <span>{article.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}
