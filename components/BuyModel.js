import React, { useEffect, useContext } from "react";
import { IoIosClose } from "react-icons/io";
import { AmazonContext } from "../context/AmazonContext";
import { HashLoader } from "react-spinners";
import Link from "next/link";

const styles = {
	modal: "w-screen h-screen z-10 bg-gray-900/90 fixed top-0 left-0 flex items-center justify-center",
	container: " w-max w-2/5 flex flex-col bg-white p-4",
	closeX: "w-full h-[50px] flex items-center justify-end mb-[20px]",
	title: "text-3xl font-bold flex flex-1 items-center mt-[10px] justify-center mb-[40px]",
	content: "flex w-full mb-[30px] text-xl justify-center",
	input: "w-[50%] h-[50px] bg-[#f7f6f2] rouned-lg p-[10px] flex mx-auto",
	inputBox:
		"w-full h-full flex items-center justify-center bg-[#f7f6f2] focus:outline-none",
	price: "w-full h-full flex justify-center items-center mt-[20px] font-bold text-3xl",
	buyBtn: `w-[20%] h-[50px] bg-[#000] mt-[40px] rounded-lg p-[10px] flex mx-auto text-white justify-center items-center cursor-pointer hover:bg-[rgba(147,197,253,1)]`,
	loaderContainer: `w-full h-[500px] flex items-center justify-center`,
	loader: `w-full h-full flex items-center justify-center`,
	etherscan: `w-full h-full flex items-center justify-center text-green-500 text-2xl mt-[20px] mb-[10px] font-bold cursor-pointer`,
	success: `w-full h-full flex items-center justify-center text-center text-xl mt-[20px] font-bolder`,
};

const BuyModel = () => {
	const {
		tokenAmount,
		setTokenAmount,
		amountDue,
		setAmountDue,
		isLoading,
		setIsLoading,
		setEtherscanLink,
		etherscanLink,
		buyTokens,
		isModelOpen,
		setIsModalOpen,
	} = useContext(AmazonContext);

	const calculatePrice = () => {
		const price = parseFloat(tokenAmount * 0.0001);
		price = price.toFixed(4);
		setAmountDue(price);
	};
	useEffect(() => {
		calculatePrice();
	}, [tokenAmount, calculatePrice]);

	if (isModelOpen) {
		return (
			<div className={styles.modal}>
				<div className={styles.container}>
					{isLoading ? (
						<>
							<div className={styles.loaderContainer}>
								<HashLoader size={80} />
							</div>
						</>
					) : (
						<>
							<div className={styles.closeX}>
								<IoIosClose
									onClick={() => {
										setIsModalOpen(false);
										setAmountDue("");
										setTokenAmount("");
										setEtherscanLink("");
									}}
									fontSize={50}
									className="cursor-pointer hover:text-blue-300"
								/>
							</div>
							<div className={styles.title}>
								Buy More Amazon Coins Here!
							</div>
							<div className={styles.content}>
								Select how many tokens would you like to buy
							</div>
							<div className={styles.input}>
								<input
									type={"text"}
									placeholder="Amount.."
									className={styles.inputBox}
									onChange={(e) =>
										setTokenAmount(e.target.value)
									}
									value={tokenAmount}
								/>
							</div>
							<div className={styles.price}>
								Total Due:{" "}
								{tokenAmount && tokenAmount > 0
									? amountDue + "ETH"
									: "0 ETH"}
							</div>
							<button
								className={styles.buyBtn}
								disabled={!tokenAmount || tokenAmount < 0}
								onClick={() => {
									setIsLoading(true);
									buyTokens();
								}}
							>
								Buy
							</button>
							{etherscanLink && (
								<>
									<div className={styles.success}>
										Transaction Successful! Check out your
										receipt for your transaction
									</div>
									<Link
										href={`${etherscanLink}`}
										className={styles.etherscan}
									>
										<a
											className={styles.etherscan}
											target="_blank"
										>
											Transaction Receipt
										</a>
									</Link>
								</>
							)}
						</>
					)}
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

export default BuyModel;
