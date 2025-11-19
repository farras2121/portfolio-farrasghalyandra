"use client";
import { useEffect, useState } from "react";
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from "next/image";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [zoomImage, setZoomImage] = useState(null); // khusus portrait zoom
  const [flippedIndex, setFlippedIndex] = useState(null); // buat animasi flip sertifikat

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: "smooth",
          });
        }
      });
    });

    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("fade-in-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(-45deg, #0f172a, #111827, #1e1b4b, #172554);
          background-size: 400% 400%;
          animation: gradient-animation 20s ease infinite;
          color: #e5e7eb;
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .fade-in { opacity: 0; transform: translateY(20px); transition: all 0.6s ease-out; }
        .fade-in-visible { opacity: 1; transform: translateY(0); }
        .profile-border {
          border: 3px solid rgba(255, 255, 255, 0.2);
          border-radius: 1.5rem;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .profile-border:hover {
          transform: scale(1.03);
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.3);
        }

        nav {
          transition: background-color 0.5s ease, padding 0.3s ease;
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease forwards; }
      `}</style>

      <main
        className="flex flex-col items-center justify-center text-center text-white overflow-x-hidden"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 84, 178, 0.15), transparent 80%)`,
        }}
      >

        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 w-full bg-gray-900/50 backdrop-blur-lg z-50 border-b border-gray-800 shadow-lg transition-all duration-300">
          <div className={`relative max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between ${isScrolled ? "py-4" : "py-2"}`}>
            <h1 className={`text-white font-bold tracking-wide ${isScrolled ? "text-xl" : "text-lg absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"}`}>
              Farras<span className="text-blue-500">G</span>
            </h1>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`sm:hidden text-gray-300 hover:text-blue-400 transition-all duration-500 ${isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>

{/* MENU MOBILE */}
{isMenuOpen && (
  <div
    className="absolute top-full left-0 w-full bg-gray-900/90 flex flex-col items-center py-6 sm:hidden border-t border-gray-700 animate-slideDown"
  >
    {[
      { name: "Home", href: "#home" },
      { name: "Tentang", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Projek", href: "#projects" },
      { name: "Sertifikat", href: "#sertifikat" },
    ].map((item) => (
      <a
        key={item.name}
        href={item.href}
        onClick={() => setIsMenuOpen(false)}
        className="w-full text-center py-3 text-gray-300 hover:text-blue-400 border-b border-gray-800 transition"
      >
        {item.name}
      </a>
    ))}
  </div>
)}

            <div className={`hidden sm:flex gap-6 text-gray-300 text-sm ${isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              {[{ name: "Home", href: "#home" }, { name: "Tentang", href: "#about" }, { name: "Skills", href: "#skills" }, { name: "Projek", href: "#projects" }, { name: "Sertifikat", href: "#sertifikat" }]
                .map((item) => (
                  <a key={item.name} href={item.href} className="hover:text-blue-400 transition">{item.name}</a>
                ))}
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 fade-in">
          <h1 className="text-5xl font-bold mb-4 leading-tight text-gray-50">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Farras Ghalyandra
            </span>
          </h1>
          <a href="#projects" className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-base transition-transform hover:scale-105">
            Lihat Projek Saya
          </a>
        </section>

        {/* ABOUT */}
        <section id="about" className="w-full bg-black/20 flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-24 fade-in">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-6 text-blue-400">Tentang Saya</h2>
            <p className="text-gray-300 mb-4">
              Saya Adalah <span className="text-white font-semibold">web developer</span> Fokus pada Front-End dan Back-End. Nikmati Pembuatan Website Modern dan Interaktif.
            </p>
            <p className="text-gray-400">
              Berpengalaman Menggunakan <span className="text-white">React</span>, <span className="text-white">Next.js</span>, and <span className="text-white">Laravel</span>.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="profile-border w-64 h-64 overflow-hidden flex items-center justify-center rounded-2xl">
              <img src="skils/farras.jpg" alt="Farras Ghalyandra" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </section>
        

        {/* SKILLS */}
        <section id="skills" className="w-full text-white flex flex-col items-center justify-center px-6 py-24 fade-in">
  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
    yang Telah Saya Pelajari
  </h2>

  <p className="text-gray-400 text-center max-w-2xl mb-12">
    Berikut adalah beberapa teknologi dan alat yang sering saya gunakan dalam proses pengembangan web.
  </p>

  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 w-full max-w-6xl">

    {[
      { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", img: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
      { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" },
      { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" },
      { name: "Vue.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Laravel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name: "Laragon", img: "skils/laragon-removebg-preview.png" },
      { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Canva", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
      { name: "Discord", img: "skils/DC-logo.jpg" },
      { name: "CapCut", img: "skils/CapCut.jpg" },
    ].map((skill, i) => (
      <div
        key={i}
        className="
          group relative p-4 rounded-2xl
          bg-gradient-to-b from-gray-800/40 to-gray-900/20
          border border-gray-700/40
          shadow-lg
          backdrop-blur-xl
          flex flex-col items-center justify-center
          transition-all duration-300
          hover:scale-[1.12]
          hover:shadow-[0_0_20px_rgba(0,150,255,0.4)]
          hover:border-blue-400/70
        "
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

        <img
          src={skill.img}
          alt={skill.name}
          className="w-14 h-14 object-contain relative z-10 drop-shadow-md"
        />

        <p className="text-gray-200 text-sm font-semibold text-center mt-2 relative z-10">
          {skill.name}
        </p>
      </div>
    ))}
  </div>
</section>


        {/* PROJECTS */}
<section id="projects" className="w-full bg-black/20 flex flex-col items-center justify-center py-24 fade-in">
  <div className="w-full max-w-7xl px-6">
    <h2 className="text-4xl font-bold mb-4 text-center sm:text-left">Projek Saya</h2>
    <p className="text-gray-400 text-center sm:text-left mb-12">
     Projek Yang Pernah Saya Kerjakan
    </p>

    <Splide
      options={{
        type: 'loop',
        perPage: 2,
        gap: '1.5rem',
        breakpoints: { 768: { perPage: 1 } },
      }}
      className="w-full"
    >
      {[
        {
          title: "Travel Website",
          desc: "Website Travel Berbasis Laravel.",
          img: "projects/img-travel.png",
          github: "https://github.com/farras2121/BNSP-Travel.git",
          linkedin: "https://www.linkedin.com/posts/farras-ghalyandra-644304387_website-travel-berbasis-laravel-yang-dirancang-activity-7392913554615496704-127X?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "Website Beasiswa",
          desc: "Website Beasiswa Berbasis Laravel.",
          img: "projects/img-beasiswa.png",
          github: "https://github.com/farras2121/beasiswa-bnsp",
          linkedin:"https://www.linkedin.com/posts/farras-ghalyandra-644304387_scholarship-website-is-a-web-based-scholarship-activity-7384927241261989888-0hm5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "Hotel Booking App",
          desc: "Website Hotel Berbasis Laravel.",
          img: "projects/img-hotel.png",
          github: "https://github.com/farras2121/bnsp-hotel",
          linkedin: "https://www.linkedin.com/posts/farras-ghalyandra-644304387_hotel-website-is-a-web-based-hotel-booking-activity-7384563766392143872-Qmxf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "Website E-Perpustakaan",
          desc: "Situs web perpustakaan login multiperan.",
          img: "projects/img-perpus.png",
          github: "https://github.com/farras2121/library-management-rpl1",
          linkedin: "https://www.linkedin.com/posts/farras-ghalyandra-644304387_saya-mengembangkan-e-perpustakaan-sebuah-activity-7393616562814881792--8Zp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "Website Pengaduan Siswa",
          desc: "Website pengaduan siswa berbasis Laravel.",
          img: "projects/img-pengaduansiswa.png",
          github: "https://github.com/farras2121/pengaduanSiswaRpl",
          linkedin: "https://www.linkedin.com/posts/farras-ghalyandra-644304387_saya-mengembangkan-website-pengaduan-siswa-activity-7393614970380365824-K4tR?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "App Vidio Clone",
          desc: "App Vidio Clone menggunakan React.js.",
          img: "projects/img-vidio.png",
          github: "https://github.com/farras2121/App-Vidio",
          type: "portrait"
        },
        {
          title: "App Jaki Clone",
          desc: "App Jaki Clone menggunakan React.js.",
          img: "projects/img-jaki.png",
          github: "https://github.com/farras2121/App-Jaki",
          type: "portrait"
        },
      ].map((project) => (
        <SplideSlide key={project.title}>
          <div className="bg-gray-900/70 border border-gray-700 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
            <img
              src={project.img}
              alt={project.title}
              className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${
                project.type === "portrait" ? "h-[500px] object-contain" : "aspect-video"
              }`}
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-5 flex-grow">{project.desc}</p>
              <div className="flex flex-wrap gap-3 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-transform hover:scale-105"
                >
                  Lihat Github
                </a>

                {project.linkedin && (
                  <a
                    href={project.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-transform hover:scale-105"
                >
                    Lihat LinkedIn
                  </a>
                )}
              </div>


            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  </div>
</section>

        {/* ==== SERTIFIKAT ==== */}
{/* ==== SERTIFIKAT ==== */}
<section id="sertifikat" className="w-full flex flex-col items-center justify-center py-24 fade-in">
  <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">Sertifikat Saya</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 w-full max-w-7xl">
    {[
      {
        front: "/projects/sertikom11.png",
        back: "/projects/NilaiSertikomKelas11-2.png",
      },
      {
        front: "/projects/sertikom2024.png",
        back: "/projects/NilaiSertikom2024 (2).png",
      },
      {
        front: "/projects/sertikomdes24.png",
        back: "/projects/nilaisertikom-des2024.png",
      },
      {
        front: "/projects/bnsp-sementara.png",
        type: "portrait", // vertikal full zoom
      },
    ].map((cert, i) => (
      <div
        key={i}
        onClick={() => {
          if (cert.type === "portrait") {
            setZoomImage(cert.front); // buka zoom
          } else if (cert.back) {
            setFlippedIndex(flippedIndex === i ? null : i); // flip landscape
          }
        }}
        className={`relative w-full ${
          cert.type === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
        } cursor-pointer [perspective:1000px]`}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flippedIndex === i ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* FRONT */}
          <div className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg [backface-visibility:hidden]">
            <Image
              src={cert.front}
              alt={`Sertifikat ${i + 1}`}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          {/* BACK — hanya landscape */}
          {cert.back && (
            <div className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Image
                src={cert.back}
                alt={`Sertifikat ${i + 1} (belakang)`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

{/* ===== MODAL ZOOM KHUSUS PORTRAIT ===== */}
{zoomImage && (
  <div
    className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 cursor-pointer"
    onClick={() => setZoomImage(null)}
  >
    <div className="relative w-full max-w-3xl h-[90vh]">
      <Image
        src={zoomImage}
        alt="Zoom Sertifikat"
        fill
        className="object-contain rounded-xl shadow-2xl"
      />
    </div>
  </div>
)}



        {/* ===== FOOTER ===== */} 
        <footer className="w-full text-gray-300 pt-16 relative"> 
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div> <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 px-6 text-center md:text-left"> <div className="md:w-1/2"> <h3 className="text-2xl font-semibold mb-2 text-white">
            Tetap Terhubung</h3> 
            <p className="text-gray-400 mb-4">
  {"Saya selalu terbuka terhadap peluang baru, kolaborasi, atau sekadar mengobrol tentang teknologi."}
</p>
 </div> 
            <div className="flex flex-row items-center gap-4 mx-auto md:mx-0 mt-8 md:mt-0"> 
              {[ { href: "https://github.com/farras2121", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", alt: "GitHub" }, 
              { href: "https://www.linkedin.com/in/farras-ghalyandra-644304387/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg", alt: "LinkedIn" }, 
              { href: "mailto:ghalyandraf@gmail.com", img: "https://cdn-icons-png.flaticon.com/512/732/732200.png", alt: "Email" }, ].map((icon) => ( <a key={icon.alt} href={icon.href} target="_blank" rel="noopener noreferrer" className="group"> 
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 hover:bg-blue-600 transition-all duration-300 shadow-lg transform hover:scale-110"> <img src={icon.img} alt={icon.alt} className="w-6 h-6 transition-all duration-300 group-hover:filter group-hover:invert" /> </div> </a> ))} </div> </div> 
              <div className="mt-16 border-t border-gray-800 py-6 text-center w-full"> <p className="text-gray-500 text-sm"> © {new Date().getFullYear()}{" "} <span className="font-medium text-gray-300">Farras Ghalyandra</span> </p> </div> </footer> </main> </> ); }