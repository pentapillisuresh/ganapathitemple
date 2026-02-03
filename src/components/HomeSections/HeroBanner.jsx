import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const bannerData = [
    {
      type: "video",
      video: "./videos/temple2.mp4",
      poster: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      subtitle: "Experience Divine Blessings Through Traditional Worship",
      line1: "శ్రీ చింతామణి గణపతి దత్త క్షేత్రము",
    },
    {
      type: "image",
      image: "/images/banner2.jpg",
      subtitle: "Experience Spiritual Enlightenment and Inner Peace",
      line1: "32 Forms of Ganapathi",
    },
    {
      type: "image",
      image: "/images/banner3.jpg",
      subtitle: "Experience Divine Blessings Through Traditional Worship",
      line1: "Daily Poojas & Special Ceremonies",
    },
  ];

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      if (currentSlide === 0) {
        videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [currentSlide]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 10000); // 10 seconds per slide

    return () => clearInterval(interval);
  }, [isAutoPlaying, bannerData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-primary">
      <div className="relative w-full h-full">
        {bannerData.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ${index === currentSlide
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            {/* Background - Video for first slide, Images for others */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {banner.type === "video" ? (
                <video
                  ref={index === 0 ? videoRef : null}
                  className={`w-full h-full object-cover ${index === currentSlide ? "animate-videoZoom" : ""
                    }`}
                  src={banner.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={banner.poster}
                />
              ) : (
                <img
                  src={banner.image}
                  alt={banner.line1}
                  className={`w-full h-full object-cover ${index === currentSlide ? "animate-imageZoom" : ""
                    }`}
                  loading="lazy"
                />
              )}

              {/* Solid overlay for better text visibility without gradients */}
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-5xl mx-auto">
                {/* Temple Name with serif font */}
                <div
                  className={`mb-6 ${index === currentSlide
                      ? "animate-titleStagger"
                      : "opacity-0"
                    }`}
                >
                  <h1
                    className="serif-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-primary leading-tight drop-shadow-2xl"
                  >
                    {banner.line1}
                  </h1>
                </div>

                {/* Subtitle */}
                <p
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary/95 mb-8 leading-relaxed font-medium drop-shadow-lg ${index === currentSlide
                      ? "animate-subtitleIn"
                      : "opacity-0"
                    }`}
                >
                  {banner.subtitle}
                </p>

                {/* Buttons - Using requested buttons */}
                <div
                  className={`flex flex-col sm:flex-row gap-4 justify-center ${index === currentSlide
                      ? "animate-buttonsIn"
                      : "opacity-0"
                    }`}
                >
                  {/* Donate Now Button - Primary color */}
                  <button
                    onClick={() => navigate("/donation")}
                    className="group bg-primary text-secondary hover:bg-secondary hover:text-primary border-2 border-primary px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl flex items-center justify-center gap-2 hover:scale-105 text-lg min-w-[180px]"
                  >
                    <Heart size={20} />
                    Donate Now
                  </button>

                  {/* Activity Button - Secondary color */}
                  <button
                    onClick={() => navigate("/activities")}
                    className="group bg-secondary text-primary hover:bg-primary hover:text-secondary border-2 border-secondary px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl flex items-center justify-center gap-2 hover:scale-105 text-lg min-w-[180px]"
                  >
                    <Calendar size={20} />
                    Activity
                  </button>

                  {/* Halls Button - Primary color */}
                  <button
                    onClick={() => navigate("/banquetHalls")}
                    className="group bg-primary text-secondary hover:bg-secondary hover:text-primary border-2 border-primary px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-xl flex items-center justify-center gap-2 hover:scale-105 text-lg min-w-[180px]"
                  >
                    <Building size={20} />
                    Halls
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-secondary/90 hover:bg-secondary text-primary p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-primary"
        aria-label="Previous slide"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-secondary/90 hover:bg-secondary text-primary p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-primary"
        aria-label="Next slide"
      >
        <ChevronRight size={26} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-125 ${index === currentSlide
                ? "bg-secondary border-secondary scale-125 shadow-lg"
                : "border-primary hover:border-secondary bg-transparent"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      {/* <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-6 right-6 z-20 bg-secondary/90 hover:bg-secondary text-primary px-4 py-2 rounded-full text-sm transition-all border-2 border-primary hover:scale-105 flex items-center gap-2"
      >
        <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-primary' : 'bg-red-400'}`} />
        {isAutoPlaying ? "Auto Playing" : "Paused"}
      </button> */}

      {/* Animations */}
      <style>{`
        @keyframes videoZoom {
          0% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes imageZoom {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes titleStagger {
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.95); 
            filter: blur(4px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
            filter: blur(0);
          }
        }
        
        @keyframes subtitleIn {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95);
            filter: blur(4px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes buttonsIn {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95);
            filter: blur(4px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        .animate-videoZoom { 
          animation: videoZoom 20s ease-in-out infinite alternate;
        }
        
        .animate-imageZoom { 
          animation: imageZoom 20s ease-in-out infinite alternate;
        }
        
        .animate-titleStagger { 
          animation: titleStagger 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-subtitleIn { 
          animation: subtitleIn 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s;
        }
        
        .animate-buttonsIn { 
          animation: buttonsIn 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.4s;
        }
        
        /* Smooth transitions */
        * {
          transition: opacity 0.3s ease;
        }
        
        /* Improve image loading */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .absolute.bottom-8 {
            bottom: 4rem;
          }
          
          .absolute.top-6 {
            top: 1rem;
            right: 1rem;
          }
          
          button.bg-secondary\\/90 {
            padding: 0.75rem;
          }
          
          .text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          
          .text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
          }
          
          .flex.flex-col.sm\\:flex-row {
            gap: 0.75rem;
          }
          
          .px-8 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          
          .min-w-\\[180px\\] {
            min-width: 160px;
          }
        }
        
        @media (max-width: 480px) {
          .text-3xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          
          .text-lg {
            font-size: 1rem;
            line-height: 1.5rem;
          }
          
          .flex.flex-col {
            gap: 0.5rem;
          }
          
          .min-w-\\[180px\\] {
            min-width: 140px;
          }
          
          .px-8 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .py-4 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          
          .text-lg {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
};

export default BannerCarousel;