import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "../css/svgCamera.css";
import Color from "./Color";

const Contnt = ({ scaleMobile = 1, onGetRecommendations, recommendations, onResetRecommendations}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSkinTone, setCurrentSkinTone] = useState(null);
  const [hasUploaded, setHasUploaded] = useState(false);

  // Upload ke backend Flask
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      console.log("Upload response:", data);
      
      if (res.ok) {
        setMessage("Foto berhasil diupload!"); // Pesan lebih sederhana
        setPreview(data.url);
        setSessionId(data.session_id);
        setHasUploaded(true);
        setCurrentSkinTone(null);
        onResetRecommendations();
      } else {
        setMessage(`Upload gagal: ${data.error}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Upload gagal - error jaringan");
    }
    setLoading(false);
  };

  // Terapkan filter warna ke gambar yang sudah diupload
  const handleColorChange = async (color) => {
    if (!sessionId) {
      alert("Upload foto dulu!");
      return;
    }

    console.log("Changing color to:", color, "Session:", sessionId);
    
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/apply_color", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          color: color,
          session_id: sessionId 
        }),
      });
      
      const data = await res.json();
      console.log("Color change response:", data);
      
      if (res.ok && data.success) {
        setPreview(data.result_url);
        setMessage("Warna berhasil diubah!");
        setCurrentSkinTone(color);
      } else {
        alert(`Gagal menerapkan warna: ${data.error}`);
      }
    } catch (err) {
      console.error("Color change error:", err);
      alert("Terjadi kesalahan saat mengubah warna.");
    }
    setLoading(false);
  };

  // Reset ke warna original
  const handleReset = async () => {
    if (!sessionId) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/reset_color", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          session_id: sessionId 
        }),
      });
      
      const data = await res.json();
      console.log("Reset response:", data);
      
      if (res.ok && data.success) {
        setPreview(data.original_url);
        setMessage("Warna direset ke original!");
        setCurrentSkinTone(null);
        onResetRecommendations();
      } else {
        alert(`Gagal reset: ${data.error}`);
      }
    } catch (err) {
      console.error("Reset error:", err);
      alert("Terjadi kesalahan saat reset.");
    }
    setLoading(false);
  };

  // Handler untuk ketika kategori undertone dipilih
  const handleCategorySelect = async (undertone) => {
    if (currentSkinTone && onGetRecommendations) {
      await onGetRecommendations(currentSkinTone, undertone);
    }
  };

  return (
    <div
      className={`bg-black text-white flex flex-col items-center justify-start min-h-screen pt-15 font-poppins z-1`}
      style={{ transform: `scale(${scaleMobile})` }}
    >
      {/* Kotak tampilan kamera / gambar */}
      <div
        className="relative border-2 border-white rounded-xl flex items-center justify-center mb-6 bg-[#be0442]
                    w-72 sm:w-80 md:w-80 lg:w-96
                    h-72 sm:h-80 md:h-80 lg:h-96
                    p-10 sm:p-12 md:p-16 lg:p-20 overflow-hidden"
      >
        {!preview && (
          <i className="bx bx-camera text-[7rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] icon-camera"></i>
        )}

        {preview && (
          <img
            src={preview}
            alt="Uploaded"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-all duration-300 ease-in-out ${
              loading ? "opacity-50" : "opacity-100"
            }`}
          />
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {/* Komponen Color - Hanya tampil setelah upload */}
        {hasUploaded && (
          <div className="absolute bottom-2 w-full px-2 z-10">
            <Color 
              onSelectColor={handleColorChange} 
              onReset={handleReset}
              currentSkinTone={currentSkinTone}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        )}
      </div>

      {/* Upload File */}
      <form
        className="flex justify-center items-center w-72 sm:w-80 md:w-80 lg:w-96 h-14 mb-6"
        onSubmit={handleUpload}
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-white bg-transparent focus:outline-none w-[90%]
                     file:bg-[#E91E63] file:text-white file:px-4 file:py-2 
                     file:rounded-sm file:border-none file:cursor-pointer"
          disabled={loading}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-pink-600 text-white rounded disabled:opacity-50 hover:bg-pink-700 transition-colors"
          disabled={loading}
        >
          {loading ? "..." : "Upload"}
        </button>
      </form>

      {message && (
        <p className={`text-white mt-2 ${message.includes('gagal') ? 'text-red-400' : 'text-green-400'}`}>
          {message}
        </p>
      )}

      {/* Tampilkan rekomendasi jika ada */}
      {recommendations && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg w-72 sm:w-80 md:w-80 lg:w-96">
          <h3 className="text-lg font-bold text-center mb-2">
            🎨 Rekomendasi Warna
          </h3>
          <p className="text-sm text-center text-gray-300 mb-3">
            {recommendations.message}
          </p>
          <div className="flex justify-center gap-3">
            {recommendations.recommended_colors && recommendations.recommended_colors.map((color, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color.hex || color }}
                title={color.name || color}
                onClick={() => handleColorChange(color.hex || color)}
              />
            ))}
          </div>
          <button
            onClick={onResetRecommendations}
            className="mt-3 px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors w-full"
          >
            Tutup Rekomendasi
          </button>
        </div>
      )}

      {/* Hapus debug info session ID */}

      {/* Instruction message sebelum upload */}
      {!hasUploaded && (
        <div className="mt-4 p-4 bg-blue-900 rounded-lg w-72 sm:w-80 md:w-80 lg:w-96 text-center">
          <p className="text-sm text-blue-200">
            Ayo Warnai Fhotomu Sekarang
          </p>
        </div>
      )}
    </div>
  );
};

export default Contnt;