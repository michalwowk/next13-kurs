export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const getTotalNumberOfPages = (
	totalAmountOfProducts: number,
	PRODUCTS_PER_PAGE: number,
): number => {
	return Math.ceil(totalAmountOfProducts / PRODUCTS_PER_PAGE);
};
