"use client";

import { memo } from "react";

const Background = memo(function Background() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Clean white background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-cyan-50/30" />

            {/* Subtle decorative circles */}
            <div
                className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, transparent 70%)",
                }}
            />
            <div
                className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full opacity-15"
                style={{
                    background: "radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)",
                }}
            />
        </div>
    );
});

export default Background;
