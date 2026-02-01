import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// --- DATA: ALL IMAGES STANDARDIZED TO w=2000 & h=1500 ---
const roomData = [
  {
    id: 1,
    titleLine1: "KING-SIZE BED",
    titleLine2: "LAKE-VIEW",
    titleLine3: "ROOM",
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2000&h=1500&auto=format&fit=crop",
    description:
      "The rooms of the planned resort hotel are equipped with air conditioning, a desk, a kettle, a minibar, a safe, a flat-screen TV, a balcony and a private bathroom with a shower. Bed linen and towels are also provided in each room at Emily Resort.",
    features: [
      "1 KING-SIZE BED",
      "BALCONY",
      "LAKE VIEW",
      "FLAT-SCREEN TV",
      "CONDITIONER",
      "MINI-BAR",
      "FREE WIFI",
      "FREESTANDING TUB IN THE ROOM",
    ],
    price: "$200/DAY",
  },
  {
    id: 2,
    titleLine1: "OCEAN SUITE",
    titleLine2: "PANORAMIC",
    titleLine3: "VIEW",
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2000&h=1500&auto=format&fit=crop",
    description:
      "Experience unparalleled luxury in our Ocean Suite. Featuring floor-to-ceiling windows, a spacious living area, and direct access to a private terrace overlooking the endless horizon.",
    features: [
      "CALIFORNIA KING BED",
      "PRIVATE TERRACE",
      "OCEANFRONT VIEW",
      "SEPARATE LIVING AREA",
      "RAINFALL SHOWER",
      "24/7 ROOM SERVICE",
    ],
    price: "$450/DAY",
  },
  {
    id: 3,
    titleLine1: "GARDEN VILLA",
    titleLine2: "PRIVATE",
    titleLine3: "POOL",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&h=1500&auto=format&fit=crop",
    description:
      "A secluded sanctuary surrounded by lush tropical gardens. This villa features a private plunge pool, outdoor rainfall shower, and a spacious patio perfect for intimate dining.",
    features: [
      "KING BED",
      "PRIVATE PLUNGE POOL",
      "GARDEN VIEW",
      "OUTDOOR SHOWER",
      "PATIO DINING",
      "BUTLER SERVICE",
    ],
    price: "$600/DAY",
  },
];

// --- ANIMATIONS ---
const transitionSpec = { duration: 0.8, ease: [0.76, 0, 0.24, 1] };

const textRevealVariants = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { ...transitionSpec, delay: i * 0.15 },
  }),
  exit: { y: "-110%", transition: { duration: 0.5, ease: "easeInOut" } },
};

const featureListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const featureItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function RoomsSection() {
  const [current, setCurrent] = useState(0);
  const room = roomData[current];
  const totalRooms = roomData.length;

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: false });

  const nextSlide = () => setCurrent((prev) => (prev + 1) % totalRooms);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + totalRooms) % totalRooms);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isInView) return;
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen bg-[#2C3329] text-[#F3F0EB] relative px-4 py-3 md:px-12 md:py-8 flex flex-col overflow-hidden font-sans"
    >
      {/* ARTISTIC BACKGROUND LINE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            d="M 150 950 
               C 250 850, 500 450, 650 580 
               C 725 645, 950 850, 1150 750 
               C 1300 680, 1420 500, 1310 285 
               C 1250 150, 1350 80, 1450 40"
            stroke="#F3F0EB"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="opacity-30"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 3.8, ease: "easeInOut" }}
          />
        </svg>

        {/* HTML 'NEXT' BUTTON - RESIZED FOR MOBILE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 2.8 }}
          className="absolute z-10 flex items-center justify-center rounded-full border border-white"
          style={{
            left: "91%",
            top: "31.6%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* MOBILE: w-10 h-10 (40px)
             DESKTOP: w-24 h-24 (96px)
          */}
          <div className="w-8 h-8 md:w-24 md:h-24 flex items-center justify-center">
            <span className="text-white text-[6px] md:text-[10px] uppercase tracking-[0.2em] font-bold -rotate-15">
              NEXT
            </span>
          </div>
        </motion.div>
      </div>

      {/* HEADER */}
      <div className="w-full flex justify-between items-start z-20 shrink-0 mb-4 md:mb-8">
        <div className="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.1em] uppercase">
          Emily Hotel, 2022
        </div>
        <div className="hidden md:flex flex-col items-start w-1/3 ml-12 lg:ml-24">
          <div className="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.1em] uppercase mb-4">
            (Rooms)
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={room.id}
              initial={{ opacity: 0, y: 10 }}
              animate={
                isInView ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 10 }
              }
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[0.65rem] leading-relaxed font-medium text-left"
            >
              {room.description}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="text-right text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.1em] uppercase">
          <div>(01) Lobby</div>
          <div className="opacity-50 leading-tight mt-1 font-medium">
            Photos by YOD Group &<br />
            Yevhenii Avramenko
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow flex flex-col md:flex-row relative h-full">
        {/* IMAGE SECTION */}
        <div className="w-full md:w-[45%] flex flex-col relative z-10 h-full pr-0 md:pr-8">
          <div className="relative w-full flex-grow overflow-hidden rounded-sm">
            <AnimatePresence mode="wait">
              <motion.img
                key={room.id}
                variants={imageVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="exit"
                src={room.src}
                alt={room.titleLine1}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* CONTROLS */}
          <div className="flex justify-between items-center text-[0.7rem] font-bold tracking-widest mt-2 md:mt-6 uppercase w-full">
            <button
              onClick={prevSlide}
              className="hover:opacity-50 transition-opacity p-2 cursor-pointer"
            >
              &larr;
            </button>

            <div>
              {(current + 1).toString().padStart(2, "0")}/
              {totalRooms.toString().padStart(2, "0")}
            </div>

            <button
              onClick={nextSlide}
              className="hover:opacity-50 transition-opacity p-2 cursor-pointer"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="w-full md:w-[55%] flex flex-col justify-between relative z-20 h-full pt-3 md:pt-0 pl-0 md:pl-4 lg:pl-12">
          <div className="font-serif text-[12vw] md:text-[7vw] lg:text-[8vw] leading-[0.85] uppercase tracking-tighter">
            <AnimatePresence mode="wait">
              <div key={room.id}>
                {/* LINE 1 */}
                <div className="overflow-hidden relative md:-ms-40 lg:-ms-[600px]">
                  <motion.h1
                    custom={0}
                    variants={textRevealVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    exit="exit"
                  >
                    {room.titleLine1}
                  </motion.h1>
                </div>

                {/* LINE 2 */}
                <div className="overflow-hidden relative">
                  <motion.h1
                    custom={1}
                    variants={textRevealVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    exit="exit"
                  >
                    {room.titleLine2}
                  </motion.h1>
                </div>

                {/* LINE 3 */}
                <div className="overflow-hidden relative">
                  <motion.h1
                    custom={2}
                    variants={textRevealVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    exit="exit"
                  >
                    {room.titleLine3}
                  </motion.h1>
                </div>
              </div>
            </AnimatePresence>
          </div>

          {/* FOOTER AREA */}
          <div className="w-full flex flex-row justify-between items-end mt-auto pb-2 md:pb-6">
            <motion.div
              key={`price-${room.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="mb-1"
            >
              <button className="border border-[#F3F0EB]/40 rounded-full px-6 py-3 text-[0.65rem] md:text-[0.7rem] font-bold tracking-[0.15em] uppercase hover:bg-[#F3F0EB] hover:text-[#2C3329] transition-colors md:mb-0 mb-5">
                {room.price}
              </button>
            </motion.div>

            <motion.ul
              key={`features-${room.id}`}
              variants={featureListVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="exit"
              className="flex flex-col items-start text-left text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.15em] leading-loose opacity-80 uppercase md:mb-0"
            >
              {room.features.map((feature, i) => (
                <motion.li key={i} variants={featureItemVariants}>
                  • {feature}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
