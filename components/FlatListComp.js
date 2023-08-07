import axios from "axios";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Button } from "native-base";
import { FormControl, Input } from "native-base";
import { useState } from "react";

const FlatListComp = ({ dataNew, getData }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [button, setButton] = useState("Save")
  const [selected, setSelected] = useState({});


  const handleSubmit = () => {
    if (button == "Save") {
      axios.post("http://192.168.0.102:3000/User", {
        fullName,
        email,
        avatarUrl
      })
        .then(() => {
          alert("data created")
          setFullName("");
          setEmail("");
          setAvatarUrl("");
          getData()
        }
        )
        .catch((err) => {
          alert(err)
        })
    } else if (button == "Update") {
      axios.put(`http://192.168.0.102:3000/User/${selected.id}`, {
        fullName,
        email,
        avatarUrl
      })
        .then(() => {
          alert("data updated")
          setFullName("");
          setEmail("");
          setAvatarUrl("");
          setButton("Save")
          getData()
        }
        )
        .catch((err) => {
          alert(err)
        })
      }
  }

  const handleDelete =(id)=>{
    alert(id);
    axios.delete(`http://192.168.0.102:3000/User/${id}`)
    .then(() => {
      alert("data deleted")
      getData()
    }
    )
    .catch((err) => {
      alert(err)
    })
  }

  const SelectedItem = (item) => {
    setSelected(item);
    setFullName(item.fullName);
    setEmail(item.email);
    setAvatarUrl(item.avatarUrl);
    setButton("Update")
  }

  return <Box>
    <Box m="5">
    <FormControl>
      <FormControl.Label>full Name</FormControl.Label>
      <Input onChangeText={(value) => setFullName(value)} value={fullName} />
    </FormControl>
    <FormControl mt="3">
      <FormControl.Label>Email</FormControl.Label>
      <Input onChangeText={(value) => setEmail(value)} value={email} />
    </FormControl>
    <FormControl mt="3">
      <FormControl.Label>URL</FormControl.Label>
      <Input onChangeText={(value) => setAvatarUrl(value)} value={avatarUrl} />
    </FormControl>
    </Box>
    <Button onPress={()=>handleSubmit()} my="15">{button}</Button>
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
          <Button onPress={() => handleDelete(item.id)}>Delete</Button>
            <Button onPress={() => SelectedItem(item)}>Edit</Button>
          <Text fontSize="xs" _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" alignSelf="flex-start">
          </Text>
        </HStack>
      </Box>} keyExtractor={item => item.id} />
  </Box>;
}

export default FlatListComp