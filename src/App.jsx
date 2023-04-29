import Container from "@mui/material/Container";
import RouterComponent from "./components/RouterComponent";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <RouterComponent />
      </Container>
    </>
  );
}

export default App;
