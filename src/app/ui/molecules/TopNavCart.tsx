import { ShoppingCart } from "lucide-react";

import Link from "next/link";
import { getCartFromCookies } from "@/api/cart";

export const TopNavCart = async () => {
	const cart = await getCartFromCookies();

	const quantity = cart?.orderItems.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

	return (
		<Link className="relative flex" href="/cart" data-testid="cart-icon">
			<ShoppingCart width={30} height={30} />{" "}
			<span className="opacity-85 absolute left-5 top-5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-slate-100">
				{quantity}
			</span>
		</Link>
	);
};
