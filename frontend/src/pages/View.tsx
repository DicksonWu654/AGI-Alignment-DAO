import {
  Box,
  Button,
  Container,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractAddresses from "../utils/contractAddresses.json";
import ABI from "../abi/AGI.json";
import { useNavigate } from "react-router-dom";

export const View = () => {
  const [address, setAddress] = useState<string>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [chain, setChain] = useState<any>("");
  const [contract, setContract] = useState<any>();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [constitution, setConstitution] = useState<any>([]);

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

  useEffect(() => {
    if (contract) {
      callConstitution();
    };
  }, [contract]);

  const callConstitution = async () => {
    await contract.callConstitution().then((res: any) => {
      setConstitution(res);
      console.log(res)
    })
  }

  const proposals = new Array(20).fill({
    text: "This is some sample text",
    passed: true,
    votesFor: 200,
    votesAgainst: 100,
  });

  const [pIndex, setPIndex] = useState(0);

  // console.group(proposals);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fromBigtoNormal = (bigNumber: any) => {
    try {
      return ethers.utils.formatUnits(ethers.utils.parseEther(bigNumber.toString())); 
    }
    catch (e) {
      console.log(e)
      return null;
    }
  }

  useEffect(() => {
    console.log(constitution);
    console.log(constitution[0]);
    try {
      console.log(constitution[0].text)
    }
    catch (e) {
      console.log(e)
    }
  }, [constitution]);

  const voteFor = async () => {
    await contract.vote(pIndex, true).then((res: any) => {
      console.log(res);
    })
  }

  const voteAgainst = async () => {
    await contract.vote(pIndex, false).then((res: any) => {
      console.log(res);
    })
  }

  return (
    <VStack overflowY={'scroll'} overflowX={"hidden"} padding={10}>
      <Modal size="lg" isOpen={isOpen} isCentered={true} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent mx={4} p={10}>
          <ModalCloseButton />
          <ModalHeader>Proposal</ModalHeader>
          <ModalBody>
            <VStack
                alignItems={'flex-start'}
                mb={7}
            >
                <Text><b>Description: </b>{constitution[pIndex]?.text}</Text>
                <Text><b>Passed? </b>{constitution[pIndex]?.passed}</Text>
            </VStack>
            <HStack>
              <Button colorScheme={"green"} py={20} px={10} w={'50%'} onClick={voteFor}>
                Yes <br/> ({fromBigtoNormal(constitution[pIndex]?.votesFor)} votes) 
              </Button>
              <Button colorScheme={"red"} py={20} px={10} w={'50%'} onClick={voteAgainst}>
                No <br/> ({fromBigtoNormal(constitution[pIndex]?.votesAgainst)} votes) 
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <TableContainer w={"full"}>
        <Table
          variant="unstyled"
          style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
        >
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Passed</Th>
              <Th isNumeric>Votes For</Th>
              <Th isNumeric>Votes Against</Th>
              <Th>Open</Th>
            </Tr>
          </Thead>
          <Tbody gap={4}>
            {constitution.map((proposal:any, index:number) => (
              <Tr key={index}>
                <Td style={{maxWidth:"20vw", overflowX:"scroll"}}>{proposal.text}</Td>
                <Td>{(proposal.passed).toString()}</Td>
                <Td>{fromBigtoNormal(proposal.votesFor)}</Td>
                <Td>{fromBigtoNormal(proposal.votesAgainst)}</Td>
                <Td>
                  <Button variant={"solid"}
                    onClick={() => {
                        onOpen()
                        setPIndex(index)
                    }}>
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
