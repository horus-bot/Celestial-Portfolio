import Image from 'next/image'
import Link from 'next/link';
type ProjectCardProps = {
    slug: string;
    imageUrl: string;
    title: string;
    description: string;
};

export default function ProjectCard(props: ProjectCardProps) {
    return (
        // 👇 3. Wrap the card in a Link component
        <Link href={`/projects/${props.slug}`} className="block border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div>
                <Image
                    src={props.imageUrl}
                    alt={props.title}
                    width={600}
                    height={400}
                    className="rounded-t-lg object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold mt-2">{props.title}</h3>
                    <p className="text-gray-400 mt-1">{props.description}</p>
                </div>
            </div>
        </Link>
    );
}
