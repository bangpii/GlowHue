import React, { useState } from 'react';
import Header from '../components/Header';
import Contnt from '../components/Contnt';
import HeaderMobile from '../components/HeaderMobile';
import PreviewModal from '../components/PreviewModal';

const Tablet = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Fungsi untuk mendapatkan rekomendasi dari backend
  const getSkinRecommendations = async (skinTone, undertone) => {
    try {
      const response = await fetch('https://beckendglowhue.up.railway.app/get_skin_recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skin_tone: skinTone,
          undertone: undertone,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
        return data;
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
    return null;
  };

  // Fungsi untuk reset rekomendasi
  const resetRecommendations = () => {
    setRecommendations(null);
  };

  // Fungsi untuk membuka modal preview
  const handleShowPreview = (imageUrl) => {
    setCurrentImage(imageUrl);
    setShowPreviewModal(true);
  };

  // Fungsi untuk menutup modal preview
  const handleClosePreview = () => {
    setShowPreviewModal(false);
    setCurrentImage(null);
  };

  return (
    <div className="flex justify-center items-start sm:items-center h-screen bg-black relative">

      {/* Tablet Container hanya untuk sm ke atas */}
      <div className="hidden sm:relative sm:flex sm:justify-center sm:items-center sm:w-[500px] sm:h-[700px]">

        {/* SVG Tablet Frame */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 500 700"
          fill="none"
          className="absolute top-0 left-0 z-10"
        >
          <rect
            x="10"
            y="10"
            width="480"
            height="680"
            rx="30"
            stroke="#ffffff"
            strokeWidth="3"
            fill="#0a0a0a"
          />
          {/* Kamera depan */}
          <circle cx="250" cy="25" r="6" fill="#ffffff" />
        </svg>

        {/* Layar tablet */}
        <div className="absolute top-[35px] left-[20px] w-[460px] h-[630px] bg-black overflow-hidden rounded-[25px] z-20">
          {/* Header berada di lapisan paling atas */}
          <div className="relative z-30">
            <Header onShowPreview={handleShowPreview} />
          </div>

          {/* Konten di bawah header */}
          <div className="relative z-10 flex flex-col justify-start items-center h-full text-white">
            <Contnt 
              onGetRecommendations={getSkinRecommendations}
              recommendations={recommendations}
              onResetRecommendations={resetRecommendations}
              onShowPreview={handleShowPreview}
            />
          </div>
        </div>
      </div>

      {/* Mobile: tampilkan HeaderMobile dan Contnt, tanpa frame */}
      <div className="sm:hidden w-full flex flex-col items-center pt-20 overflow-hidden">
        <HeaderMobile onShowPreview={handleShowPreview} />
        <div className="w-[90%] max-w-[400px] mt-45 flex flex-col items-center scale-[1.2]">
          <Contnt 
            scaleMobile={1.1}
            onGetRecommendations={getSkinRecommendations}
            recommendations={recommendations}
            onResetRecommendations={resetRecommendations}
            onShowPreview={handleShowPreview}
          />
        </div>
      </div>

      {/* Modal Preview */}
      <PreviewModal 
        isOpen={showPreviewModal}
        onClose={handleClosePreview}
        imageUrl={currentImage}
      />

    </div>
  );
};

export default Tablet;