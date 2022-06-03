import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import BuyModel from "../components/BuyModel";

const styles = {
	container: "h-full w-full flex bg-[#fff]",
};

export default function Home() {
	return (
		<div className={styles.container}>
			<Sidebar />
			<Main />
			<BuyModel />
		</div>
	);
}
