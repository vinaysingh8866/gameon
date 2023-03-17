import { HStack, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import colors from "../../colors";
import RPC from "../api/ethersRPC";
import SwitchingImage from "./SwitchingImage";
const Header = ({ provider }: any) => {
  const [currentSupply, setCurrentSupply] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  useEffect(() => {
    const init = async () => {
      try {
        const rpc = new RPC(provider);
        const supply = await rpc.getTotalSupply();
        const address = await rpc.getAccounts();
        setAddress(address);
        const price = await rpc.getPrice();
        setPrice(price.toString());
        setCurrentSupply(supply.toString());
      } catch (error) {
        console.error(error);
      }
    };
    init();
    const interval = setInterval(() => {
      init();
    }
    , 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <HStack
      space="5"
      h="56"
      w="100%"
      bg={colors.secondary}
      rounded="2xl"
      justifyContent={"space-around"}
    >
      <VStack>
        <HStack space="5" h="30" my="auto" w="100%">
          <Text my="auto" fontSize={"30"} w="48" color="white">
            Curr. Supply
          </Text>
          <Text my="auto" fontSize={"30"} w="48" color="white">
            : {currentSupply}
          </Text>
        </HStack>
        <HStack space="5" h="30" my="auto" w="100%">
          <Text my="auto" fontSize={"30"} w="48" color="white">
            Price
          </Text>
          <Text my="auto" fontSize={"30"} w="48" color="white">
            : {price ? price : "No Price"}
          </Text>
        </HStack>
        <HStack space="5" h="30" my="auto" w="100%">
          <Text my="auto" fontSize={"30"} w="48" color="white">
            Address
          </Text>
          <Text my="auto" fontSize={"30"} color="white">
            :{address ? address : "No Address"}
          </Text>
        </HStack>
      </VStack>

      <HStack space="5" my="auto">
        <SwitchingImage />
      </HStack>
    </HStack>
  );
};

export default Header;
