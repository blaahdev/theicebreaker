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
      <Typography variant="h2">Lost in the Snow!</Typography>
      <Typography variant="body1">
        Oops! It looks like our little penguin friend got lost in the snow.
        Don’t worry, you can help them find their way back home! ⛄️
      </Typography>
      <Button onClick={() => navigate("/")}>Navigate back Home</Button>
    </Container>
  );
}
