import { Button, Container, Typography } from "@mui/material";
import notfoundpenguin from "../assets/avatars/404-penguin.png";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={notfoundpenguin} style={{ height: "400px" }} />
      <Typography variant="h2">Page Not Found</Typography>
      <Button onClick={() => navigate("/")}>Go back Home</Button>
    </Container>
  );
}
