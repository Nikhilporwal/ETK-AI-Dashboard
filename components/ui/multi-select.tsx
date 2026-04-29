"use client";

import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";
import toast from "react-hot-toast";

// Simple visual-only checkbox
function CheckBox({ checked }: { checked: boolean }) {
  return (
    <div
      className={cn(
        "h-4 w-4 shrink-0 rounded-[4px] border-2 transition-all",
        checked
          ? "bg-[#203D8E] border-[#203D8E] text-white"
          : "border-[#A5B4FC]/50 bg-white",
      )}
    >
      {checked && (
        <Check className="h-full w-full p-[2px] stroke-[4] text-white" />
      )}
    </div>
  );
}

export interface Option {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  isMulti?: boolean;
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  showSelectAll?: boolean
  maxSelection?: number;
}

const ALL_ID = "__all__";

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
  showSelectAll = true,
  maxSelection,
  isMulti = true,
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

  // const toggleOption = (id: string, e?: React.MouseEvent) => {
  //   if (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }

  //   if (id === ALL_ID && showSelectAll) {
  //     onChange(
  //       selected.length === options.length ? [] : options.map((opt) => opt.id),
  //     );
  //     return;
  //   }
  //   onChange(
  //     selected.includes(id)
  //       ? selected.filter((i) => i !== id)
  //       : [...selected, id],
  //   );
  // };

  const toggleOption = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!isMulti) {
      if (selected.includes(id)) {
        onChange([]);
      } else {
        onChange([id]);
        setIsOpen(false);
      }
      return;
    }

    if (id === ALL_ID && showSelectAll) {
      const allIds = options.map((opt) => opt.id);
      const limit = maxSelection ?? allIds.length;

      const isAllSelected =
        selected.length === Math.min(allIds.length, limit);

      if (isAllSelected) {
        onChange([]);
      } else {
        onChange(allIds.slice(0, limit));
      }

      return;
    }

    const isSelected = selected.includes(id);

    if (isSelected) {
      onChange(selected.filter((i) => i !== id));
    } else {
      if (maxSelection && selected.length >= maxSelection) {
        toast.error(`You can select up to ${maxSelection} options`);
        return;
      }
      onChange([...selected, id]);
    }
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
            : !isMulti
              ? options.find(opt => opt.id === selected[0])?.label
              : selected.length === Math.min(options.length, maxSelection ?? options.length)
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

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full rounded-md border-2 border-[#203D8E]/20 bg-white shadow-lg py-2 max-h-60 overflow-y-auto"
          style={{ top: "100%", marginTop: "8px" }}
        >
          {isMulti && showSelectAll && (
            <div
              onClick={(e) => toggleOption(ALL_ID, e)}
              className="flex items-center space-x-2.5 px-4 py-3 hover:bg-slate-50 cursor-pointer border-b"
            >
              <CheckBox checked={selected.length === Math.min(options.length, maxSelection ?? options.length)} />
              <span className="text-sm font-semibold text-[#111827]">
                Select All
              </span>
            </div>
          )}

          {options.map((option) => (
            <div
              key={option.id}
              onClick={(e) => toggleOption(option.id, e)}
              className="flex items-center space-x-2.5 px-4 py-3 hover:bg-slate-50 cursor-pointer"
            >
              <CheckBox checked={selected.includes(option.id)} />
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
