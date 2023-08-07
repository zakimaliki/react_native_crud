import axios from "axios";
import { Button, Modal, FormControl, Input } from "native-base";
import { useState } from "react";


const ModalCreate = ({ getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = () => {
    data = {
      fullName,
      email,
      avatarUrl
    }
    axios.post("http://192.168.0.102:3000/User", data)
      .then(() => {
        alert("data created")
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
    <Button onPress={() => setShowModal(true)}>
      Add data
    </Button>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Create Data</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>full Name</FormControl.Label>
            <Input onChangeText={(value) => setFullName(value)} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={(value) => setEmail(value)} />
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
              Create
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  </>;
};

export default ModalCreate