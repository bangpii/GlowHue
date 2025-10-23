import React, { useState, useEffect, useCallback } from "react";

const Color = ({ onSelectColor, onReset, currentSkinTone, onCategorySelect }) => {
  const warna = {
    COOL: [
      { name: "Light Cool", hex: "#E8F4FD" },
      { name: "Rosy Pink", hex: "#F8D7E3" },
      { name: "Lavender", hex: "#F0E8FF" },
      { name: "Cool Nude", hex: "#F5EDF7" },
      { name: "Medium Cool", hex: "#D8E6F1" },
      { name: "Berry", hex: "#E8A0B8" },
      { name: "Rose Mauve", hex: "#E8C4C8" },
      { name: "Deep Berry", hex: "#D6A5B0" },
      { name: "Royal Purple", hex: "#D8CEE5" },
      { name: "Navy Blue", hex: "#C5D0E6" },
      { name: "Ruby Red", hex: "#E8B4B8" },
    ],
    NEUTRAL: [
      { name: "Light Natural", hex: "#F9F5EB" },
      { name: "Rosy Nude", hex: "#FFE8D6" },
      { name: "Taupe", hex: "#E8DED2" },
      { name: "Muted Peach", hex: "#FFEBD7" },
      { name: "Medium Neutral", hex: "#E8D5C4" },
      { name: "Mauve", hex: "#F0DDE8" },
      { name: "Dusty Rose", hex: "#E8D1C5" },
      { name: "Warm Taupe", hex: "#E8D9C8" },
      { name: "Deep Neutral", hex: "#D8CBBB" },
      { name: "Deep Mauve", hex: "#E8CDD5" },
      { name: "Espresso", hex: "#D8C4B8" },
      { name: "Muted Burgundy", hex: "#E8C8CE" },
    ],
    WARM: [
      { name: "Light Warm", hex: "#FFF5E6" },
      { name: "Warm Nude", hex: "#FFEBD6" },
      { name: "Terracotta", hex: "#F8D7C9" },
      { name: "Apricot", hex: "#FFE8D6" },
      { name: "Medium Warm", hex: "#F0D9C4" },
      { name: "Coral Red", hex: "#FFD1C8" },
      { name: "Copper", hex: "#F0C8A8" },
      { name: "Caramel", hex: "#F0D0B0" },
      { name: "Golden Brown", hex: "#F0D8A8" },
      { name: "Tan Warm", hex: "#F0D8B0" },
      { name: "Bronze", hex: "#F0C890" },
      { name: "Burnt Orange", hex: "#FFD0A8" },
      { name: "Olive Green", hex: "#E8E0C0" },
      { name: "Honey Gold", hex: "#F0DCB0" },
      { name: "Deep Warm", hex: "#E8C8A0" },
      { name: "Chocolate Brown", hex: "#E8D0C0" },
      { name: "Maroon", hex: "#E8C0C0" },
      { name: "Deep Amber", hex: "#FFE0A8" },
      { name: "Metallic Gold", hex: "#F0E0A8" },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendedColors, setRecommendedColors] = useState([]);

  const bgColors = {
    COOL: "bg-blue-300 hover:bg-blue-400",
    NEUTRAL: "bg-gray-300 hover:bg-gray-400",
    WARM: "bg-orange-300 hover:bg-orange-400",
  };

  // Skin tone recommendations based on undertone dengan logika if-else
  const getSkinToneRecommendations = useCallback((skinTone, undertone) => {
    if (!skinTone || !undertone) return [];
    
    const hex = skinTone.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Logika if-else untuk menentukan jenis kulit
    let skinType = '';
    let recommendationMessage = '';
    
    if (brightness < 85) {
      // Kulit Hitam/Gelap
      skinType = 'DARK';
      recommendationMessage = 'Untuk kulit hitam/gelap, kami merekomendasikan:';
    } else if (brightness < 170) {
      // Kulit Sawo Matang/Medium
      skinType = 'MEDIUM';
      recommendationMessage = 'Untuk kulit sawo matang, kami merekomendasikan:';
    } else {
      // Kulit Putih/Cerah
      skinType = 'LIGHT';
      recommendationMessage = 'Untuk kulit putih/cerah, kami merekomendasikan:';
    }
    
    const skinKey = `${skinType}_${undertone}`;
    
    // Rekomendasi warna berdasarkan kombinasi skinType dan undertone
    const recommendations = {
      // Kulit Hitam
      DARK_COOL: ["#B76E79", "#C08081", "#8B004B", "#5C0D0D"],
      DARK_NEUTRAL: ["#8B7D6B", "#915F6D", "#4B3621", "#800020"],
      DARK_WARM: ["#8B4000", "#5C4033", "#800000", "#CD7F32"],
      
      // Kulit Sawo Matang
      MEDIUM_COOL: ["#A3C1D1", "#C08081", "#7851A9", "#9B111E"],
      MEDIUM_NEUTRAL: ["#C0A080", "#DCAE96", "#8B7D6B", "#915F6D"],
      MEDIUM_WARM: ["#D2A679", "#B87333", "#AF6E4D", "#996515"],
      
      // Kulit Putih
      LIGHT_COOL: ["#DDEEFF", "#FFC0CB", "#E6E6FA", "#F0E6F6"],
      LIGHT_NEUTRAL: ["#F5F5DC", "#FFDAB9", "#483C32", "#FFE5B4"],
      LIGHT_WARM: ["#FFE4B5", "#FFCC99", "#E2725B", "#FBCEB1"],
    };
    
    return {
      colors: recommendations[skinKey] || [],
      message: recommendationMessage,
      skinType: skinType.toLowerCase()
    };
  }, []);

  useEffect(() => {
    if (selectedCategory && currentSkinTone) {
      const recommendationData = getSkinToneRecommendations(currentSkinTone, selectedCategory);
      setRecommendedColors(recommendationData.colors);
      setShowRecommendation(true);
    }
  }, [selectedCategory, currentSkinTone, getSkinToneRecommendations]);

  const getSkinTypeDisplay = (skinType) => {
    switch(skinType) {
      case 'dark': return 'hitam/gelap';
      case 'medium': return 'sawo matang';
      case 'light': return 'putih/cerah';
      default: return '';
    }
  };

  const handleColorClick = (hexColor) => {
    console.log("Color selected:", hexColor);
    onSelectColor(hexColor);
    setShowRecommendation(false);
  };

  const handleResetClick = () => {
    console.log("Reset clicked");
    onReset();
    setSelectedCategory(null);
    setShowRecommendation(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    
    // Panggil fungsi onCategorySelect jika tersedia
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const handleRecommendationClick = (color) => {
    handleColorClick(color);
  };

  const getRecommendationData = () => {
    if (!currentSkinTone || !selectedCategory) return { colors: [], message: '', skinType: '' };
    return getSkinToneRecommendations(currentSkinTone, selectedCategory);
  };

  const recommendationData = getRecommendationData();

  return (
    <div className="w-full p-1 relative">
      {/* Recommendation Popup */}
      {showRecommendation && (
        <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl z-50 border border-gray-300">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                🎨 Rekomendasi Warna Terbaik
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {recommendationData.message}
              </p>
            </div>
            <button
              onClick={() => setShowRecommendation(false)}
              className="text-gray-500 hover:text-gray-700 text-lg font-bold bg-gray-200 hover:bg-gray-300 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
              Kulit {getSkinTypeDisplay(recommendationData.skinType)} + {selectedCategory} undertone
            </span>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {recommendedColors.map((color, index) => (
              <div
                key={index}
                onClick={() => handleRecommendationClick(color)}
                className="flex-shrink-0 w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform border-2 border-white shadow-lg flex items-center justify-center group relative"
                style={{ backgroundColor: color }}
                title={color}
              >
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-[8px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {color}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-[10px] text-gray-500 mt-2 text-center">
            Klik warna untuk menerapkan
          </p>
        </div>
      )}

      {/* Reset Button */}
      <div className="flex justify-center mb-3">
        <button
          onClick={handleResetClick}
          className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
        >
          🔄 Reset ke Original
        </button>
      </div>

      {/* Bar utama 3 kategori */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar justify-center mb-4">
        {Object.keys(warna).map((key) => (
          <div
            key={key}
            onClick={() => handleCategoryClick(key)}
            className={`flex-shrink-0 w-24 h-14 flex items-center justify-center text-center rounded-xl cursor-pointer transition-all duration-300 ${bgColors[key]} ${
              selectedCategory === key 
                ? "ring-3 ring-white ring-opacity-80 shadow-lg transform scale-105 font-bold" 
                : "shadow-md hover:shadow-lg"
            }`}
          >
            <h2 className="text-[10px] font-semibold text-gray-800 uppercase tracking-wide">
              {key}
            </h2>
          </div>
        ))}
      </div>

      {/* Anak warna muncul ketika kategori diklik */}
      {selectedCategory && (
        <div className="bg-gray-100 rounded-xl p-3 shadow-inner">
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full">
            {warna[selectedCategory].map((item, i) => (
              <div
                key={i}
                onClick={() => handleColorClick(item.hex)}
                className="flex-shrink-0 rounded-xl p-3 w-24 h-14 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 border border-white shadow-md hover:shadow-lg group"
                style={{ backgroundColor: item.hex }}
                title={`${item.name} - ${item.hex}`}
              >
                <span className="text-[9px] font-semibold text-gray-800 text-center leading-tight group-hover:font-bold">
                  {item.name.split(' ')[0]}
                </span>
                <span className="text-[7px] text-gray-600 mt-1 hidden group-hover:block">
                  {item.hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// CSS untuk hide scrollbar
const style = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Only add style once
if (!document.querySelector('style[data-color-component]')) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-color-component', 'true');
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}

export default Color;