import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/HeroBG.jpg";
import Navbar from "./Navbar";

export default function Hero() {
  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const letterVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      filter: "blur(20px)", // <--- THIS Creates the "Weird" foggy look
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)", // Becomes sharp
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9], // Smooth "Luxury" easing
      },
    },
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // Fast stagger for letters inside the word
        delayChildren: 0.2, // Small delay before starting
      },
    },
  };

  // We need a parent container variant to stagger the WORDS themselves
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delays the start of each word (Grand -> Emily -> Hotel)
        delayChildren: 0.3,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 1.2 },
    },
  };

  const title = "GRAND EMILY HOTEL";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900">
      <Navbar/>
      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <motion.img
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          src={heroImage}
          alt="Grand Emily Hotel Lobby"
          className="w-full h-full object-cover opacity-70"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center text-center text-white px-4">
        {/* ANIMATED TITLE (Letter by Letter) */}
        <motion.h1
          variants={containerVariants} // <--- ATTACHED THE CONTAINER VARIANTS HERE
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl md:text-5xl lg:text-8xl mb-12 flex justify-center flex-wrap gap-x-3 md:gap-x-6"
        >
          {title.split(" ").map((word, i) => (
            // We animate each WORD separately so they appear together
            <motion.span
              key={i}
              variants={wordVariants} // Each word manages its own timing
              className="inline-flex overflow-hidden"
            >
              {word.split("").map((char, j) => (
                <motion.span
                  key={j}
                  variants={letterVariants} // The blur effect is here
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.h1>

        {/* 3. THE FLOATING 'PILL' MENU */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:max-w-5xl max-w-[400px] grid grid-cols-1 md:grid-cols-4 gap-8 items-end text-left mx-auto"
        >
          {/* Input 1: Dates */}
          <div className="border-b border-white/50 pb-3 cursor-pointer group hover:border-white transition">
            <span className="text-lg md:text-xl font-sans tracking-wide text-white/70">
              Dates
            </span>
            <span className="float-right text-xs opacity-50 mt-2">▼</span>
          </div>

          {/* Input 2: Rooms */}
          <div className="border-b border-white/50 pb-3 cursor-pointer group hover:border-white transition">
            <span className="text-lg md:text-xl font-sans tracking-wide text-white/70">
              Rooms
            </span>
            <span className="float-right text-xs opacity-50 mt-2">▼</span>
          </div>

          {/* Input 3: Adults/Children */}
          <div className="border-b border-white/50 pb-3 cursor-pointer group hover:border-white transition">
            <span className="text-lg md:text-xl font-sans tracking-wide text-white/70">
              Adults / Children
            </span>
            <span className="float-right text-xs opacity-50 mt-2">▼</span>
          </div>

          {/* THE BUTTON */}
          <div className="flex justify-end md:me-2">
            <button className="uppercase text-xs font-bold tracking-[0.2em] border border-white/60 rounded-full px-10 py-4 hover:bg-white hover:text-black transition duration-300 flex items-center gap-2 text-white/70 mx-auto md:mx-0">
              Let's Go
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* 4. BOTTOM DESCRIPTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }} // Appears last
        className="absolute bottom-10 left-0 w-full text-center px-4"
      >
        <p className="text-white/70 text-xs md:text-sm max-w-xl mx-auto font-light">
          Grand Emily Hotel is part of the new Emily Resort in Vynnyky town near
          Lviv. The large scale installation in the atrium is the iconic image
          of the whole complex.
        </p>
      </motion.div>
    </section>
  );
}
