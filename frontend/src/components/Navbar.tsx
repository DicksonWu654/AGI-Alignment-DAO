import { Button, HStack, Text } from "@chakra-ui/react";
import { IDKitWidget } from "@worldcoin/idkit";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import contractAddresses from "../utils/contractAddresses.json";
import ABI from "../abi/AGI.json";

export const Navbar = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [hasWorldIDVerified, setHasWorldIDVerified] = useState<boolean>(false);
  const [chain, setChain] = useState<any>("");
  const [contract, setContract] = useState<any>();

  const onSuccess = (data: any) => {
    console.log(data);
    setHasWorldIDVerified(true);
    verifyHuman();
  };

  useEffect(() => {
    console.log(hasWorldIDVerified);
  }, [hasWorldIDVerified]);

  const handleVerify = (data: any) => {
    console.log(data);
  };

  const connectWallet = async () => {
    const newProvider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    setProvider(newProvider);
  };

  useEffect(() => {
    const initialize = async () => {
      await provider?.send("eth_requestAccounts", []).catch((err: any) => {
        console.log(err);
      });
      await provider?.getNetwork().then((network) => {
        const chainId: string = network.chainId.toString();
        const newChain = JSON.parse(JSON.stringify(contractAddresses.chainId))[
          chainId
        ];
        setChain(newChain);
      });
      const newSigner = provider?.getSigner();
      setSigner(newSigner);
    };
    if (provider) {
      initialize();
    }
  }, [provider]);

  useEffect(() => {
    const initialize = async () => {
      const newAddress = await signer?.getAddress();
      setAddress(newAddress);
    };
    if (signer) {
      initialize();
    }
  }, [signer]);

  useEffect(() => {
    if (chain) {
      setContract(new ethers.Contract(chain.address, ABI, signer));
    }
  }, [chain]);

  const verifyHuman = async () => {
    await contract.verifyHuman().then((res: any) => {
      console.log(res);
      navigate("/create")
    }).wait();
  };

  return (
    <HStack
      justifyContent={"space-between"}
      w={"100vw"}
      px={10}
      py={4}
      borderBottomWidth={"0.01rem"}
      borderBottomColor={"#505050"}
    >
      <HStack spacing={5}>
        <Text fontWeight={"bold"} mr={"20px"}>
          AGI Alignment DAO
        </Text>
        <Link to={"/"}>
          <Text>Home</Text>
        </Link>
        <Link to={"/create"}>
          <Text>Create</Text>
        </Link>
        <Link to={"/view"}>
          <Text>Proposals</Text>
        </Link>
      </HStack>
      <HStack gap={4}>
        <Button bg="transparent" onClick={onSuccess}>

        </Button>
        {address ? (
          <>
            {hasWorldIDVerified ? (
              <Text>{address}</Text>
            ) : (
              <IDKitWidget
                app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT" // obtained from the Developer Portal
                action="vote_1" // this is your action name from the Developer Portal
                onSuccess={onSuccess} // callback when the modal is closed
                handleVerify={handleVerify} // optional callback when the proof is received
                enableTelemetry // optional, defaults to false

              >
                {({ open }) => (
                  <Button variant={"unstyled"} onClick={open}>
                    Sign in with World ID
                  </Button>
                )}
              </IDKitWidget>
            )}
          </>
        ) : (
          <Button variant={"unstyled"} onClick={connectWallet} mr={4}>
            Connect Wallet
          </Button>
        )}

        <ColorModeSwitcher />
      </HStack>
    </HStack>
  );
};
