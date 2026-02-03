import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// I'm assuming we might want cva, but since I haven't installed it, I will use a manual approach for now to avoid breaking flow.
// Actually, manual is messy. I'll add a check to install it, or just write clean switch rendering.
// To be safe and fast without extra installs (unless I decide to auto-run), I'll do manual class composition.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "link" | "outline";
    size?: "default" | "sm" | "lg" | "icon";
    isLoading?: boolean;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", isLoading, asChild = false, children, ...props }, ref) => {
        const Component = asChild ? Slot : "button"

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            primary: "bg-parfumerie-gold text-parfumerie-black hover:bg-parfumerie-gold-dark",
            secondary: "bg-parfumerie-gold-light text-parfumerie-black hover:bg-parfumerie-gold/80",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground border-parfumerie-gold text-parfumerie-gold hover:bg-parfumerie-gold/10",
            ghost: "hover:bg-accent hover:text-accent-foreground hover:bg-parfumerie-gold/10",
            link: "text-primary underline-offset-4 hover:underline text-parfumerie-gold",
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }

        return (
            <button
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
