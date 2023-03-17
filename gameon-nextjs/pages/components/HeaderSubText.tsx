import { HStack, Text } from "native-base";
import React from "react";
const HeaderSubText = ({ name, value }: any) => {
  return (
    <HStack justifyContent={"space-between"}>
      <Text w="32" color="white">
        {name}:
      </Text>
      <Text color="white">{value}</Text>
    </HStack>
  );
};

export default HeaderSubText;
