// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Network, Alchemy } from 'alchemy-sdk';

type Data = {
  nfts: any;
};
const settings = {
  apiKey: "d8VdYbXoAYnZ2KBTKV0woib4ckw3aJx5",
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const body = req.body;
  console.log("body: ", body);
  const address = body.address;
  console.log("address: ", address);
  const nfts = await alchemy.nft.getNftsForOwner(address);
  console.log("nfts: ", nfts);
  res.status(200).json({ nfts: nfts });
}
