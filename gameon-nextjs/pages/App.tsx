import { Button, HStack, Text, VStack, ZStack } from "native-base";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Page from "./components/Page";
import RPC from "./api/ethersRPC";
import SelectImage from "./components/SelectImage";
import Header from "./components/Header";
import colors from "../colors";
import NotLoginView from "./components/NotLoginView";

function App() {
  const { provider, web3auth } = useAuth();
  const [jsonUrl, setJsonUrl] = useState<string | null>(null);
  const [txId, setTxId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  useEffect(() => {}, []);

  useEffect(() => {
    //get balance
    const init = async () => {
      const rpc = new RPC(provider);
      const balance = await rpc.getBalance();
      // convert to ETH and set balance
      setBalance(balance);
    }
  }, [web3auth, provider, jsonUrl, txId, loading]);

  const mintNFT = async () => {
    setLoading(true);
    const rpc = new RPC(provider);
    const mint = await rpc.mintNFT(jsonUrl);
    console.log(mint);
    if (!mint.transactionHash) {
      setLoading(false);
      try {
        setError(
          mint.data.message.split("reason=")[1].split(",")[0].replace(/"/g, "")
        );
      } catch {
        mint;
      }
      return;
    } else {
      setTxId(mint);
    }
    setTxId(mint.transactionHash);
    setLoading(false);
  };
  const loggedInView = (
    <VStack w="100%" h="90%">
      <HStack w="85%" h="56" mx="auto" mt="2" justifyContent={"center"}>
        <Header provider={provider} />
      </HStack>
      <ZStack w="85%" h="70%" mx="auto" mt="3">
        <HStack
          w="100%"
          h="100%"
          bg={colors.secondary}
          rounded="2xl"
          justifyContent={"center"}
          justifyItems="center"
        >
          <SelectImage setJsonUrl={setJsonUrl} />
          <VStack h="24" my="auto" space="4">
            {(Number(balance) <= 0.1) ? (
              <Text color="white">You need at least 0.1 MATIC to mint NFT</Text>
            ) : <Text color="white">Your balance:{balance}</Text>}
            <Button
              onPress={mintNFT}
              mx="auto"
              bg={colors.primary}
              h="20"
              w="40"
              my="auto"
              isLoading={loading}
              disabled={loading || Number(balance) <= 0.1}
            >
              <Text color="white" px="2">
                Mint NFT 0.1 MATIC
              </Text>
            </Button>
            {txId && <Text color="white">Your tx id:{txId}</Text>}
            {error && (
              <Text w="56" h="20" color="red.500">
                Error:{error}
              </Text>
            )}
          </VStack>
        </HStack>
      </ZStack>
    </VStack>
  );

  return <Page>{provider ? loggedInView : <NotLoginView />}</Page>;
}

export default App;
