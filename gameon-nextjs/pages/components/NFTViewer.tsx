import { VStack, HStack, Stack, Image, Text } from "native-base";
const NftViewer = ({ nfts, length }: any) => {
  if (nfts.length === 0) {
    return (
      <VStack
        w="100%"
        h="70vh"
        mx="auto"
        space="20"
        overflowY={"scroll"}
        p="4"
        rounded={"2xl"}
      >
        <Text color="white">No NFTs found</Text>
      </VStack>
    );
  }
  return (
    <VStack
      w="100%"
      h="70vh"
      mx="auto"
      space="20"
      overflowY={"scroll"}
      p="4"
      rounded={"2xl"}
    >
      {length.map((_: any, index: any) => {
        return (
          <Stack key={index} w="100%" rounded="2xl">
            <HStack space="4">
              {nfts
                .slice(index * 4, index * 4 + 4)
                .map((nft: any, index: any) => {
                  return (
                    <VStack key={index} alignItems="center">
                      <Image
                        src={nft.media[0]?.raw}
                        w="48"
                        h="48"
                        rounded={"2xl"}
                      />
                      <Text color="white">{nft.title}</Text>
                    </VStack>
                  );
                })}
            </HStack>
          </Stack>
        );
      })}
    </VStack>
  );
};

export default NftViewer;
