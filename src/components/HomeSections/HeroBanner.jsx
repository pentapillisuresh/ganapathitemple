import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  HandHeart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const bannerData = [
    {
      video: "./videos/temple2.mp4", // Replace with your video path
      subtitle: "Experience Divine Blessings Through Traditional Worship",
      line1: "శ్రీ చింతామణి గణపతి దత్త క్షేత్రము",
    },
    {
      video: "./videos/banner-video2.mp4", // Replace with your video path
      subtitle: "Experience Spiritual Enlightenment and Inner Peace",
      line1: "32 Forms of Ganapathi",
    },
    {
      video: "./videos/banner-video3.mp4", // Replace with your video path
      subtitle: "Experience Divine Blessings Through Traditional Worship",
      line1: "Daily Poojas & Special Ceremonies",
    },
  ];

  // Handle video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.play().catch(e => console.log("Auto-play prevented:", e));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentSlide]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 15000); // Increased time for videos

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
    <section className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full">
        {bannerData.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
              index === currentSlide
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                ref={el => videoRefs.current[index] = el}
                className={`w-full h-full object-cover ${
                  index === currentSlide ? "animate-videoZoom" : ""
                }`}
                src={banner.video}
                muted
                loop
                playsInline
                preload="metadata"
                poster={banner.poster} // Optional: Add poster image for loading
              />
              {/* Fallback image if video doesn't load */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-5xl mx-auto">
                {/* Temple Name */}
                <div
                  className={`mb-6 ${
                    index === currentSlide
                      ? "animate-titleStagger"
                      : "opacity-0"
                  }`}
                >
                  <h1
                    style={{ fontFamily: "serif" }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-white leading-tight drop-shadow-2xl"
                  >
                    {banner.line1}
                  </h1>
                </div>

                {/* Subtitle */}
                <p
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 mb-8 leading-relaxed font-medium drop-shadow-lg ${
                    index === currentSlide
                      ? "animate-subtitleIn"
                      : "opacity-0"
                  }`}
                >
                  {banner.subtitle}
                </p>

                {/* Buttons */}
                {/* <div
                  className={`flex flex-col sm:flex-row gap-4 justify-center ${
                    index === currentSlide
                      ? "animate-buttonsIn"
                      : "opacity-0"
                  }`}
                >
                  <button
                    onClick={() => navigate("/donation")}
                    className="group border-2 border-secondary text-white bg-secondary/90 backdrop-blur-sm px-6 py-3 rounded-full font-semibold hover:bg-secondary hover:shadow-2xl transition-all duration-300 shadow-xl flex items-center gap-2 hover:scale-105"
                  >
                    <Heart size={18} />
                    Donate Now
                  </button>

                  <button
                    onClick={() => navigate("/appointment")}
                    className="group border-2 border-secondary text-white bg-secondary/90 backdrop-blur-sm px-6 py-3 rounded-full font-semibold hover:bg-secondary hover:shadow-2xl transition-all duration-300 shadow-xl flex items-center gap-2 hover:scale-105"
                  >
                    <Calendar size={18} />
                    Book Ritual
                  </button>

                  <button
                    onClick={() => navigate("/volunteer")}
                    className="group border-2 border-secondary text-white bg-secondary/90 backdrop-blur-sm px-6 py-3 rounded-full font-semibold hover:bg-secondary hover:shadow-2xl transition-all duration-300 shadow-xl flex items-center gap-2 hover:scale-105"
                  >
                    <HandHeart size={18} />
                    Volunteer
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentSlide
                ? "bg-secondary border-secondary scale-125"
                : "border-white/60 hover:border-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause/Play Auto-scroll */}
      {/* <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm hover:bg-black/60 transition-all"
      >
        {isAutoPlaying ? "Pause" : "Play"}
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
          animation: videoZoom 15s ease-in-out infinite alternate;
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
        body { 
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
        
        /* Smooth transitions */
        * {
          transition: opacity 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default BannerCarousel;