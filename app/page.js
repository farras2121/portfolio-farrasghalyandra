"use client";
import { useEffect, useState } from "react";
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from "next/image";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Projects", href: "#projects" },
      { name: "certificate", href: "#sertifikat" },
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
              {[{ name: "Home", href: "#home" }, { name: "About", href: "#about" }, { name: "Skills", href: "#skills" }, { name: "Projects", href: "#projects" }, { name: "certificate", href: "#sertifikat" }]
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
            Show My Projects
          </a>
        </section>

        {/* ABOUT */}
        <section id="about" className="w-full bg-black/20 flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-24 fade-in">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-6 text-blue-400">About Me</h2>
            <p className="text-gray-300 mb-4">
              I am a <span className="text-white font-semibold">web developer</span> Focus on both front-end and back-end. Enjoy creating modern and interactive websites.
            </p>
            <p className="text-gray-400">
              Experienced with <span className="text-white">React</span>, <span className="text-white">Next.js</span>, and <span className="text-white">Laravel</span>.
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">What I Have Learned</h2>
          <p className="text-gray-400 text-center max-w-2xl mb-12">
            Here are some technologies and tools that I frequently use in the web development process.
          </p>
          <div className="relative w-full max-w-7xl overflow-hidden">
            <div className="absolute top-0 left-0 w-1/6 h-full bg-gradient-to-r from-gray-900/0 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-gray-900/0 to-transparent z-10 pointer-events-none"></div>
            <div className="scroll-track flex gap-8 w-max p-4">
              {[ ...[ { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }, { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }, { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }, { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }, { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }, { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg" }, { name: "Tailwind CSS", img: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" }, { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" }, { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" }, { name: "Vue.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" }, { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" }, { name: "Laravel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" }, { name: "Laragon", img: "skils/laragon-removebg-preview.png" }, { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }, { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }, { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }, { name: "Canva", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },], ...[ /* duplikat sama */ ] ].map((skill, i) => (
                <div key={i} className="skill-card-wrapper flex-shrink-0 w-32 h-32">
                  <div className="group bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center">
                    <img src={skill.img} alt={skill.name} className="w-14 h-14 object-contain mb-2 transition-transform duration-300 group-hover:scale-110" />
                    <p className="text-gray-300 text-xs font-medium">{skill.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <style>{`
              .scroll-track { animation: scroll 40s linear infinite; }
              @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            `}</style>
          </div>
        </section>

        {/* PROJECTS */}
<section id="projects" className="w-full bg-black/20 flex flex-col items-center justify-center py-24 fade-in">
  <div className="w-full max-w-7xl px-6">
    <h2 className="text-4xl font-bold mb-4 text-center sm:text-left">My Projects</h2>
    <p className="text-gray-400 text-center sm:text-left mb-12">
     Some of the projects I have worked on.
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
          desc: "Laravel-based tour package booking website.",
          img: "projects/img-travel.png",
          github: "https://github.com/farras2121/BNSP-Travel.git",
          linkedin: "https://www.linkedin.com/posts/farras-ghalyandra-644304387_website-travel-berbasis-laravel-yang-dirancang-activity-7392913554615496704-127X?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "Scholarship Application Website",
          desc: "Laravel-based scholarship registration website.",
          img: "projects/img-beasiswa.png",
          github: "https://github.com/farras2121/beasiswa-bnsp",
          linkedin:"https://www.linkedin.com/posts/farras-ghalyandra-644304387_scholarship-website-is-a-web-based-scholarship-activity-7384927241261989888-0hm5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "Hotel Booking App",
          desc: "Laravel-based hotel room booking website.",
          img: "projects/img-hotel.png",
          github: "https://github.com/farras2121/bnsp-hotel",
          linkedin: "https://www.linkedin.com/posts/farras-ghalyandra-644304387_hotel-website-is-a-web-based-hotel-booking-activity-7384563766392143872-Qmxf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "E-Library Website",
          desc: "Multi-role login library website.",
          img: "projects/img-perpus.png",
          github: "https://github.com/farras2121/library-management-rpl1",
          linkedin: "https://www.linkedin.com/posts/farras-ghalyandra-644304387_saya-mengembangkan-e-perpustakaan-sebuah-activity-7393616562814881792--8Zp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "Student Complaints Website",
          desc: "Laravel-based student complaint website.",
          img: "projects/img-pengaduansiswa.png",
          github: "https://github.com/farras2121/pengaduanSiswaRpl",
          linkedin: "https://www.linkedin.com/posts/farras-ghalyandra-644304387_saya-mengembangkan-website-pengaduan-siswa-activity-7393614970380365824-K4tR?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9DcpQBrXQKDbn1bGpsCaKH80KlGVPBcz4",
          type: "landscape"
        },
        {
          title: "App Vidio Clone",
          desc: "Clone the Vidio application using React.js.",
          img: "projects/img-vidio.png",
          github: "https://github.com/farras2121/App-Vidio",
          type: "portrait"
        },
        {
          title: "App Jaki Clone",
          desc: "Clone the Jaki application using React.js.",
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
                  Show Github
                </a>

                {project.linkedin && (
                  <a
                    href={project.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-transform hover:scale-105"
                >
                    Show LinkedIn
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
        <section id="sertifikat" className="w-full flex flex-col items-center justify-center py-24 fade-in">
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">My certificate</h2>

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
            ].map((cert, i) => (
              <div
                key={i}
                onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
                className="relative w-full aspect-[4/3] cursor-pointer [perspective:1000px]"
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    flippedIndex === i ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* Depan */}
                  <div className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg [backface-visibility:hidden]">
                    <Image
                      src={cert.front}
                      alt={`Sertifikat ${i + 1}`}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  {/* Belakang */}
                  <div className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <Image
                      src={cert.back}
                      alt={`Sertifikat ${i + 1} (belakang)`}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FOOTER ===== */} 
        <footer className="w-full text-gray-300 pt-16 relative"> 
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div> <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 px-6 text-center md:text-left"> <div className="md:w-1/2"> <h3 className="text-2xl font-semibold mb-2 text-white">
            Stay Connected</h3> 
            <p className="text-gray-400 mb-4">
  {"I'm always open to new opportunities, collaborations, or just chatting about technology."}
</p>
 </div> 
            <div className="flex flex-row items-center gap-4 mx-auto md:mx-0 mt-8 md:mt-0"> 
              {[ { href: "https://github.com/farras2121", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", alt: "GitHub" }, 
              { href: "https://www.linkedin.com/in/farras-ghalyandra-644304387/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg", alt: "LinkedIn" }, 
              { href: "mailto:ghalyandraf@gmail.com", img: "https://cdn-icons-png.flaticon.com/512/732/732200.png", alt: "Email" }, ].map((icon) => ( <a key={icon.alt} href={icon.href} target="_blank" rel="noopener noreferrer" className="group"> 
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 hover:bg-blue-600 transition-all duration-300 shadow-lg transform hover:scale-110"> <img src={icon.img} alt={icon.alt} className="w-6 h-6 transition-all duration-300 group-hover:filter group-hover:invert" /> </div> </a> ))} </div> </div> 
              <div className="mt-16 border-t border-gray-800 py-6 text-center w-full"> <p className="text-gray-500 text-sm"> © {new Date().getFullYear()}{" "} <span className="font-medium text-gray-300">Farras Ghalyandra</span>. All Rights Reserved. </p> </div> </footer> </main> </> ); }