import React, { useContext } from "react";
import { AmazonContext } from "../context/AmazonContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Transaction from "../components/Transaction";

const styles = {
	container: `h-full w-full flex bg-[#fff]`,
	main: `w-full h-full flex flex-col mt-[50px]`,
	tableContainer: `w-full h-full flex flex-col p-[100px] pt-[50px] justify-center`,
	pageTitle: `text-2xl font-bold text-left mt-[50px] mb-[30px]`,
	transactions: `flex gap-[50px] flex-row flex-wrap`,
};

const History = () => {
	const { ownedAssets } = useContext(AmazonContext);
	return (
		<div className={styles.container}>
			<Sidebar />
			<div className={styles.main}>
				<Header />
				<div className={styles.tableContainer}>
					{/* {console.log(ownedAssets)} */}
					{ownedAssets ? (
						<div className={styles.pageTitle}>Purchase History</div>
					) : (
						<div className={styles.pageTitle}>
							No Purchase History
						</div>
					)}
					<div className={styles.transactions}>
						{ownedAssets &&
							ownedAssets.map((item, index) => {
								return <Transaction key={index} item={item} />;
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default History;
