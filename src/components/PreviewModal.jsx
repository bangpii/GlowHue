import React from 'react';

const PreviewModal = ({ isOpen, onClose, imageUrl }) => {
  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      // Fetch gambar dari URL
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Buat URL object dari blob
      const blobUrl = URL.createObjectURL(blob);
      
      // Buat elemen anchor untuk download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `glowhue-preview-${Date.now()}.jpg`;
      link.style.display = 'none';
      
      // Tambahkan ke DOM dan trigger click
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      
      console.log('Download dari modal berhasil!');
    } catch (error) {
      console.error('Error downloading image from modal:', error);
      alert('Gagal mengunduh gambar. Silakan coba lagi.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop dengan blur */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-60 bg-black rounded-2xl p-6 max-w-4xl max-h-[90vh] w-full mx-4">
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">
            Preview Gambar
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        {/* Image Container */}
        <div className="flex justify-center items-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
          ) : (
            <div className="text-white text-center py-20">
              <i className="bx bx-image text-6xl mb-4 opacity-50"></i>
              <p>Tidak ada gambar untuk ditampilkan</p>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Tutup
          </button>
          {imageUrl && (
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-[#E91E63] text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
            >
              <i className="bx bx-download"></i>
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;