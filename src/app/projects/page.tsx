import { projects } from '@/data/projects';
import Image from 'next/image';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // Find the project data that matches the slug from the URL
  const project = projects.find((p) => p.slug === params.slug);

  // If no project is found, you can show a not found message
  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center">{project.title}</h1>
        <p className="mt-4 text-center text-lg text-gray-400">{project.description}</p>

        <div className="mt-12">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1200}
            height={800}
            className="rounded-lg shadow-xl"
          />
        </div>

        {/* You can add more project details here */}
        <div className="mt-12 prose prose-invert prose-lg max-w-none">
          <h2>About The Project</h2>
          <p>
            This is where you can write a detailed description of the project. Talk about the goal, your process, the challenges you faced, and what you learned.
          </p>

          <h2>Tools Used</h2>
          <ul>
            <li>Blender</li>
            <li>Substance Painter</li>
            <li>Unreal Engine</li>
          </ul>

          {/* You could add more images or even a video embed here */}
        </div>
      </div>
    </main>
  );
}