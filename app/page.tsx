import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
	return <Pagination itemCount={11} pageSize={12} currentPage={1}/>;
}
