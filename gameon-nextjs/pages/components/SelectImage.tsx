import { Button, HStack, Image, VStack } from "native-base";
import { useState } from "react";

const SelectImage = ({ setJsonUrl }: any) => {
  const images = [
    "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-HWQU5r8wdN4bvCDZVCYzG7S1.png",
    "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-JVPC3n3yRGUZpsDGkJs4YoE9.png",
    "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-JY4mPeN17swcaDmFsy25YyoK.png",
    "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-NbRzd3xVafJ8brgV1kVX6382.png",
    "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-WC8zezWRIVDZ0CUryYaffwLD.png",
  ];
  const jsons = [
    "https://gateway.pinata.cloud/ipfs/QmQf3ehC9DUmG5a9eFrVruhqDM57SkseKRzGspAS94T4yb/1.json",
    "https://gateway.pinata.cloud/ipfs/QmQf3ehC9DUmG5a9eFrVruhqDM57SkseKRzGspAS94T4yb/2.json",
    "https://gateway.pinata.cloud/ipfs/QmQf3ehC9DUmG5a9eFrVruhqDM57SkseKRzGspAS94T4yb/3.json",
    "https://gateway.pinata.cloud/ipfs/QmQf3ehC9DUmG5a9eFrVruhqDM57SkseKRzGspAS94T4yb/4.json",
    "https://gateway.pinata.cloud/ipfs/QmQf3ehC9DUmG5a9eFrVruhqDM57SkseKRzGspAS94T4yb/5.json",
  ];
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState(images[index]);
  return (
    <VStack mx="auto">
      <HStack
        space="1"
        w="60%"
        bg="#B5D3E8"
        rounded="2xl"
        justifyContent={"space-evenly"}
        mx="auto"
        my="auto"
      >
        {images.map((image, index) => (
          <Button
            w="24"
            h="24"
            p="0"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _pressed={{ bg: "transparent" }}
            onPress={() => {
              setJsonUrl(jsons[index]);
              setImage(image);
            }}
          >
            <Image key={index} src={image} w="20" h="20" rounded={"xl"} />
          </Button>
        ))}
      </HStack>
      <Image src={image} w="64" h="64" rounded={"xl"} m="auto" />
    </VStack>
  );
};

export default SelectImage;
