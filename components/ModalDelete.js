import { Button, Modal } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { useState } from "react";
import axios from "axios";


const ModalDelete = ({ id, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = () => {
    axios.delete(`http://192.168.0.102:3000/User/${id}`)
      .then(() => {
        alert("data deleted")
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
      <Entypo name="circle-with-cross" size={24} color="red" />
    </Button>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Delete Data</Modal.Header>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
              Cancel
            </Button>
            <Button onPress={() => handleSubmit()}>
              Delete
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  </>;
};

export default ModalDelete