import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";

const initialData = {
  name: "",
  email: "",
  password: "",
};
const initialErrorData = {
  name: false,
  email: false,
  password: false,
};

function RegisterPage() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrorData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const { name, email, password } = formData;
    e.preventDefault();
    if (!name || !email || !password) {
      setErrors({
        name: name === "",
        email: email === "",
        password: password === "",
      });
      return;
    }
    console.log(formData);
    setErrors(initialErrorData);
    setFormData(initialData);
  };
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ paddingTop: "4rem" }}>
        <Paper
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
          elevation={5}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              error={errors.name}
              helperText={errors.name && "Name is required"}
              value={formData.name}
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
              error={errors.email}
              helperText={errors.email && "Email is required"}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => handleInputChange(e)}
              error={errors.password}
              helperText={errors.password && "Password is required"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default RegisterPage;
