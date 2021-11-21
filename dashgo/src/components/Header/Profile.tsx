import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Iury Sousa</Text>
        <Text color="gray.300" fontSize="small">
          iurysousa13@outlook.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Iury Sousa"
        src="https://github.com/iury-sousa.png"
      />
    </Flex>
  );
}
