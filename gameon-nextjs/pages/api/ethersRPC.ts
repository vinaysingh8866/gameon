import type { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";
import { abi } from "../../contracts/GameOnNFT.sol/GameOnNFT.json";
import { BigNumberish } from "ethers";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
export default class EthereumRpc {

  private provider: SafeEventEmitterProvider;
  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  async getTotalSupply(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const totalSupply = await contract.totalSupply();
      return totalSupply;
    } catch (error) {
      return error;
    }
  }

}
