"use client"

import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useRef, useState } from "react"

export interface Option {
    id: string
    label: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChange: (selected: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select options",
    className
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleOutsideClick)
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [])

    const toggleOption = (id: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        const isSelected = selected.includes(id)
        if (isSelected) {
            onChange(selected.filter((item) => item !== id))
        } else {
            onChange([...selected, id])
        }
    }

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-14 w-full items-center justify-between rounded-lg border-2 border-[#203D8E]/40 bg-white/70 px-4 text-base ring-offset-white transition-all hover:border-[#203D8E] shadow-sm cursor-pointer"
            >
                <span className={selected.length === 0 ? "text-[#A8AFC3]" : "text-[#111827]"}>
                    {selected.length === 0
                        ? placeholder
                        : options
                            .filter((opt) => selected.includes(opt.id))
                            .map((opt) => opt.label)
                            .join(", ")}
                </span>
                <ChevronDown className={cn("h-5 w-5 text-[#203D8E] transition-transform", isOpen && "rotate-180")} />
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-2 rounded-md border-2 border-[#203D8E]/20 bg-white shadow-lg py-2 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    {options.length === 0 ? (
                        <div className="px-4 py-2 text-sm text-[#A8AFC3]">No options found.</div>
                    ) : (
                        options.map((option) => (
                            <div
                                key={option.id}
                                onClick={(e) => toggleOption(option.id, e)}
                                className="flex items-center space-x-2.5 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                <Checkbox
                                    checked={selected.includes(option.id)}
                                    className="pointer-events-none" // prevent double firing
                                />
                                <span className="text-sm font-semibold text-[#111827]">{option.label}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
