
import React, { useState, useCallback } from 'react';
import { 
  Camera, 
  User, 
  Shirt, 
  MapPin, 
  Sparkles, 
  Scissors, 
  Palette, 
  Download, 
  Trash2, 
  Image as ImageIcon,
  Loader2,
  Heart,
  X,
  Upload,
  Maximize,
  Accessibility
} from 'lucide-react';

import { 
  CLOTHING_DATABASE, 
  ASPECT_RATIOS, 
  CAMERA_ANGLES, 
  POSES, 
  LOCATIONS, 
  HAIRSTYLES, 
  MAKEUP_STYLES, 
  PHOTOGRAPHY_STYLES 
} from './constants';

import type { ImageRef } from './types';
import { generateOptimizedPrompt, generateImage, applyWatermark } from './services/geminiService';
import { OptionCard } from './components/OptionCard';


export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  
  // State Input
  const [faceRefs, setFaceRefs] = useState<(ImageRef | null)[]>([null, null, null]);
  const [faceIdea, setFaceIdea] = useState("");
  
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("3:4");
  
  const [clothingDbEnabled, setClothingDbEnabled] = useState(true);
  const [clothingRef, setClothingRef] = useState<ImageRef | null>(null);
  const [selectedClothes, setSelectedClothes] = useState<string[]>([]);
  const [clothingIdea, setClothingIdea] = useState("");
  
  const [angleEnabled, setAngleEnabled] = useState(true);
  const [selectedAngle, setSelectedAngle] = useState("");
  const [angleIdea, setAngleIdea] = useState("");

  const [poseEnabled, setPoseEnabled] = useState(true);
  const [selectedPose, setSelectedPose] = useState("");
  const [poseIdea, setPoseIdea] = useState("");
  
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationIdea, setLocationIdea] = useState("");
  
  const [hairEnabled, setHairEnabled] = useState(true);
  const [selectedHair, setSelectedHair] = useState("");
  const [hairIdea, setHairIdea] = useState("");
  
  const [makeupEnabled, setMakeupEnabled] = useState(true);
  const [selectedMakeup, setSelectedMakeup] = useState("");
  const [makeupIdea, setMakeupIdea] = useState("");
  
  const [selectedPhotoType, setSelectedPhotoType] = useState("");
  
  const [watermark, setWatermark] = useState<ImageRef | null>(null); // This is an addition, assuming watermark functionality is desired.

  const handleImageUpload = useCallback((file: File, callback: (ref: ImageRef) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') return;
      const base64String = reader.result.split(',')[1];
      callback({ base64: base64String, preview: reader.result });
    };
    reader.readAsDataURL(file);
  }, []);

  const resetAll = () => {
    setFaceRefs([null, null, null]);
    setFaceIdea("");
    setSelectedAspectRatio("3:4");
    setClothingRef(null);
    setSelectedClothes([]);
    setClothingIdea("");
    setAngleEnabled(true);
    setSelectedAngle("");
    setAngleIdea("");
    setPoseEnabled(true);
    setSelectedPose("");
    setPoseIdea("");
    setLocationEnabled(true);
    setSelectedLocation("");
    setLocationIdea("");
    setHairEnabled(true);
    setSelectedHair("");
    setHairIdea("");
    setMakeupEnabled(true);
    setSelectedMakeup("");
    setMakeupIdea("");
    setSelectedPhotoType("");
    setGeneratedImage(null);
    setError(null);
    setWatermark(null);
  };

  const handleStartGeneration = async () => {
    setLoading(true);
    setError(null);
    try {
      const activeFaceRefs = faceRefs.filter((f): f is ImageRef => f !== null);
      
      const userInput = {
        face_refs: activeFaceRefs.length,
        face_idea: faceIdea,
        aspect_ratio: selectedAspectRatio,
        clothing_db: clothingDbEnabled ? selectedClothes.map(c => CLOTHING_DATABASE.find(d => d.id === c)?.label).join(", ") : "",
        clothing_ref: clothingRef ? "Ada foto referensi pakaian" : "Tidak ada",
        clothing_idea: clothingIdea,
        angle: angleEnabled ? selectedAngle : "Auto",
        angle_idea: angleIdea,
        pose: poseEnabled ? selectedPose : "Auto",
        pose_idea: poseIdea,
        location: locationEnabled ? selectedLocation : "Auto",
        location_idea: locationIdea,
        hair: hairEnabled ? selectedHair : "Auto",
        hair_idea: hairIdea,
        makeup: makeupEnabled ? selectedMakeup : "Auto",
        makeup_idea: makeupIdea,
        photo_type: selectedPhotoType || "Auto"
      };

      const imagesToAnalyze = [
        ...activeFaceRefs,
        ...(clothingRef ? [clothingRef] : [])
      ];

      const optimizedPrompt = await generateOptimizedPrompt(JSON.stringify(userInput), imagesToAnalyze);

      let finalImg = await generateImage(optimizedPrompt, selectedAspectRatio, activeFaceRefs);

      if (watermark) {
        finalImg = await applyWatermark(finalImg, watermark.base64);
      }

      setGeneratedImage(finalImg);
      setHistory(prev => [finalImg, ...prev].slice(0, 12));
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Duh, terjadi kesalahan saat membuat gambarmu. Coba lagi ya!");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `mawar-ai-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FFFDFE] text-gray-800 p-4 md:p-8 flex flex-col md:flex-row gap-8 overflow-x-hidden">
      
      {/* Left Panel - Setup */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 overflow-y-auto max-h-screen pr-2 custom-scrollbar">
        <header className="mb-4">
          <h1 className="text-4xl font-bold text-[#FF8FB1] flex items-center gap-2 drop-shadow-sm">
            MAWAR_AI <Heart className="fill-[#FF8FB1] text-[#FF8FB1]" />
          </h1>
          <p className="text-pink-400 italic">"Model Nano Banana Pro aktif!"</p>
        </header>

        {/* Face Reference Section */}
        <section className="bg-[#FFE6F2] p-6 rounded-3xl shadow-sm border border-pink-100">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-[#FF8FB1]" />
            <h2 className="text-xl font-bold text-pink-600">Referensi Wajah</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {faceRefs.map((ref, idx) => (
              <label key={idx} className="relative aspect-square rounded-2xl border-2 border-dashed border-pink-300 bg-white flex items-center justify-center cursor-pointer overflow-hidden group hover:border-[#FF8FB1] transition-all shadow-inner">
                {ref ? (
                  <img src={ref.preview} alt={`Wajah ${idx}`} className="w-full h-full object-cover" />
                ) : (
                  <Upload className="text-pink-300 group-hover:scale-110 transition-transform" />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], (imgRef) => {
                  const newRefs = [...faceRefs];
                  newRefs[idx] = imgRef;
                  setFaceRefs(newRefs);
                })} />
                {ref && (
                  <button onClick={(e) => { e.preventDefault(); const n = [...faceRefs]; n[idx] = null; setFaceRefs(n); }} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors">
                    <X size={12} />
                  </button>
                )}
              </label>
            ))}
          </div>
          <textarea 
            className="w-full p-3 rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF8FB1] text-sm"
            placeholder="Ide wajah: ekspresi, tatapan, vibe imut..."
            value={faceIdea}
            onChange={(e) => setFaceIdea(e.target.value)}
          />
        </section>

        {/* Aspect Ratio Section */}
        <section className="bg-[#FFE6F2] p-6 rounded-3xl shadow-sm border border-pink-100">
          <div className="flex items-center gap-2 mb-4">
            <Maximize className="text-[#FF8FB1]" size={20} />
            <h2 className="text-xl font-bold text-pink-600">Rasio Gambar</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.value}
                onClick={() => setSelectedAspectRatio(ratio.value)}
                className={`p-3 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  selectedAspectRatio === ratio.value 
                  ? 'bg-[#FF8FB1] text-white shadow-lg scale-105' 
                  : 'bg-white text-pink-400 border border-pink-100 hover:bg-pink-50'
                }`}
              >
                <span className="text-lg">{ratio.icon}</span>
                {ratio.label}
              </button>
            ))}
          </div>
        </section>

        {/* Clothing Section */}
        <section className="bg-[#FFE6F2] p-6 rounded-3xl shadow-sm border border-pink-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shirt className="text-[#FF8FB1]" />
              <h2 className="text-xl font-bold text-pink-600">Referensi Pakaian</h2>
            </div>
            <label className="flex items-center cursor-pointer">
              <span className="text-sm mr-2 text-pink-500">Pilih dari list</span>
              <input type="checkbox" className="sr-only peer" checked={clothingDbEnabled} onChange={() => setClothingDbEnabled(!clothingDbEnabled)} />
              <div className="w-10 h-6 rounded-full peer bg-gray-300 peer-checked:bg-[#FF8FB1] relative transition-colors">
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
              </div>
            </label>
          </div>
          
          <label className="block mb-3 p-4 bg-white rounded-2xl border-2 border-dashed border-pink-300 cursor-pointer text-center group">
            {clothingRef ? (
              <div className="flex items-center justify-center gap-3">
                <img src={clothingRef.preview} alt="Clothing Preview" className="w-12 h-12 rounded-lg object-cover" />
                <span className="text-xs text-pink-500 font-medium">Foto Pakaian Terpasang</span>
                <button onClick={(e) => { e.preventDefault(); setClothingRef(null); }} className="p-1 bg-pink-100 rounded-full text-pink-500"><X size={14} /></button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <ImageIcon className="text-pink-300 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-pink-400">Ekstrak gaya dari foto</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], setClothingRef)} />
          </label>

          {clothingDbEnabled && (
            <div className="max-h-48 overflow-y-auto mb-4 bg-white rounded-2xl p-2 border border-pink-100 custom-scrollbar shadow-inner">
              {CLOTHING_DATABASE.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedClothes(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])}
                  className={`p-2 text-xs cursor-pointer rounded-xl mb-1 flex items-center gap-2 transition-colors ${selectedClothes.includes(item.id) ? 'bg-pink-100 text-pink-600 border border-pink-300' : 'hover:bg-pink-50 text-gray-500'}`}
                >
                  <div className={`w-3 h-3 rounded-full border ${selectedClothes.includes(item.id) ? 'bg-[#FF8FB1] border-[#FF8FB1]' : 'border-gray-300'}`} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}

          <textarea 
            className="w-full p-3 rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF8FB1] text-sm"
            placeholder="Ide pakaian: warna, bahan, aksesoris..."
            value={clothingIdea}
            onChange={(e) => setClothingIdea(e.target.value)}
          />
        </section>

        {/* Other Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptionCard icon={<Accessibility size={16}/>} title="Pose" isEnabled={poseEnabled} onToggle={() => setPoseEnabled(!poseEnabled)} selectedValue={selectedPose} onSelectChange={e => setSelectedPose(e.target.value)} options={POSES} textareaValue={poseIdea} onTextareaChange={e => setPoseIdea(e.target.value)} textareaPlaceholder="Ide pose: arah tangan..." />
          <OptionCard icon={<Camera size={16}/>} title="Angle" isEnabled={angleEnabled} onToggle={() => setAngleEnabled(!angleEnabled)} selectedValue={selectedAngle} onSelectChange={e => setSelectedAngle(e.target.value)} options={CAMERA_ANGLES} textareaValue={angleIdea} onTextareaChange={e => setAngleIdea(e.target.value)} textareaPlaceholder="Ide angle tambahan..." />
          <OptionCard icon={<MapPin size={16}/>} title="Lokasi" isEnabled={locationEnabled} onToggle={() => setLocationEnabled(!locationEnabled)} selectedValue={selectedLocation} onSelectChange={e => setSelectedLocation(e.target.value)} options={LOCATIONS} textareaValue={locationIdea} onTextareaChange={e => setLocationIdea(e.target.value)} textareaPlaceholder="Ide lokasi tambahan..." />
          <OptionCard icon={<Scissors size={16}/>} title="Rambut" isEnabled={hairEnabled} onToggle={() => setHairEnabled(!hairEnabled)} selectedValue={selectedHair} onSelectChange={e => setSelectedHair(e.target.value)} options={HAIRSTYLES} textareaValue={hairIdea} onTextareaChange={e => setHairIdea(e.target.value)} textareaPlaceholder="Warna rambut, hiasan..." />
          <OptionCard icon={<Palette size={16}/>} title="Makeup" isEnabled={makeupEnabled} onToggle={() => setMakeupEnabled(!makeupEnabled)} selectedValue={selectedMakeup} onSelectChange={e => setSelectedMakeup(e.target.value)} options={MAKEUP_STYLES} textareaValue={makeupIdea} onTextareaChange={e => setMakeupIdea(e.target.value)} textareaPlaceholder="Warna lipstick, detail..." />
        </div>

        {/* Photography Style */}
        <div className="bg-[#FFE6F2] p-4 rounded-3xl border border-pink-100 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-pink-600 font-bold"><Sparkles size={16}/> Gaya Fotografi</div>
          </div>
          <select className="w-full p-2 rounded-xl text-xs bg-white border border-pink-200 focus:outline-none focus:ring-1 focus:ring-pink-300" value={selectedPhotoType} onChange={(e) => setSelectedPhotoType(e.target.value)}>
            <option value="">Pilih Gaya Utama</option>
            {PHOTOGRAPHY_STYLES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-2 mb-8 sticky bottom-0 bg-[#FFFDFE] py-4">
          <button disabled={loading} onClick={handleStartGeneration} className="col-span-2 bg-[#FF8FB1] hover:bg-[#ff7aa3] text-white font-bold py-4 rounded-3xl shadow-lg shadow-pink-200 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Mulai Buat
          </button>
          <button onClick={resetAll} className="bg-white border-2 border-pink-100 text-pink-400 font-bold py-3 rounded-2xl hover:bg-pink-50 flex items-center justify-center gap-2 transition-all active:scale-95">
            <Trash2 size={18} /> Reset
          </button>
          <button disabled={!generatedImage} className="bg-[#8FD3FF] hover:bg-[#7bc8ff] text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" onClick={downloadImage}>
            <Download size={18} /> Download
          </button>
        </div>
      </div>

      {/* Right Panel - Result */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className={`bg-white rounded-[40px] shadow-2xl border-8 border-[#FFE6F2] relative overflow-hidden group flex items-center justify-center transition-all duration-500 ease-in-out`} 
             style={{ aspectRatio: selectedAspectRatio.replace(':', '/') }}>
          {loading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
              <div className="relative w-24 h-24 mb-4">
                <Heart className="absolute inset-0 text-pink-200 fill-pink-100 animate-ping" style={{animationDuration: '1.5s'}} />
                <Heart className="absolute inset-0 text-[#FF8FB1] fill-[#FF8FB1] animate-bounce" />
              </div>
              <p className="text-pink-500 font-bold animate-pulse text-center px-4">Nano Banana sedang memoles...</p>
            </div>
          )}
          
          {error && (
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-pink-50">
               <X className="text-red-500 w-12 h-12 mb-4" />
               <p className="text-red-600 font-medium">{error}</p>
             </div>
          )}

          {generatedImage && !error ? (
            <img src={generatedImage} alt="Hasil Generasi" className="w-full h-full object-contain bg-gray-50" />
          ) : !loading && !error ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-pink-200">
               <ImageIcon size={64} className="mb-4 opacity-50" />
               <p className="font-bold text-xl text-center px-4">Siap untuk berkreasi?</p>
            </div>
          ) : null}
        </div>

        {/* History */}
        <section className="bg-white p-6 rounded-[32px] border border-pink-50 shadow-sm">
          <h3 className="text-pink-600 font-bold mb-4 flex items-center gap-2">
            <Sparkles size={16} /> Riwayat Terkini
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {history.map((img, idx) => (
              <div key={idx} onClick={() => setGeneratedImage(img)} className="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:ring-4 ring-[#FF8FB1] transition-all shadow-md hover:-translate-y-1">
                <img src={img} alt={`History ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
             {[...Array(Math.max(0, 6 - history.length))].map((_, i) => (
                <div key={`placeholder-${i}`} className="aspect-square rounded-2xl bg-gray-100" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
