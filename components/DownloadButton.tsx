"use client";

import { motion } from "framer-motion";
import { Download, Check } from "lucide-react";
import { useState } from "react";

interface DownloadButtonProps {
    onClick: () => void;
    filename: string;
}

export default function DownloadButton({ onClick, filename }: DownloadButtonProps) {
    const [downloaded, setDownloaded] = useState(false);

    const handleClick = () => {
        onClick();
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            className={`
        w-full px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300
        ${downloaded
                    ? "bg-green-500 text-white shadow-lg shadow-green-200"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300"
                }
      `}
        >
            <motion.span
                className="flex items-center justify-center gap-2"
                key={downloaded ? "success" : "download"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                {downloaded ? (
                    <>
                        <Check className="h-5 w-5" />
                        <span>Downloaded!</span>
                    </>
                ) : (
                    <>
                        <Download className="h-5 w-5" />
                        <span>Download {filename}</span>
                    </>
                )}
            </motion.span>
        </motion.button>
    );
}
