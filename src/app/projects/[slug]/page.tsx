import SolarSystem from '../../components/solarsys';
import Link from 'next/link';
import Image from 'next/image';

type PlanetData = {
  label: string;
  path: string;
  description: string;
  textureFile: string;
  size: number;
  material: { metalness: number; roughness: number };
  angle: number;
  speed: number;
  radius: number;
};

const planets: PlanetData[] = [
  { label: "ABOUT ME", path: "/about", description: "Learn more about my journey, skills, and passion for creative technology.", textureFile: "/textures/mercury.jpg", size: 1.5, material: { metalness: 0.2, roughness: 0.8 }, angle: 0, speed: 0.25, radius: 9 },
  { label: "PROJECTS", path: "/projects", description: "A curated gallery of my 3D models, animations, and interactive projects.", textureFile: "/textures/venus.jpg", size: 1.8, material: { metalness: 0.1, roughness: 0.5 }, angle: Math.PI / 3, speed: 0.20, radius: 12.5 },
  { label: "CONTACT", path: "/contact", description: "Let's connect! Find my contact details and social media links here.", textureFile: "/textures/earth_day.jpeg", size: 1.2, material: { metalness: 0.3, roughness: 0.4 }, angle: Math.PI / 2, speed: 0.17, radius: 16 },
  { label: "GALLERY", path: "/gallery", description: "A collection of my artistic explorations and visual experiments.", textureFile: "/textures/mars.webp", size: 1.4, material: { metalness: 0.2, roughness: 0.5 }, angle: Math.PI / 4, speed: 0.14, radius: 19.5 },
  { label: "EXPERIENCE", path: "/experience", description: "Details about my professional experience and technical background.", textureFile: "/textures/jupiter1.jpeg", size: 1.3, material: { metalness: 0.9, roughness: 0.2 }, angle: Math.PI, speed: 0.12, radius: 23 },
  { label: "BLOG", path: "/blog", description: "Thoughts on 3D, technology, and the creative process.", textureFile: "/textures/saturn1.jpg", size: 1.3, material: { metalness: 0.1, roughness: 0.6 }, angle: (3 * Math.PI) / 2, speed: 0.10, radius: 26.5 },
];

// This function tells Next.js which project pages to create
export async function generateStaticParams() {
  return planets.map((planet) => ({
    slug: planet.label.toLowerCase().replace(/ /g, '-'),
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = planets.find(p => p.label.toLowerCase().replace(/ /g, '-') === params.slug);

  if (!project) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Project Not Found</h1>
        <Link href="/" className="mt-4 text-blue-400 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen p-8">
      <div className="mb-12">
        <SolarSystem />
      </div>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors mb-8 inline-block">
          &larr; Back to Solar System
        </Link>

        <h1 className="text-5xl font-extrabold mb-4">{project.label}</h1>
        <p className="text-lg text-slate-300 mb-8">{project.description}</p>
        
        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
            <Image 
                src={project.textureFile} 
                alt={`Image of ${project.label}`}
                layout="fill"
                objectFit="cover"
            />
        </div>

        <div className="mt-12 prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl">About This Project</h2>
            <p>
                This is where you can add a more detailed description of your project. Talk about the software you used, the techniques you employed, and what you learned during the creation process.
            </p>
            <p>
                For example, you could discuss your modeling workflow in Blender, your texturing process in Substance Painter, or how you set up the final render.
            </p>
        </div>
      </div>
    </main>
  );
}

