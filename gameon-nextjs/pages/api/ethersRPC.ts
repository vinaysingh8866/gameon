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

  async mintNFT(url: any): Promise<any> {
    try {
      const address = await this.getAccounts();
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.safeMint(address, url, {
        value: ethers.utils.parseEther("0.1")
      });
      console.log("tx: ", tx);
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      return error;
    }
  }

  async getPrice(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const price = await contract.PRICE();
      const priceInEth = await this.convertToEthFromWei(price);
      return priceInEth;
    } catch (error) {
      return error;
    }
  }

  async convertToEthFromWei(wei: BigNumberish): Promise<any> {
    try {
      const eth = ethers.utils.formatEther(wei);
      return eth;
    }
    catch (error) {
      return error;
    }
  }



  async getAccounts(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      const balance = ethers.utils.formatEther(
        await ethersProvider.getBalance(address)
      );
      return balance;
    } catch (error) {
      return error as string;
    }
  }


  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }
}
