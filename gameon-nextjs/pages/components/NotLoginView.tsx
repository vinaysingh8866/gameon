
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
import { abi } from "../../contracts/GameOnNFT.sol/GameOnNFT.json";
import NftViewer from "../components/NFTViewer";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Heading, HStack, Stack, VStack } from "native-base"
import SwitchingImage from "./SwitchingImage";
import HeaderSubText from "./HeaderSubText";
const NotLoginView = () => {
  const [price, setPrice] = useState<string | null>(null);
  const [nfts, setNfts] = useState<any>([]);
  const [supply, setSupply] = useState<string | null>(null);
  const [maxSupply, setMaxSupply] = useState<string | null>(null);
  const [length, setLength] = useState<any[]>([]);
  useEffect(() => {
    async function init() {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc-mumbai.maticvigil.com"
      );
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const supply = await contract.MAX_TOKENS();
      const price = await contract.PRICE();
      const totalSupply = await contract.totalSupply();
      const priceInEth = ethers.utils.formatEther(price);
      setPrice(priceInEth);
      const res2 = await fetch("/api/getAllNFT");
      const data2 = await res2.json();
      setNfts(data2.nfts.nfts);
      setSupply(totalSupply.toString());
      setMaxSupply(supply.toString());

      const arr = new Array(Math.ceil(data2.nfts.nfts.length / 4)).fill(0);
      setLength(arr);
    }
    init();

    const interval = setInterval(() => {
      init();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <VStack w="80%" h="80%" m="auto" space="10" overflow={"scroll"}>
      <HStack p="5" justifyContent={"space-around"} rounded="2xl">
        <VStack mx="10" my="auto" space="4">
          <Heading color="white">GameOn</Heading>
          <HeaderSubText name="Price" value={price} />
          <HeaderSubText name="Current Supply" value={supply} />
          <HeaderSubText name="Total Supply" value={maxSupply} />
        </VStack>
        <VStack mx="10">
          <Stack justifyContent={"center"} justifyItems="center">
            <SwitchingImage />
          </Stack>
        </VStack>
      </HStack>
      <Stack mx="auto">
        <Heading color="white">Minted NFTs</Heading>
        <NftViewer nfts={nfts} length={length} />
      </Stack>
    </VStack>
  );
};

export default NotLoginView;