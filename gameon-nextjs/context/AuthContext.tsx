import { CHAIN_NAMESPACES } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [web3auth, setWeb3auth] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com",
          },
          web3AuthNetwork: "cyan",
        });
        const walletConnectV1Adapter = new WalletConnectV1Adapter({
          adapterSettings: {
            bridge: "https://bridge.walletconnect.org",
          },
          clientId,
        });

        web3auth.configureAdapter(walletConnectV1Adapter);

        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600,
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth",
          },
        });

        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.matic.network",
          },
          web3AuthNetwork: "cyan",
        });

        web3auth.configureAdapter(metamaskAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        provider,
        web3auth,
        setProvider,
        setWeb3auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
