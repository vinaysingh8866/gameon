import React from "react";
import { Button, HStack, Text } from "native-base";
const Switch = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => {
  return (
    <HStack space="5">
      <Button
        onPress={() => onValueChange(true)}
        bg={value ? "primary.500" : "gray.500"}
      >
        <Text color="white">All</Text>
      </Button>
      <Button
        onPress={() => onValueChange(false)}
        bg={!value ? "primary.500" : "gray.500"}
      >
        <Text color="white">GameOn</Text>
      </Button>
    </HStack>
  );
};

export default Switch;
