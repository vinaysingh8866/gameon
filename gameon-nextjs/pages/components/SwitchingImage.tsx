import { Image } from "native-base";
import { useEffect, useState } from "react";

const SwitchingImage = () => {
    const images = [
      "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-HWQU5r8wdN4bvCDZVCYzG7S1.png",
      "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-JVPC3n3yRGUZpsDGkJs4YoE9.png",
      "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-JY4mPeN17swcaDmFsy25YyoK.png",
      "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-NbRzd3xVafJ8brgV1kVX6382.png",
      "https://gateway.pinata.cloud/ipfs/QmVrJMFqcgtmnHMn5GMnPTjvYdU7RDogGPB7KMnBaJF9SW/img-WC8zezWRIVDZ0CUryYaffwLD.png",
    ];
    const [index, setIndex] = useState(0);
    const [image, setImage] = useState(images[index]);
    useEffect(() => {
      const timer = setInterval(() => {
        if (index === images.length - 1) setIndex(0);
        else setIndex(index + 1);
        setImage(images[index]);
      }, 1000);
      return () => clearInterval(timer);
    }, [index]);
    return <Image src={image} w="48" h="48" rounded={"xl"} />;
  };

  export default SwitchingImage;