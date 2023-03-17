// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

type Data = {
    price: any;
};
import { abi } from "../../contracts/GameOnNFT.sol/GameOnNFT.json";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const price = await contract.PRICE();
    const priceInEth = await ethers.utils.formatEther(price);
    console.log("priceInEth: ", priceInEth);
    res.status(200).json({ price: priceInEth });
}
