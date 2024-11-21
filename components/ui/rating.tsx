// components/ui/rating.tsx
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import * as React from "react"

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    max?: number
    readonly?: boolean
    onValueChange?: (value: number) => void
    size?: "sm" | "md" | "lg"
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
    ({ value = 0, max = 5, readonly = false, onValueChange, size = "md", className, ...props }, ref) => {
        const [hoverValue, setHoverValue] = React.useState<number | null>(null)

        const sizes = {
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6"
        }

        const renderStar = (index: number) => {
            const filled = (hoverValue ?? value) >= index + 1

            return (
                <button
                    key={index}
                    type="button"
                    className={cn(
                        "focus:outline-none transition-colors",
                        readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
                        "disabled:cursor-not-allowed"
                    )}
                    disabled={readonly}
                    onMouseEnter={() => !readonly && setHoverValue(index + 1)}
                    onMouseLeave={() => !readonly && setHoverValue(null)}
                    onClick={() => !readonly && onValueChange?.(index + 1)}
                >
                    <Star
                        className={cn(
                            sizes[size],
                            "transition-colors",
                            filled
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-transparent text-gray-300 dark:text-gray-600"
                        )}
                    />
                </button>
            )
        }

        return (
            <div
                ref={ref}
                className={cn("flex gap-1 items-center", className)}
                {...props}
            >
                {[...Array(max)].map((_, index) => renderStar(index))}
            </div>
        )
    }
)
Rating.displayName = "Rating"

export { Rating }
