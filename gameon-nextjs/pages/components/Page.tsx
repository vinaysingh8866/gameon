import { VStack } from "native-base";
import colors from "../../colors";
import NavBar from "./NavBar";

const Page = ({ children }: any) => {
  return (
    <VStack w="100vw" h="100vh" bg={colors.tertiary}>
      <NavBar />
      {children}
    </VStack>
  );
};

export default Page;
