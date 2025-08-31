import Link from 'next/link';
import Image from 'next/image';

// --- Skill Tag Component ---
// A reusable component for styling the skill tags to keep the main code cleaner.
const SkillTag = ({ skill }: { skill: string }) => (
  <div className="bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-medium px-4 py-2 rounded-full shadow-md transition-all hover:bg-slate-700 hover:scale-105 cursor-default">
    {skill}
  </div>
);

export default function AboutPage() {
  const skills = [
    'Modeling', 'Texturing', 'Lighting', 'Animation', 'Rendering',
    'Blender', 'Substance Painter', 'Unreal Engine',
    'C++', 'Python', 'Data Structures', 'Git'
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Add a subtle background gradient */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          
          {/* --- Header Section --- */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-500">
              About Me
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              A creative developer with a passion for building in 3D.
            </p>
          </div>

          {/* --- Bio Section with Image --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl shadow-lg">
            <div className="md:col-span-1 flex justify-center">
              {/* --- IMPORTANT: Add your profile picture here --- */}
              {/* 1. Add your photo to the /public folder (e.g., /public/profile.jpg) */}
              {/* 2. Update the src path below */}
              <Image
                src="/profile-placeholder.png" // Replace with your image path
                alt="A photo of Swathi P"
                width={200}
                height={200}
                className="rounded-full object-cover border-4 border-slate-700 shadow-xl"
              />
            </div>
            <div className="md:col-span-2 text-left space-y-4 text-slate-300">
              <p>
                I am Swathi P, a Computer Science and Engineering student at SRMIST, Chennai, with a dedicated focus on 3D art and animation. My technical background in C++ and data structures gives me a unique, problem-solving approach to the creative challenges of 3D modeling, texturing, and rendering.
              </p>
              <p>
                While I enjoy the logic of software development, my passion is in bringing ideas to life in three dimensions. I am actively honing my skills in industry-standard tools like Blender and Substance Painter to create immersive experiences and high-quality digital assets.
              </p>
            </div>
          </div>

          {/* --- Skills Section --- */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-slate-300 mb-8">Skills & Software</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map(skill => (
                <SkillTag key={skill} skill={skill} />
              ))}
            </div>
          </div>
          
          {/* --- Links Section --- */}
          <div className="mt-20 flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link 
              href="http://www.linkedin.com/in/swathi-p-404241329/" 
              target="_blank" 
              className="w-full sm:w-auto text-center rounded-full bg-blue-600 px-8 py-3 text-md font-semibold text-white shadow-lg hover:bg-blue-500 transition-all transform hover:scale-105"
            >
              View LinkedIn
            </Link>
            <a 
              href="/swathi-resume.pdf" 
              download 
              className="w-full sm:w-auto text-center rounded-full bg-slate-800/80 border border-slate-700 px-8 py-3 text-md font-semibold text-white shadow-lg hover:bg-slate-700 transition-all transform hover:scale-105"
            >
              Download Resume
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}

