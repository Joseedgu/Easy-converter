export type OutputFormat = "image/jpeg" | "image/png" | "image/webp" | "image/avif";

interface ConversionResult {
    blob: Blob;
    url: string;
    filename: string;
}

export async function convertImage(
    file: File,
    format: OutputFormat,
    quality: number = 0.92
): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target?.result as string;
        };

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("Could not get canvas context"));
                return;
            }

            if (format === "image/jpeg") {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Could not convert image"));
                        return;
                    }

                    const originalName = file.name.replace(/\.[^/.]+$/, "");
                    const extension = getExtension(format);
                    const filename = `${originalName}${extension}`;
                    const url = URL.createObjectURL(blob);

                    resolve({ blob, url, filename });
                },
                format,
                quality
            );
        };

        img.onerror = () => reject(new Error("Could not load image"));
        reader.onerror = () => reject(new Error("Could not read file"));
        reader.readAsDataURL(file);
    });
}

function getExtension(format: OutputFormat): string {
    switch (format) {
        case "image/jpeg": return ".jpg";
        case "image/png": return ".png";
        case "image/webp": return ".webp";
        case "image/avif": return ".avif";
        default: return ".png";
    }
}

export async function isAvifSupported(): Promise<boolean> {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        canvas.toBlob(
            (blob) => resolve(blob !== null && blob.type === "image/avif"),
            "image/avif",
            0.5
        );
    });
}

export function downloadBlob(url: string, filename: string): void {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
