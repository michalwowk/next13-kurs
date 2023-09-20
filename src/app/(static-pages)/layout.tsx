export default function StaticLayout({ children }: { children: React.ReactNode }) {
	return <div className="container mx-auto max-w-md text-center">{children}</div>;
}
