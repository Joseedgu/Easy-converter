"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100"
        >
            <div className="mx-auto max-w-6xl px-4 py-3">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Easy Converter"
                            width={56}
                            height={56}
                            className="w-14 h-14 object-contain"
                        />
                        <span className="text-xl font-semibold tracking-tight">
                            <span className="text-[#00b4d8]">EASY</span>
                            <span className="text-slate-500"> CONVERTER</span>
                        </span>
                    </Link>
                </nav>
            </div>
        </motion.header>
    );
}
