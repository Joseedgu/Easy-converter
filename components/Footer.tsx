"use client";

import { Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-16 py-8 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-6 flex justify-between items-center">
                <p className="text-xs text-slate-400">
                    © {new Date().getFullYear()} Josest.
                </p>
                <a
                    href="https://github.com/Joseedgu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="GitHub"
                >
                    <Github className="h-5 w-5" />
                </a>
            </div>
        </footer>
    );
}
