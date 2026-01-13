"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, X } from "lucide-react";

interface DropzoneProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
    onClear: () => void;
}

export default function Dropzone({ onFileSelect, selectedFile, onClear }: DropzoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith("image/")) {
            handleFile(files[0]);
        }
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, []);

    const handleFile = (file: File) => {
        onFileSelect(file);
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleClear = () => {
        setPreview(null);
        onClear();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          relative min-h-[280px] rounded-2xl transition-all duration-300 cursor-pointer
          ${selectedFile
                        ? "border-2 border-[#00b4d8] bg-white shadow-lg"
                        : isDragOver
                            ? "border-2 border-[#00b4d8] bg-cyan-50/50 shadow-lg shadow-cyan-100"
                            : "border-2 border-dashed border-slate-200 hover:border-[#00b4d8] bg-white hover:bg-slate-50"
                    }
        `}
            >
                <AnimatePresence mode="wait">
                    {!selectedFile ? (
                        <motion.label
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer p-8"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileInput}
                                className="hidden"
                            />

                            <motion.div
                                animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
                                className={`p-5 rounded-2xl ${isDragOver ? "bg-cyan-100" : "bg-slate-100"} transition-colors duration-300`}
                            >
                                <Upload className={`h-8 w-8 transition-colors duration-300 ${isDragOver ? "text-[#00b4d8]" : "text-slate-400"}`} />
                            </motion.div>

                            <div className="text-center space-y-1">
                                <p className="text-base font-medium text-slate-700">
                                    {isDragOver ? "Drop your image here" : "Drag & drop your image"}
                                </p>
                                <p className="text-sm text-slate-500">
                                    or <span className="text-[#00b4d8] hover:text-[#0096c7] transition-colors cursor-pointer">browse files</span>
                                </p>
                                <p className="text-xs text-slate-400 mt-3">
                                    Supports JPG, PNG, WEBP, AVIF, GIF, BMP
                                </p>
                            </div>
                        </motion.label>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-6"
                        >
                            <motion.button
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                onClick={handleClear}
                                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                            >
                                <X className="h-4 w-4" />
                            </motion.button>

                            <div className="flex flex-col items-center justify-center gap-4">
                                {preview && (
                                    <motion.img
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        src={preview}
                                        alt="Preview"
                                        className="max-h-36 max-w-full rounded-lg object-contain shadow-md"
                                    />
                                )}

                                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
                                    <ImageIcon className="h-4 w-4 text-[#00b4d8]" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 truncate max-w-[180px]">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type.split("/")[1].toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
