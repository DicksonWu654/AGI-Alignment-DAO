import { Container, Flex, Heading, Text, VStack } from "@chakra-ui/react"

export const Landing = () => {
    return (
        <VStack h={'90vh'} justifyContent={'center'} alignItems={'center'}>
            <Heading size={'md'}>
                Welcome to AGI Alignment DAO
            </Heading>
            <Text>
                We're making AGI ready to be controlled by decentralized organisations in the future.
            </Text>
        </VStack>
    )
}