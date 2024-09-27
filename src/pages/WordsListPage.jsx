import { Box, Container, List, ListItem, Typography } from "@mui/material";
import { WORDS_LIST } from "../helper/lists";

export default function WordsListPage() {
  return (
    <Container sx={{ padding: "20px" }}>
      <Typography variant="h1">Words List</Typography>
      <Typography variant="body1">Total: {WORDS_LIST.length}</Typography>
      <Typography variant="body1" pb={2}>
        Here you will find the complete list of words or idioms in use.
      </Typography>
      <Box
        sx={{ maxHeight: "400px", overflowY: "auto", backgroundColor: "white" }}
      >
        <List sx={{ listStyleType: "disc", pl: 4 }}>
          {WORDS_LIST.map((each, i) => (
            <ListItem
              key={i}
              sx={{ display: "list-item", ":hover": { color: "salmon" } }}
            >
              {each.phrase}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
