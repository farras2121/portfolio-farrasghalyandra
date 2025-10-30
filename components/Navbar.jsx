export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-gray-800 text-white fixed w-full top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-400">Portfolio</h1>
      <ul className="flex gap-6">
        <li><a href="#home" className="hover:text-blue-400">Home</a></li>
        <li><a href="#about" className="hover:text-blue-400">About</a></li>
        <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
        <li><a href="#sertifikat" className="hover:text-blue-400">Sertifikat</a></li>
      </ul>
    </nav>
  );
}
