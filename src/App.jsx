import Container from "@mui/material/Container";
import RouterComponent from "./components/RouterComponent";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container component={"main"} maxWidth="lg" sx={{ height: "85%" }}>
        <RouterComponent />
      </Container>
    </>
  );
}

export default App;
