"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dropzone from "@/components/Dropzone";
import FormatSelector, { type OutputFormat } from "@/components/FormatSelector";
import ConvertButton from "@/components/ConvertButton";
import DownloadButton from "@/components/DownloadButton";
import { ToastProvider, useToast } from "@/components/Toast";
import { convertImage, downloadBlob } from "@/lib/imageConverter";

function ImageConverterApp() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/webp");
    const [isConverting, setIsConverting] = useState(false);
    const [convertedResult, setConvertedResult] = useState<{
        url: string;
        filename: string;
    } | null>(null);

    const { showToast } = useToast();

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        setConvertedResult(null);
        showToast(`${file.name} loaded successfully`, "success");
    };

    const handleClear = () => {
        setSelectedFile(null);
        setConvertedResult(null);
    };

    const handleConvert = async () => {
        if (!selectedFile) return;

        setIsConverting(true);
        try {
            const result = await convertImage(selectedFile, outputFormat);
            setConvertedResult({ url: result.url, filename: result.filename });
            showToast("Image converted successfully!", "success");
        } catch {
            showToast("Failed to convert image. Please try again.", "error");
        } finally {
            setIsConverting(false);
        }
    };

    const handleDownload = () => {
        if (convertedResult) {
            downloadBlob(convertedResult.url, convertedResult.filename);
            showToast(`${convertedResult.filename} downloaded!`, "success");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Background />
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
                        <span className="text-gradient">Convert Images</span>
                        <br />
                        <span className="text-slate-700">Instantly</span>
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
                        Transform your images between formats with a simple drag & drop.
                    </p>
                </motion.div>

                <Dropzone
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    onClear={handleClear}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-2xl relative z-10"
                >
                    <div className="flex-1">
                        <FormatSelector
                            value={outputFormat}
                            onChange={(format) => {
                                setOutputFormat(format);
                                setConvertedResult(null);
                            }}
                            disabled={!selectedFile}
                        />
                    </div>

                    <div className="flex-1">
                        {!convertedResult ? (
                            <ConvertButton
                                onClick={handleConvert}
                                isLoading={isConverting}
                                disabled={!selectedFile}
                            />
                        ) : (
                            <DownloadButton
                                onClick={handleDownload}
                                filename={convertedResult.filename}
                            />
                        )}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

export default function Home() {
    return (
        <ToastProvider>
            <ImageConverterApp />
        </ToastProvider>
    );
}
