// This is a temporary page to debug texture loading.
import Image from 'next/image';

const textures = [
  "/textures/mars.webp",
  "/textures/earth_day.jpeg",
  "/textures/neptune.jpg",
  "/textures/venus.jpg",
  "/textures/someplanet.jpg",
  "/textures/mercury.jpg",
];

export default function TextureDebugPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Texture Loading Debug Page</h1>
      <p className="mb-8">If you see broken image icons below, it confirms the image files are not in the correct `/public/textures/` folder or the filenames do not match exactly.</p>
      <div className="grid grid-cols-3 gap-4">
        {textures.map(src => (
          <div key={src} className="border border-gray-600 p-2 rounded-lg">
            <p className="font-mono text-sm mb-2">{src}</p>
            {/* Using a standard <img> tag for the most basic test */}
            <img src={src} alt={`Test load for ${src}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

