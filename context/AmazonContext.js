import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { amazonAbi, amazonCoinAddress } from "../lib/constants";
import { ethers } from "ethers";

export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {
	const [username, setUsername] = useState("");
	const [nickname, setNickname] = useState("");
	const [assets, setAssets] = useState([]);
	const [currentAccount, setCurrentAccount] = useState("");
	const [tokenAmount, setTokenAmount] = useState("");
	const [amountDue, setAmountDue] = useState("");
	const [etherscanLink, setEtherscanLink] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [balance, setBalance] = useState("");
	const [isModelOpen, setIsModalOpen] = useState(false);
	const [recentTransactions, setRecentTransactions] = useState([]);
	const [ownedAssets, setOwnedAssets] = useState([]);

	const {
		authenticate,
		isAuthenticated,
		enableWeb3,
		Moralis,
		user,
		isWeb3Enabled,
	} = useMoralis();

	const {
		data: assetsData,
		error: assetsDataError,
		isLoading: assetsDataisLoading,
	} = useMoralisQuery("assets");

	const {
		data: userData,
		error: userDataError,
		isLoading: userDataisLoading,
	} = useMoralisQuery("_User");

	const getBalance = async () => {
		try {
			if (!isWeb3Enabled || !currentAccount) return;

			const options = {
				contractAddress: amazonCoinAddress,
				functionName: "balanceOf",
				abi: amazonAbi,
				params: {
					account: currentAccount,
				},
			};

			if (isWeb3Enabled) {
				const result = await Moralis.executeFunction(options);
				setBalance(result.toString());
			}
		} catch (error) {
			console.log(error);
		}
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const getAssets = async () => {
		try {
			await enableWeb3();
			setAssets(assetsData);
			console.log(assetsData);
		} catch (err) {
			console.log(err);
		}
	};

	const getOwnedAssets = async () => {
		try {
			if (userData[0].attributes.ownedAsset) {
				setOwnedAssets((prevItems) => [
					...prevItems,
					userData[0].attributes.ownedAsset,
				]);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleSetUsername = () => {
		if (user) {
			if (nickname) {
				user.set("nickname", nickname);
				user.save();
				setNickname("");
			} else {
				console.log("Can't set empty nickname");
			}
		} else {
			console.log("no user");
		}
	};

	const listenToUpdates = async () => {
		let query = new Moralis.Query("EthTransactions");
		let subscription = await query.subscribe();
		subscription.on("update", async (object) => {
			console.log("New Transaction");
			console.log(object);
			setRecentTransactions([object]);
		});
	};

	const buyAsset = async (price, asset) => {
		try {
			if (!isAuthenticated) {
				await authenticate();
			}

			const options = {
				type: "erc20",
				amount: price,
				receiver: amazonCoinAddress,
				contractAddress: amazonCoinAddress,
			};

			const transaction = await Moralis.transfer(options);
			const receipt = await transaction.wait();

			if (receipt) {
				const res = userData[0].add("ownedAsset", {
					...asset,
					purchaseDate: Date.now(),
					etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
				});

				await res.save().then(() => {
					alert("You've successfully purchased the asset!");
				});
			}
			// await getBalance();
		} catch (error) {
			console.log(error);
		}
	};
	const buyTokens = async () => {
		if (!isAuthenticated) {
			await authenticate();
		}

		const amount = ethers.BigNumber.from(tokenAmount);
		const price = ethers.BigNumber.from("100000000000000");
		const calPrice = amount.mul(price);

		const options = {
			contractAddress: amazonCoinAddress,
			functionName: "mint",
			abi: amazonAbi,
			msgValue: calPrice,
			params: {
				amount,
			},
		};

		const transaction = await Moralis.executeFunction(options);
		const receipt = await transaction.wait(4);
		setIsLoading(false);
		console.log(receipt);
		setEtherscanLink(
			`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
		);
		// await getBalance();
	};
	useEffect(() => {
		(async () => {
			if (!isWeb3Enabled) {
				await enableWeb3();
			}

			await listenToUpdates();

			if (isAuthenticated) {
				await getBalance();
				const currentUsername = user?.get("nickname");
				setUsername(currentUsername);
				const account = user?.get("ethAddress");
				setCurrentAccount(account);
			}
		})();
	}, [
		isWeb3Enabled,
		isAuthenticated,
		user,
		username,
		currentAccount,
		balance,
		setBalance,
		authenticate,
		setUsername,
		buyAsset,
		buyTokens,
	]);

	useEffect(() => {
		(async () => {
			if (isWeb3Enabled) {
				await getAssets();
				await getOwnedAssets();
			}
		})();
	}, [
		isWeb3Enabled,
		assetsData,
		assetsDataisLoading,
		userData,
		userDataisLoading,
		isAuthenticated,
	]);
	return (
		<AmazonContext.Provider
			value={{
				isAuthenticated,
				nickname,
				setNickname,
				username,
				handleSetUsername,
				assets,
				balance,
				setTokenAmount,
				tokenAmount,
				amountDue,
				setAmountDue,
				isLoading,
				setIsLoading,
				setEtherscanLink,
				etherscanLink,
				currentAccount,
				buyTokens,
				getBalance,
				isModelOpen,
				setIsModalOpen,
				openModal,
				buyAsset,
				recentTransactions,
				ownedAssets,
			}}
		>
			{children}
		</AmazonContext.Provider>
	);
};
