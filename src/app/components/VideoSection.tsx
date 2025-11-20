'use client';

import React, { useRef, useState } from 'react';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Título da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Veja como a Loquia funciona
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra como conectamos sua marca às principais IAs do mercado
          </p>
        </div>

        {/* Container do Vídeo */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
            {/* Vídeo */}
            <video
              ref={videoRef}
              className="w-full h-auto"
              controls
              playsInline
              poster="/videos/thumbnail.jpg" // Opcional: adicione uma thumbnail
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/videos/Loquia-HD1080p.mp4" type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeos.
            </video>

            {/* Overlay de Play (opcional - aparece quando pausado) */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer transition-opacity hover:bg-opacity-40"
                onClick={togglePlay}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                  <svg 
                    className="w-10 h-10 md:w-12 md:h-12 text-gray-900 ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Informações Adicionais (opcional) */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Assista ao vídeo para entender como a Loquia pode transformar a presença digital da sua empresa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
