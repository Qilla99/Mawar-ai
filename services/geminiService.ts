
import { GoogleGenAI } from "@google/genai";
import type { ImageRef } from "../types";

const getGenAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_PROMPT = "Anda adalah insinyur prompt profesional untuk fashion AI kelas atas. Buat prompt generasi gambar yang mendetail dan terstruktur. Jaga identitas wajah 100% dari gambar referensi jika disediakan. Ekstrak HANYA gaya pakaian dari referensi pakaian. Fokus pada estetika 'kawaii', pencahayaan lembut, dan fotografi detail tinggi. Output HARUS berupa teks prompt saja.";

export const generateOptimizedPrompt = async (
  userInput: string,
  imagesToAnalyze: ImageRef[]
): Promise<string> => {
  const ai = getGenAI();
  // FIX: The type for `parts` was incorrect. It has been removed to allow TypeScript to infer it correctly.
  const parts = [
    { text: userInput },
    ...imagesToAnalyze.map((img) => ({
      inlineData: {
        mimeType: "image/png",
        data: img.base64,
      },
    })),
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: parts },
    config: { systemInstruction: SYSTEM_PROMPT }
  });

  if (response.text) {
    return response.text;
  }
  
  throw new Error("Gagal mengoptimalkan prompt. Respon tidak valid dari API.");
};

export const generateImage = async (
  promptText: string,
  aspectRatio: string,
  referenceImages: ImageRef[]
): Promise<string> => {
    const ai = getGenAI();
    const parts = [
        { text: `Buat gambar berkualitas tinggi berdasarkan deskripsi ini: ${promptText}. Jaga konsistensi wajah dengan foto wajah yang disediakan.` },
        ...referenceImages.map(img => ({
            inlineData: {
                mimeType: "image/png",
                data: img.base64
            }
        }))
    ];

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
            imageConfig: { aspectRatio: aspectRatio as "1:1" | "3:4" | "4:3" | "9:16" | "16:9" }
        }
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            return `data:image/png;base64,${base64EncodeString}`;
        }
    }
    
    throw new Error("Gagal membuat gambar. Tidak ada data gambar dalam respon API.");
};

export const applyWatermark = async (
  baseImageB64Url: string,
  watermarkB64: string
): Promise<string> => {
    const ai = getGenAI();
    const baseImageB64 = baseImageB64Url.split(',')[1];
    
    const parts = [
        { text: "Tambahkan watermark kecil dari gambar watermark di pojok kiri bawah gambar utama. Buat sangat kecil, tidak mengganggu, tapi tetap terbaca." },
        { inlineData: { mimeType: "image/png", data: baseImageB64 } },
        { inlineData: { mimeType: "image/png", data: watermarkB64 } }
    ];

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts }
    });
    
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            return `data:image/png;base64,${base64EncodeString}`;
        }
    }
    
    // If watermark application fails, return the original image
    return baseImageB64Url;
};
