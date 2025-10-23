import React from 'react';
import 'boxicons/css/boxicons.min.css';

const HeaderMobile = ({ onShowPreview }) => {
  const handleDownload = async () => {
    const imageUrl = document.querySelector('img[alt="Uploaded"]')?.src;
    
    if (!imageUrl) {
      alert('Tidak ada gambar untuk diunduh!');
      return;
    }

    try {
      // Fetch gambar dari URL
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Buat URL object dari blob
      const blobUrl = URL.createObjectURL(blob);
      
      // Buat elemen anchor untuk download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `glowhue-${Date.now()}.jpg`;
      link.style.display = 'none';
      
      // Tambahkan ke DOM dan trigger click
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      
      console.log('Download berhasil!');
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Gagal mengunduh gambar. Silakan coba lagi.');
    }
  };

  const handleShowPreview = () => {
    const imageUrl = document.querySelector('img[alt="Uploaded"]')?.src;
    if (imageUrl) {
      onShowPreview(imageUrl);
    } else {
      alert('Tidak ada gambar untuk dilihat!');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black text-white font-poppins shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-black tracking-wider">
          GLOW<span className="text-[#E91E63]">HUE</span>
        </h2>
      </div>

      {/* Social Media */}
      <div className="flex items-center gap-4">

        <button 
          onClick={handleShowPreview}
          className="relative group"
        >
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-[#E91E63] transition">
            <i className="bx bx-show text-xl group-hover:scale-110 transition"></i>
          </div>
        </button>

        <button 
          onClick={handleDownload}
          className="relative group"
        >
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-[#E91E63] transition">
            <i className="bx bx-download text-xl group-hover:scale-110 transition"></i>
          </div>
        </button>

      </div>
    </header>
  );
};

export default HeaderMobile;