import React, { useState, useCallback } from "react";
import axios from "axios";

const SkinToneFilter = () => {
  const [sessionId, setSessionId] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [undertone, setUndertone] = useState("");

  // URL backend production
  const BACKEND_URL = "https://web-production-480f.up.railway.app";

  // Upload gambar dengan session management
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/upload`, formData);
      setSessionId(res.data.session_id);
      setPreview(res.data.url);
    } catch (error) {
      console.error("Upload error:", error);
    }
    setLoading(false);
  };

  // Reset warna ke asli
  const handleReset = useCallback(async () => {
    if (!sessionId) return;
    
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/reset_color`, {
        session_id: sessionId
      });
      setPreview(res.data.original_url);
    } catch (error) {
      console.error("Reset error:", error);
    }
    setLoading(false);
  }, [sessionId]);

  // Ubah tone warna kulit dengan real-time updates
  const handleColorChange = useCallback(async (hexColor) => {
    if (hexColor === "RESET") {
      handleReset();
      return;
    }

    if (!sessionId) return;
    
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/apply_color`, {
        color: hexColor,
        session_id: sessionId
      });

      // Update preview dengan timestamp untuk force refresh
      setPreview(res.data.result_url);

      // Get recommendations
      const recRes = await axios.post(`${BACKEND_URL}/get_skin_recommendations`, {
        skin_tone: hexColor
      });
      
      setRecommendations(recRes.data.recommended_colors);
      setUndertone(recRes.data.undertone);
    } catch (error) {
      console.error("Color change error:", error);
    }
    setLoading(false);
  }, [sessionId, handleReset]);

  // Basic skin tone colors
  const basicColors = ["#E0AC89", "#D29482", "#BF8068", "#A45A73", "#8B4513"];

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input 
        type="file" 
        onChange={handleUpload}
        className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded file:border-none"
      />

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="preview"
            className={`rounded-lg transition-all duration-300 ease-in-out ${
              loading ? "opacity-70" : "opacity-100"
            }`}
            width={400}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      )}

      {/* Basic Skin Tone Selector */}
      <div className="flex gap-3 mt-4 flex-wrap justify-center">
        <button
          onClick={() => handleColorChange("RESET")}
          className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center hover:scale-110 transition-transform"
          title="Reset to original"
        >
          🔄
        </button>

        {basicColors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorChange(color)}
            className="w-12 h-12 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
            title={`Skin tone: ${color}`}
          />
        ))}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">
            Recommended Nail Colors for {undertone} Undertone
          </h3>
          <div className="flex gap-2 flex-wrap">
            {recommendations.map((color, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded border-2 border-white shadow"
                style={{ backgroundColor: color }}
                title={`Recommended: ${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinToneFilter;