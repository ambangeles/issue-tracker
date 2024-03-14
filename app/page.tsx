import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home({
	searchParams,
}: {
	searchParams: {
		page: string;
	};
}) {
	return <Pagination itemCount={10} pageSize={2} currentPage={parseInt(searchParams.page)} />;
}
