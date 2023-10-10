"use client";

import { useEffect, useId, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/ui/atoms/Input";
import { useDebounce } from "@/hooks/useDebounce";

export const Search = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const searchId = useId();
	const query = searchParams.get("query");

	const [searchValue, setSearchValue] = useState(query || "");
	const debouncedValue = useDebounce(searchValue);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && e.currentTarget.value.length > 0) {
			router.push(`/search?query=${e.currentTarget.value}`);
		}
	};

	useEffect(() => {
		if (!debouncedValue) return;
		router.push(`/search?query=${debouncedValue}`);
	}, [debouncedValue, router]);

	return (
		<form>
			<label htmlFor={searchId}>Search</label>
			<Input
				id={searchId}
				type="search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</form>
	);
};
