"use client";

import { motion } from "framer-motion";
import { Wand2, Loader2 } from "lucide-react";

interface ConvertButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean;
}

export default function ConvertButton({ onClick, isLoading, disabled }: ConvertButtonProps) {
    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={!disabled ? { scale: 1.01 } : {}}
            whileTap={!disabled ? { scale: 0.99 } : {}}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
        w-full h-full min-h-[56px] px-8 py-3 rounded-xl font-semibold text-base transition-all duration-200
        ${disabled
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#00b4d8] to-[#4ade80] text-white shadow-md hover:shadow-lg hover:opacity-95"
                }
      `}
        >
            <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Converting...</span>
                    </>
                ) : (
                    <>
                        <Wand2 className="h-5 w-5" />
                        <span>Convert Image</span>
                    </>
                )}
            </span>
        </motion.button>
    );
}
