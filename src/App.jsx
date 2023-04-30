import Container from "@mui/material/Container";
import RouterComponent from "./components/RouterComponent";
import NavBar from "./components/NavBar";
import { Backdrop, CircularProgress } from "@mui/material";
import { useGlobalContext } from "./store/context";

function App() {
  const { loading } = useGlobalContext();
  return (
    <>
      {
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      <NavBar />
      <Container component={"main"} maxWidth="lg" sx={{ height: "85%" }}>
        <RouterComponent />
      </Container>
    </>
  );
}

export default App;
