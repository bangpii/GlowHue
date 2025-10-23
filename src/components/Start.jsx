import React, { useEffect, useState } from "react";
import "boxicons/css/boxicons.min.css";

const Start = () => {
  const [text, setText] = useState("");
  const fullText = "Welcome to Website";
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 70 : 150;
    const timeout = setTimeout(() => {
      if (!isDeleting && index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        setIndex(index + 1);
      } else if (isDeleting && index > 0) {
        setText(fullText.substring(0, index - 1));
        setIndex(index - 1);
      } else if (index === fullText.length) {
        setIsDeleting(true);
      } else if (index === 0 && isDeleting) {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <div className="flex flex-col justify-center items-start h-full text-white px-8 sm:px-16 md:px-24">
      {/* Konten utama */}
      <div className="mt-10">
        <h3 className="text-3xl text-gray-100 mb-2 font-extrabold tracking-wide">
          <span className="border-r-2 border-[#E91E63] pr-1 animate-pulse">
            {text}
          </span>
        </h3>

        {/* Logo */}
        <h1 className="text-8xl font-black tracking-wider mb-6">
          GLOW<span className="text-[#E91E63]">HUE</span>
        </h1>

        <p className="text-lg text-gray-300 mb-10 max-w-md leading-relaxed">
          Ayo Ubah Gaya Anda Sekarang dengan Teknologi AI yang Canggih!
        </p>

        {/* Ikon Sosial Media */}
        <div className="flex gap-6 mt-10">
          <a
            href="https://wa.me/6283192187108"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full border border-gray-400 flex items-center justify-center text-3xl text-gray-300 hover:text-[#25D366] hover:border-[#25D366] transition-all duration-300 transform hover:scale-110"
          >
            <i className="bx bxl-whatsapp"></i>
          </a>

          <a
            href="https://www.instagram.com/imrmndzz/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full border border-gray-400 flex items-center justify-center text-3xl text-gray-300 hover:text-[#E4405F] hover:border-[#E4405F] transition-all duration-300 transform hover:scale-110"
          >
            <i className="bx bxl-instagram"></i>
          </a>

          <a
            href="https://www.tiktok.com/@imrmndzz"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full border border-gray-400 flex items-center justify-center text-3xl text-gray-300 hover:text-[#FFF] hover:border-[#010101] transition-all duration-300 transform hover:scale-110"
          >
            <i className="bx bxl-tiktok"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Start;