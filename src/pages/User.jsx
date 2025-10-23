import React from 'react'
import Tablet from '../components/Tablet'
import Start from '../components/Start'
import '../css/bubbles.css' // 

const User = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Gelembung */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      {/* Konten Utama */}
      <div className="relative z-10">
        {/* Desktop Layout (≥ 1024px) - Tablet di kiri, Start di kanan */}
        <div className="hidden lg:flex min-h-screen items-center justify-center gap-4">
          {/* LEFT SIDE - Tablet */}
          <div className="flex-1 flex items-center justify-end translate-x-6">
            <Tablet />
          </div>

          {/* RIGHT SIDE - Start */}
          <div className="flex-1 flex items-center justify-start -translate-x-6">
            <Start />
          </div>
        </div>

        {/* Mobile & Tablet (< 1024px): tampilkan Tablet saja */}
        <div className="lg:hidden">
          <Tablet />
        </div>
      </div>
    </div>
  )
}

export default User
