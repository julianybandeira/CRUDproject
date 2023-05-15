import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import axios from "axios"

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try{
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome> b.nome ? 1: -1)))
    } catch(error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getUsers()
    console.log("useEffect")
  }, [setUsers])

  const handleEdit = (item) => {
    setOnEdit(item);
  }

  const handleDelete = async(id) => {
    await axios 
      .delete("http://localhost:8800/"+id)
      .then(({data}) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({data}) => toast.error(data))

      setOnEdit(null)
  }

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
      </Container>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
      <Grid users={users} handleEdit={handleEdit} handleDelete={handleDelete}/>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
