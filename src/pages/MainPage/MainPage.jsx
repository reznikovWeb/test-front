import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@material-ui/core";
import { BASE_URL } from "../../constants/url";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsersByName, setSortedUsersByName] = useState([]);
  const [isSortedUsersByName, setIsSortedUsersByName] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(0);

  const handleDelete = async (id) => {
    await axios
      .delete(`${BASE_URL}/users/${id}`)
      .then((response) => {
        response.status === 200 && setDeleteStatus(response.status);
      })
      .catch((e) => console.log(e));

    if (isSortedUsersByName) {
      await axios
        .get(`${BASE_URL}/users?_sort=name`)
        .then((response) => {
          setSortedUsersByName(response.data);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleSortName = async () => {
    if (!isSortedUsersByName) {
      await axios
        .get(`${BASE_URL}/users?_sort=name`)
        .then((response) => setSortedUsersByName(response.data))
        .catch((e) => console.log(e));
      setIsSortedUsersByName(true);
    } else {
      setIsSortedUsersByName(false);
    }
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/users`).then((response) => setUsers(response.data));
    setDeleteStatus(0);
  }, [deleteStatus]);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <span style={{ marginRight: 10 }}>Name</span>
                <Button variant="outlined" onClick={handleSortName}>
                  sort
                </Button>
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Change</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(isSortedUsersByName ? sortedUsersByName : users).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <Link
                    to="/details"
                    state={{ id: user.id }}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      textTransform: "uppercase",
                      backgroundColor:'#D5D5D5',
                      padding:'6px 16px',
                      borderRadius: 4
                    }}
                  >
                    Change
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleDelete(user.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MainPage;
