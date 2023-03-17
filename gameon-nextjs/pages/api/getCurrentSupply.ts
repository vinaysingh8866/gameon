// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from "ethers";

type Data = {
    supply: any;
};
const settings = {
    apiKey: process.env.ALCHEMY_KEY as string,
    network: Network.MATIC_MUMBAI,
};
import { abi } from "../../contracts/GameOnNFT.sol/GameOnNFT.json";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const alchemy = new Alchemy(settings);

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const supply = await contract.totalSupply();
    console.log("priceInEth: ", supply);
    res.status(200).json({ supply: supply.toString() });
}
