import Navbar from './components/Navbar'
import Hero from './components/Hero';
import About from './components/About';


function App() {
 
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar bg-stone-900">
      {/* SECTION 1: HERO (Contains the Navbar) */}
      <section className="h-screen w-full snap-start relative">
        <Hero />
      </section>

      {/* SECTION 2: ABOUT (No Navbar) */}
      <section className="min-h-screen w-full snap-start relative">
        <About />
      </section>
    </main>
  );
}

export default App
