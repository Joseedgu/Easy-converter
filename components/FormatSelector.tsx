"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, FileImage, Image, FileType } from "lucide-react";

export type OutputFormat = "image/jpeg" | "image/png" | "image/webp" | "image/avif";

interface FormatOption {
    value: OutputFormat;
    label: string;
    icon: typeof FileImage;
    description: string;
}

const formats: FormatOption[] = [
    { value: "image/jpeg", label: "JPG", icon: FileImage, description: "Best for photos" },
    { value: "image/png", label: "PNG", icon: Image, description: "Lossless with transparency" },
    { value: "image/webp", label: "WEBP", icon: FileType, description: "Modern web format" },
    { value: "image/avif", label: "AVIF", icon: FileType, description: "Next-gen compression" },
];

interface FormatSelectorProps {
    value: OutputFormat;
    onChange: (format: OutputFormat) => void;
    disabled?: boolean;
}

export default function FormatSelector({ value, onChange, disabled }: FormatSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedFormat = formats.find(f => f.value === value) || formats[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full"
        >

            <button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
          w-full min-h-[56px] flex items-center justify-between gap-3 px-4 py-3 rounded-xl
          bg-white border border-slate-200 transition-all duration-200
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-[#00b4d8] cursor-pointer"}
          ${isOpen ? "ring-2 ring-[#00b4d8]/30 border-[#00b4d8]" : ""}
        `}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-50">
                        <selectedFormat.icon className="h-4 w-4 text-[#00b4d8]" />
                    </div>
                    <div className="text-left">
                        <span className="block text-sm font-semibold text-slate-700">{selectedFormat.label}</span>
                        <span className="block text-xs text-slate-500">{selectedFormat.description}</span>
                    </div>
                </div>

                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-white border border-slate-200 shadow-xl z-[100]"
                    >
                        {formats.map((format) => (
                            <button
                                key={format.value}
                                onClick={() => {
                                    onChange(format.value);
                                    setIsOpen(false);
                                }}
                                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150
                  ${format.value === value ? "bg-cyan-50 text-[#00b4d8]" : "text-slate-600 hover:bg-slate-50"}
                `}
                            >
                                <div className={`p-2 rounded-lg ${format.value === value ? "bg-cyan-100" : "bg-slate-100"}`}>
                                    <format.icon className={`h-4 w-4 ${format.value === value ? "text-[#00b4d8]" : "text-slate-400"}`} />
                                </div>
                                <div className="text-left flex-1">
                                    <span className="block text-sm font-medium">{format.label}</span>
                                    <span className="block text-xs text-slate-500">{format.description}</span>
                                </div>
                                {format.value === value && (
                                    <div className="h-2 w-2 rounded-full bg-[#00b4d8]" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
