import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "../../components/Container/Container";
import styles from "./FormPage.module.css";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/url";

const FormPage = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    age: "",
  });
  const [statusServer, setStatusServer] = useState(0);

  const location = useLocation();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const handleChangeSelect = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSubmit = async () => {
    if (id >= 0) {
      await axios
        .put(`${BASE_URL}/users/${id}`, {
          id,
          ...data,
        })
        .then((response) => {
          setStatusServer(response.status);
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    setId(location.state.id);
  }, []);

  useEffect(() => {
    if (statusServer === 200) {
      navigate("/");
    }
  }, [statusServer]);

  return (
    <Container>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={handleChange}
            value={data.name}
            InputProps={{
              className: styles.formItem,
            }}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            onChange={handleChange}
            value={data.phone}
            InputProps={{
              className: styles.formItem,
            }}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            value={data.email}
            InputProps={{
              className: styles.formItem,
            }}
          />

          <TextField
            variant="outlined"
            label="Select country"
            select
            onChange={handleChangeSelect}
            value={data.country}
            name="country"
            InputProps={{
              className: styles.formItem,
            }}
          >
            <MenuItem value="Australia">Australia</MenuItem>
            <MenuItem value="Russia">Russia</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
          </TextField>

          <TextField
            id="age"
            label="Age"
            variant="outlined"
            type="number"
            onChange={handleChange}
            value={data.age}
            InputProps={{
              className: styles.formItem,
              inputProps: { min: 0 }
            }}
          />

          <Button onClick={handleSubmit} variant="contained">
            {" "}
            Отправить
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default FormPage;
