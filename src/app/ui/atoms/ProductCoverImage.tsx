import NextImage from "next/image";

type ProductCoverImageProps = { src: string; alt: string };

export const ProductCoverImage = ({ src, alt }: ProductCoverImageProps) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md">
			<NextImage
				width={320}
				height={320}
				src={src}
				alt={alt}
				className="h-full w-full bg-slate-200 object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
