import { Shirt } from "lucide-react";
import Link from "next/link";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const TopNavbar = () => {
	return (
		<nav className="border-b-2 py-2">
			<div className="container mx-auto flex items-center justify-between">
				<Link href="/">
					<Shirt />
				</Link>
				<ul className="flex justify-center gap-2 gap-x-6">
					<li>
						<ActiveLink className="font-semibold" href="/" exact activeClassName="underline">
							Home
						</ActiveLink>
					</li>
					<li>
						<ActiveLink className="font-semibold" href="/products" activeClassName="underline">
							All
						</ActiveLink>
					</li>
					<li>
						<ActiveLink className="font-semibold" href="/categories" activeClassName="underline">
							Categories
						</ActiveLink>
					</li>

					<li>
						<ActiveLink className="font-semibold" href="/collections" activeClassName="underline">
							Collections
						</ActiveLink>
					</li>
				</ul>
				<div></div>
			</div>
		</nav>
	);
};
