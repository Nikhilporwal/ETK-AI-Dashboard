"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef, useState } from "react";

export interface Option {
  id: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

const ALL_ID = "__all__";

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Position logic: Calculate purely via DOM when opening
  useEffect(() => {
    if (isOpen && containerRef.current && dropdownRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight || 260;
      const spaceBelow = window.innerHeight - rect.bottom;

      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        // Force dropdown to show ABOVE
        dropdownRef.current.style.bottom = "100%";
        dropdownRef.current.style.top = "auto";
        dropdownRef.current.style.marginBottom = "8px";
        dropdownRef.current.style.marginTop = "0px";
      } else {
        // Force dropdown to show BELOW
        dropdownRef.current.style.top = "100%";
        dropdownRef.current.style.bottom = "auto";
        dropdownRef.current.style.marginTop = "8px";
        dropdownRef.current.style.marginBottom = "0px";
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleOption = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (id === ALL_ID) {
      onChange(
        selected.length === options.length ? [] : options.map((opt) => opt.id),
      );
      return;
    }
    onChange(
      selected.includes(id)
        ? selected.filter((i) => i !== id)
        : [...selected, id],
    );
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-full items-center justify-between rounded-lg border-2 border-[#203D8E]/40 bg-white/70 px-4 text-base transition-all hover:border-[#203D8E] shadow-sm cursor-pointer"
      >
        <span
          className={cn(
            "truncate min-w-0 block",
            selected.length === 0 ? "text-[#A8AFC3]" : "text-[#111827]",
          )}
        >
          {selected.length === 0
            ? placeholder
            : selected.length === options.length
              ? "All selected"
              : options
                  .filter((opt) => selected.includes(opt.id))
                  .map((opt) => opt.label)
                  .join(", ")}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[#203D8E] transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </div>

      {/* Dropdown with absolute positioning handled via Ref */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full rounded-md border-2 border-[#203D8E]/20 bg-white shadow-lg py-2 max-h-60 overflow-y-auto"
          style={{ top: "100%", marginTop: "8px" }} // Default initial position
        >
          <div
            onClick={(e) => toggleOption(ALL_ID, e)}
            className="flex items-center space-x-2.5 px-4 py-3 hover:bg-slate-50 cursor-pointer border-b"
          >
            <Checkbox
              checked={selected.length === options.length}
              className="pointer-events-none"
            />
            <span className="text-sm font-semibold text-[#111827]">
              Select All
            </span>
          </div>

          {options.map((option) => (
            <div
              key={option.id}
              onClick={(e) => toggleOption(option.id, e)}
              className="flex items-center space-x-2.5 px-4 py-3 hover:bg-slate-50 cursor-pointer"
            >
              <Checkbox
                checked={selected.includes(option.id)}
                className="pointer-events-none"
              />
              <span className="text-sm font-semibold text-[#111827]">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
