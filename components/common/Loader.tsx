import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
    variant?: "inline" | "full";
    className?: string;
    message?: string;
}

export const Loader = ({ variant = "inline", className, message }: LoaderProps) => {
    if (variant === "full") {
        return (
            <div className="flex flex-col items-center justify-center w-full h-[60vh] space-y-4">
                <Loader2 className={cn("w-10 h-10 animate-spin text-[#203E93]", className)} />
                {message && <p className="text-sm font-medium text-gray-500">{message}</p>}
            </div>
        );
    }

    return (
        <Loader2 className={cn("w-5 h-5 animate-spin", className)} />
    );
};