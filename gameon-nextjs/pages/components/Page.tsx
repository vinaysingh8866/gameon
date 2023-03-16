import { VStack } from "native-base";
import NavBar from "./NavBar";

const Page = ({ children }: any) => {
  return (
    <VStack w="100vw" h="100vh" bg="amber.100">
      <NavBar />
      {children}
    </VStack>
  );
};

export default Page;
