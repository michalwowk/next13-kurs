import { ImageResponse } from "next/server";
import { getSingleProductById } from "@/api/product";

export const runtime = "edge";

export const alt = "next13 masters sklep";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function og({ params }: { params: { productId: string } }) {
	const { product } = await getSingleProductById(params.productId);

	return new ImageResponse(
		(
			<div
				tw="w-full text-white h-full flex flex-col items-center text-center justify-center text-8xl p-4"
				style={{
					background: `
				    linear-gradient(
				      90deg,
				      rgb(6,172,214) 0%,
				      rgb(0,0,0) 20%,
				      rgb(0,0,0) 80%,
				      rgb(6,71,255) 100%
				    )`,
				}}
			>
				{product?.images[0] && (
					<img height={100} width={100} alt={product?.name} src={product?.images[0].url} />
				)}
				<h1 tw="font-sans uppercase my-3 p-0 text-[50px] leading-4">{product?.name}</h1>
				<p tw="m-0 mt-2 text-sm">{product?.price}</p>
				<p tw="m-0 mt-2 text-sm">{product?.description}</p>
			</div>
		),
	);
}
