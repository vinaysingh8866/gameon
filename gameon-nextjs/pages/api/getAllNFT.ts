// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Network, Alchemy } from 'alchemy-sdk';

type Data = {
  nfts: any;
};
const settings = {
  apiKey: process.env.ALCHEMY_KEY as string,
  network: Network.MATIC_MUMBAI,
};
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const alchemy = new Alchemy(settings);

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const nfts = await alchemy.nft.getNftsForContract(contractAddress);
  console.log("nfts: ", nfts);
  res.status(200).json({ nfts: nfts });
}
