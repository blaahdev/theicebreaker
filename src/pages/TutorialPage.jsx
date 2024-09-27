import { Box } from "@mui/material";

export default function TutorialPage() {
  return (
    <>
      <Box>
        <Box>
          <iframe
            loading="lazy"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              //   top: "0",
              //   left: "0",
              border: "none", // Add a comma here
              padding: "0",
              margin: "0",
            }}
            src="https://www.canva.com/design/DAGR1bhbbA0/xbl_yRwJ0y0qEZp9vn8e6w/view?embed"
            allowFullScreen
            allow="fullscreen"
          ></iframe>
        </Box>
        <a
          href="https://www.canva.com/design/DAGR1bhbbA0/xbl_yRwJ0y0qEZp9vn8e6w/view?utm_content=DAGR1bhbbA0&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
          target="_blank"
          rel="noopener noreferrer" // Use "noopener noreferrer" for better security
        >
          Icebreaker!! (Presentation)
        </a>{" "}
        by Blaahco
      </Box>
    </>
  );
}
