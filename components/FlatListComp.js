import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer } from "native-base";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";


const FlatListComp = ({dataNew, getData}) => {
  return <Box>
    <Heading fontSize="xl" p="4" pb="3">
      Inbox
    </Heading>
    <FlatList data={dataNew} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "muted.50"
    }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar size="48px" source={{
            uri: item.avatarUrl
          }} />
          <VStack>
            <Text _dark={{
              color: "warmGray.50"
            }} color="coolGray.800" bold>
              {item.fullName}
            </Text>
            <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              {item.email}
            </Text>
          </VStack>
          <Spacer />
          <Text fontSize="xs" _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" alignSelf="flex-start">
            <ModalDelete id={item.id} getData={getData}/>
            <ModalUpdate item={item} getData={getData}/>
          </Text>
        </HStack>
      </Box>} keyExtractor={item => item.id} />
  </Box>;
};

export default FlatListComp