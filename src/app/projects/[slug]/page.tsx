import { planets } from '@/components/solarsys';
import Link from 'next/link';
import Image from 'next/image';

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

