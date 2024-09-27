import { Box, Button, Stack, Typography } from "@mui/material";
import bg2 from "../assets/movingbg/bg2.gif";
// import bg1 from "../assets/bg/2.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import multiplePenguins from "../assets/avatars/multiple-penguins.png";
import onePenguin from "../assets/avatars/one-penguin.png";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <StyledHomePage>
      <Stack direction="row">
        {new Array(5).fill().map((_, i) => (
          <Box
            sx={{
              height: {
                xs: "50px",
                md: "100px",
              },

              transition: "all 0.5s ease-out",
              animate: "none",
              ":hover": {
                animation: "rotate 0.5s ease-in-out infinite",
              },
              "@keyframes rotate": {
                "0%": { transform: "rotate(15deg)" },
                "50%": { transform: "rotate(-15deg)" },
                "100%": { transform: "rotate(15deg)" },
              },
            }}
            key={i}
          >
            <img src={onePenguin} style={{ height: "100%" }} />
          </Box>
        ))}
      </Stack>
      <Typography variant="h1">The Drawing Relay Game</Typography>
      <Button
        variant="contained"
        sx={{ maxWidth: { xs: "none", md: "400px" }, width: { xs: "100%" } }}
        onClick={() => navigate("/play")}
      >
        Get Started
      </Button>
      <Button
        variant="outlined"
        color="black"
        sx={{ maxWidth: { xs: "none", md: "400px" }, width: { xs: "100%" } }}
        onClick={() => navigate("/tutorial")}
      >
        How to Play
      </Button>
    </StyledHomePage>
  );
}

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 89vh;
  align-items: center;
  gap: 20px;
  background-image: url(${bg2});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px;
`;
