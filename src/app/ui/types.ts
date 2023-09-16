export type ProductItemType = {
	id: string;
	category: string;
	title: string;
	price: number;
	description: string;
	rating: {
		rate: number;
		conut: number;
	};
	image: string;
	longDescription: string;
};
