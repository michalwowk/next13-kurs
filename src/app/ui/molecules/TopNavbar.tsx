import { Shirt } from "lucide-react";
import Link from "next/link";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Search } from "@/ui/molecules/Search";
import { TopNavCart } from "@/ui/molecules/TopNavCart";

export const TopNavbar = () => {
	return (
		<div className="container mx-auto flex items-center justify-between border-b-2 py-2">
			<Link href="/">
				<Shirt />
			</Link>
			<nav>
				<ul className="flex items-center justify-center gap-2 gap-x-6">
					<li>
						<ActiveLink
							className="font-semibold"
							href="/"
							exact
							activeClassName="border-b-2 border-b-slate-600"
						>
							Home
						</ActiveLink>
					</li>
					<li>
						<ActiveLink
							className="font-semibold"
							href="/products"
							activeClassName="border-b-2 border-b-slate-600"
						>
							All
						</ActiveLink>
					</li>
					<li>
						<ActiveLink
							className="font-semibold"
							href="/categories"
							activeClassName="border-b-2 border-b-slate-600"
						>
							Categories
						</ActiveLink>
					</li>

					<li>
						<ActiveLink
							className="font-semibold"
							href="/collections"
							activeClassName="border-b-2 border-b-slate-600"
						>
							Collections
						</ActiveLink>
					</li>
				</ul>
			</nav>

			<div className="flex items-center">
				<Search />
				<TopNavCart />
			</div>
		</div>
	);
};
