import React, { useEffect, useState } from "react";
import { Button, HStack, Text, VStack } from "native-base";
import EthereumRpc from "./api/ethersRPC";
import Page from "./components/Page";
import { useAuth } from "../context/AuthContext";
import NftViewer from "./components/NFTViewer";
import Switch from "./components/Switch";

const NFT = () => {
  const { web3auth, provider } = useAuth();
  const [address, setAddress] = useState<string | null>(null);
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [allNfts, setAllNfts] = useState(true);
  const [nftData, setNftData] = useState<any[]>([]);
  const [length, setLength] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const rpc = new EthereumRpc(web3auth.provider);
        const address = await rpc.getAccounts();
        console.log("address", address);
        setAddress(address);
        const res = await fetch("/api/getNFTOwned", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address }),
        });
        const nfts = await res.json();
        setNfts(nfts.nfts.ownedNfts);
        setNftData(nfts.nfts.ownedNfts);
        console.log("nfts", nfts.nfts.ownedNfts);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    init();
  }, [web3auth, provider]);

  useEffect(() => {
    const arr = new Array(Math.ceil(nfts.length / 4)).fill(0);
    setLength(arr);
  }, [nfts]);

  useEffect(() => {
    if (allNfts) {
      setNfts(nftData);
    } else {
      const data = nftData.filter((nft) => {
        console.log(
          "nft",
          nft.contract.address,
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
        );
        return (
          String(nft.contract.address).toLowerCase() ===
          String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS).toLowerCase()
        );
      });
      console.log("data", data);
      setNfts(data);
    }
  }, [allNfts]);

  return (
    <Page>
      <VStack mx="auto" space="4" my="10">
        {nfts.length > 0 ? (
          <>
            <Switch value={allNfts} onValueChange={setAllNfts} />
            <NftViewer nfts={nfts} length={length} />
          </>
        ) : (
          <Text>{loading ? "Loading" : "No NFTs Found"}</Text>
        )}
      </VStack>
    </Page>
  );
};

export default NFT;
