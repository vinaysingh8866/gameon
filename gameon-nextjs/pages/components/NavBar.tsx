import { Button, HStack, Text } from "native-base";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import colors from "../../colors";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const router = useRouter();
  const { provider, web3auth, setProvider } = useAuth();
  useEffect(() => {}, []);
  useEffect(() => {}, [provider, web3auth]);

  return (
    <HStack w="100%" bg={colors.primary} h="16" justifyContent={"space-around"}>
      <NavBarButton
        onPress={() => {
          router.push("/");
        }}
        text="GameOnNFT"
      />
      {provider ? (
        <HStack>
          <NavBarButton
            onPress={async () => {
              if (!web3auth) {
                return;
              }
              await web3auth.logout();
              setProvider(null);
              router.push("/");
            }}
            text="Logout"
          />
          <NavBarButton
            onPress={() => {
              router.push("/nft");
            }}
            text="My NFTs"
          />
        </HStack>
      ) : (
        <NavBarButton
          onPress={async () => {
            if (!web3auth) {
              return;
            }
            const web3authProvider = await web3auth.connect();
            setProvider(web3authProvider);
          }}
          text="Login"
        />
      )}
    </HStack>
  );
};

const NavBarButton = ({
  onPress,
  text,
}: {
  onPress: () => void;
  text: string;
}) => {
  return (
    <Button
      onPress={onPress}
      bg="transparent"
      _hover={{
        bg: "transparent",
      }}
    >
      <Text color="white">{text}</Text>
    </Button>
  );
};

export default NavBar;
