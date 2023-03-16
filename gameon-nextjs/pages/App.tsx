import { Button, Stack, Text, VStack, ZStack } from "native-base";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Page from "./components/Page";

function App() {
  const { provider, web3auth } = useAuth();

  useEffect(() => {}, []);

  useEffect(() => {}, [web3auth, provider]);

  const loggedInView = (
    <VStack w="100%" h="100%">
      <ZStack w="80%" h="80%" m="auto">
        <Stack w="100%" h="100%" bg="gray.300" rounded="2xl">
          <Button >
            <Text>Total Supply</Text>
          </Button>
        </Stack>
      </ZStack>
    </VStack>
  );

  const unloggedInView = <button className="card">Set Login State</button>;

  return <Page>{provider ? loggedInView : unloggedInView}</Page>;
}

export default App;
