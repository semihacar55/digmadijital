
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ArticleCardProps {
    headline: string;
    excerpt: string;
    cover?: string;
    tag?: string;
    readingTime?: number; // in seconds
    writer?: string;
    publishedAt?: Date;
    clampLines?: number;
}

export function formatReadTime(seconds: number): string {
    if (!seconds || seconds < 60) return "Less than 1 min read";
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} min read`;
}

export function formatPostDate(date: Date): string {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
    cover,
    tag,
    readingTime,
    headline,
    excerpt,
    writer,
    publishedAt,
    clampLines,
}) => {
    const hasMeta = tag || readingTime;
    const hasFooter = writer || publishedAt;

    return (
        <Card className="flex w-full h-full flex-col gap-3 overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-3 shadow-lg hover:border-white/20 transition-colors">
            <CardHeader className="p-0">
                <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-white/5">
                    {cover ? (
                        <img
                            src={cover}
                            alt={headline}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10 bg-gradient-to-br from-white/5 to-transparent">
                            <svg
                                className="w-12 h-12 opacity-20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="flex-grow p-3 flex flex-col">
                {hasMeta && (
                    <div className="mb-4 flex items-center text-sm text-muted-foreground">
                        {tag && (
                            <Badge className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-white/20 border-white/10">
                                {tag}
                            </Badge>
                        )}
                        {tag && readingTime && <span className="mx-2 text-gray-500">•</span>}
                        {readingTime && <span className="text-gray-400">{formatReadTime(readingTime)}</span>}
                    </div>
                )}

                <h2
                    className="mb-2 text-2xl font-bold leading-tight text-white line-clamp-2"
                    title={headline}
                >
                    {headline}
                </h2>

                <p
                    className={cn("text-gray-400", {
                        "overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [display:-webkit-box]":
                            clampLines && clampLines > 0,
                    })}
                    style={{
                        WebkitLineClamp: clampLines,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {excerpt}
                </p>
            </CardContent>

            {hasFooter && (
                <CardFooter className="flex items-center justify-between p-3 mt-auto border-t border-white/5 pt-4">
                    {writer && (
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Yazar</p>
                            <p className="font-semibold text-gray-300 text-sm">{writer}</p>
                        </div>
                    )}
                    {publishedAt && (
                        <div className={writer ? "text-right" : ""}>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Tarih</p>
                            <p className="font-semibold text-gray-300 text-sm">
                                {formatPostDate(publishedAt)}
                            </p>
                        </div>
                    )}
                </CardFooter>
            )}
        </Card>
    );
};
