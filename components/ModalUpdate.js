import { Button, Modal, FormControl, Input, View } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import axios from "axios";


const ModalUpdate = ({ item, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState(item.fullName);
  const [email, setEmail] = useState(item.email);
  const [avatarUrl, setAvatarUrl] = useState(item.avatarUrl);

  const handleSubmit = () => {
    data = {
      fullName,
      email,
      avatarUrl
    }
    axios.put(`http://192.168.0.102:3000/User/${item.id}`, data)
      .then(() => {
        alert("data updated")
        setShowModal(false)
        getData()
      }
      )
      .catch((err) => {
        alert(err)
        setShowModal(false)
      })
  }

  return <>
    <Button style={{ backgroundColor: "none" }} onPress={() => setShowModal(true)}>
      <AntDesign name="edit" size={24} color="green" />

    </Button>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Update Data</Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
              Cancel
            </Button>
            <Button onPress={() => handleSubmit()}>
              Update
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  </>;
};

export default ModalUpdate