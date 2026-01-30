import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import RoomsSection from "./components/RoomFeatures";
import { useEffect, useRef } from "react";


function App() {

  const mainRef = useRef(null);

  useEffect(() => {    
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, []);

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar bg-stone-900"
    ref={mainRef}>
      {/* HERO */}
      <section className="h-screen w-full snap-start relative">
        <Hero />
      </section>

      {/* ABOUT */}
      <section className="min-h-screen w-full snap-start relative">
        <About />
      </section>

      {/* ROOMS */}
      <section className="h-screen w-full snap-start relative">
        <RoomsSection />
      </section>
    </main>
  );
}

export default App;
