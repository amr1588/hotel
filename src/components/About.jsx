import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const hotelData = [
  // ... your existing hotelData remains the same
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
    title: "LUXURY SUITE ROOM",
    desc: "Dark, textured walls meet plush bedding for the ultimate night's sleep.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
    title: "OCEAN VIEW",
    desc: "Floor-to-ceiling windows framing the endless Pacific horizon.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1974&auto=format&fit=crop",
    title: "CHILLY FOOD & BAR",
    desc: "Craft mixology served in a dimly lit, velvet-draped speakeasy.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=1854&auto=format&fit=crop",
    title: "AZURE POOL",
    desc: "Midnight swims in our temperature-controlled azure infinity pool.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    title: "GARDEN VILLA",
    desc: "A secluded sanctuary surrounded by ancient tropical flora.",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
    title: "EXECUTIVE ROOM",
    desc: "Minimalist luxury with a dedicated workspace and city skyline views.",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    title: "ROYAL SPA",
    desc: "Stone, steam, and silence. A sanctuary for total body restoration.",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    title: "SKY LOUNGE",
    desc: "Rooftop vibes with panoramic city lights and live jazz sessions.",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    title: "FINE DINING",
    desc: "Seasonal tasting menus served in an intimate, candlelit setting.",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1974&auto=format&fit=crop",
    title: "THE ATRIUM",
    desc: "A stunning architectural centerpiece for lounging and socializing.",
  },
];

export default function About() {
  const [index, setIndex] = useState(2);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SLIDE_WIDTH_VW = isMobile ? 70 : 30;
  const GAP_VW = isMobile ? 5 : 20;
  const slideWidthPx = (SLIDE_WIDTH_VW / 100) * windowWidth;
  const gapPx = (GAP_VW / 100) * windowWidth;
  const offsetPx =
    windowWidth / 2 - slideWidthPx / 2 - index * (slideWidthPx + gapPx);

  const hotelTransition = { duration: 0.9, ease: [0.77, 0, 0.18, 1] };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight")
        setIndex((prev) => Math.min(prev + 1, hotelData.length - 1));
      if (e.key === "ArrowLeft") setIndex((prev) => Math.max(prev - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    const velocityThreshold = 100;
    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      setIndex((prev) => Math.min(prev + 1, hotelData.length - 1));
    } else if (
      info.offset.x > threshold ||
      info.velocity.x > velocityThreshold
    ) {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  if (windowWidth === 0) return null;

  return (
    <section className="w-full h-screen bg-[#dacecb] flex items-center justify-center overflow-hidden relative">
      {/* --- DYNAMIC BACKGROUND SVG LINE --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="absolute w-[200%] h-full opacity-30"
          // We move the background at half the speed of the slides for a parallax effect
          animate={{ x: offsetPx * 0.3 }}
          transition={hotelTransition}
        >
          <path
            // This 'd' string creates a long, elegant curved path across the background
            d="M-500,800 C-200,900 200,100 500,500 C800,900 1200,100 1500,400"
            fill="transparent"
            stroke="black"
            strokeWidth="1"
          />
        </motion.svg>
      </div>

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full px-6 py-8 md:px-12 md:py-10 flex justify-between items-start text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.1em] text-black/80 z-40 uppercase font-sans">
        <div>Emily Hotel, 2022</div>
        <div className="text-right">
          <div className="mb-4">
            <span className="opacity-50 me-4">(0{index + 1})</span>
            <span>{hotelData[index].title.split(" ")[0]}</span>
          </div>
          <div className="text-[0.55rem] text-black/50 leading-tight">
            Photos by YOD Group &<br />
            Yevhenii Avramenko
          </div>
        </div>
      </div>

      {/* TRACK */}
      <div className="relative w-screen overflow-visible mt-[10vh] md:mt-[15vh] z-10">
        <motion.div
          className="flex items-start"
          drag="x"
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{
            gap: `${gapPx}px`,
            paddingTop: "5vh",
            paddingBottom: "5vh",
            cursor: "grab",
            x: offsetPx,
          }}
          animate={{ x: offsetPx }}
          transition={hotelTransition}
        >
          {hotelData.map((item, i) => {
            const isActive = i === index;
            return (
              <motion.div
                key={i}
                style={{
                  width: `${slideWidthPx}px`,
                  minWidth: `${slideWidthPx}px`,
                  zIndex: isActive ? 50 : 1,
                }}
                animate={{
                  scale: isActive ? 1.1 : 0.85,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={hotelTransition}
                className="relative flex flex-col items-center"
              >
                {/* IMAGE & TEXT MASKING (same as your original code) */}
                <div className="relative w-full h-[35vh] md:h-[50vh] mb-6 select-none pointer-events-none md:pointer-events-auto">
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      <motion.h1
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-black text-[8vw] md:text-[5vw] font-light whitespace-nowrap font-serif"
                      >
                        {item.title}
                      </motion.h1>
                    </div>
                  )}

                  <div className="absolute inset-0 overflow-hidden z-10">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.h1
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="text-white text-[8vw] md:text-[5vw] font-light whitespace-nowrap font-serif"
                        >
                          {item.title}
                        </motion.h1>
                      </div>
                    )}
                  </div>
                </div>

                {/* INFO */}
                <div className="w-full h-[80px] md:h-[100px] flex justify-between items-start mt-2 px-1">
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="flex justify-between items-center w-full"
                    >
                      <p className="text-[0.6rem] md:text-[0.7rem] text-gray-600 w-[65%] leading-relaxed text-left font-medium">
                        {item.desc}
                      </p>
                      <button className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-wider border border-gray-400 rounded-full px-4 py-2 md:px-6 md:py-2 hover:bg-black hover:text-white transition-colors">
                        Learn More
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
