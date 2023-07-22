import { Button, Container, Heading, Textarea, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractAddresses from "../utils/contractAddresses.json";
import ABI from "../abi/AGI.json";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [address, setAddress] = useState<string>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [chain, setChain] = useState<any>("");
  const [contract, setContract] = useState<any>();
  const [text, setText] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    connectWallet();
  }, []);

  const submitProposal = async () => {
    await contract?.createProposal(text).then((res: any) => {
      console.log(res);
      navigate("/view");
    }).catch((err: any) => {
      console.log(err);
    })
  };

  return (
    <Container w={"full"} h={"90vh"} justifyContent={"center"} centerContent>
      <VStack p={20} borderRadius={10} spacing={10}>
        <Heading>Create A Proposal</Heading>
        <Textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          colorScheme="green"
          justifySelf={"flex-end"}
          w={"full"}
          onClick={submitProposal}
        >
          Submit
        </Button>
      </VStack>
    </Container>
  );
};
