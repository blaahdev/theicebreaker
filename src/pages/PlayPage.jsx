/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  List,
  ListItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Stepper from "../components/Stepper";
import { useContext, useEffect, useState } from "react";
import { uniqueId } from "../helper/helper";
import { TEAM_NAMES } from "../helper/lists";
import referee from "../assets/avatars/referee.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { GameContext } from "../store/GameContextProvider";
import useIsFirstRender from "../hooks/useIsFirstRender";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import SettingsIcon from "@mui/icons-material/Settings";
import { StepperContext } from "../store/StepperContextProvider";
import cheer from "../assets/avatars/cheer.png";
import regularPenguin from "../assets/avatars/regular-penguin.png";
import drawingPenguin from "../assets/avatars/drawing-penguin.png";
import answerPenguin from "../assets/avatars/answer-penguin.png";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import bg0 from "../assets/bg/11.png";
import bg1 from "../assets/movingbg/bg1.gif";
import bg2 from "../assets/movingbg/bg2.gif";
import confetti from "../assets/movingbg/confetti.gif";
import cheerSound from "../assets/sounds/cheerSound.wav";
import bgSound from "../assets/sounds/bgSound.mp3";
import alarmSound from "../assets/sounds/alarmSound.wav";
import useSound from "../hooks/useSounds";

// --------------- LISTS -------------------
const stepList = [
  {
    title: "Team Up!",
    content: <Step1TeamUp />,
  },
  { title: "Ready, Set, Draw!", content: <Step2StartGame /> },
  { title: "Winner is... 🎉", content: <Step3Result /> },
];

const avatarInstructions = [
  {
    img: referee,
    content: (
      <List marker="decimal" sx={{ pl: 4 }}>
        {[
          "Form teams of 4-5 people",
          "Introduce yourselves",
          "Choose who draws first and who guesses last",
          "Tip: Best guesser goes last, best drawer goes first",
          "Decide a team name",
        ].map((each, i) => (
          <ListItem
            key={i}
            sx={{
              display: "list-item",
              color: "#ffff",
            }}
          >
            {each}
          </ListItem>
        ))}
      </List>
    ),
  },
];

const bgs = [bg0, bg2, confetti];

// --------------- MAIN COMPONENT -------------------

export default function PlayPage() {
  const { activeStep } = useContext(StepperContext);
  return (
    <Box
      sx={{
        height: "100%",
        backgroundImage: `url(${bgs?.[activeStep] || bg1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Stepper stepList={stepList} />
    </Box>
  );
}

// ------------ STEPPER COMPONENTS
function Step1TeamUp() {
  const { teams, setTeams, resetWordsList } = useContext(GameContext);
  const { setActiveStep } = useContext(StepperContext);

  useEffect(() => {
    resetWordsList();
  }, []);

  const handleTeamNameChange = (e) => {
    const { name: id, value } = e.target;
    let newTeams = [...teams];
    const found = newTeams.find((each) => each.id == id);
    if (!found) {
      return;
    }
    found.name = value;
    setTeams(newTeams);
  };

  const handleAddTeam = () => {
    setTeams((prev) => [
      ...prev,
      {
        id: uniqueId(),
        name: TEAM_NAMES[Math.floor(Math.random() * TEAM_NAMES.length)],
        score: 0,
      },
    ]);
  };

  const handleRemoveTeam = (id) => {
    if (teams.length < 3) {
      return;
    }
    setTeams((prev) => prev.filter((each) => each.id !== id));
  };
  return (
    <>
      <Stack
        fullWidth
        justifyContent="center"
        gap={2}
        p={2}
        sx={{ width: "100%" }}
      >
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Typography variant="body1">Team Names:</Typography>
          <Stack direction="row" gap={2}>
            <Button
              variant="outlined"
              onClick={handleAddTeam}
              color="primary"
              disabled={teams.length > 5}
              pt={2}
            >
              <AddCircleOutlineIcon />
              Add Teams
            </Button>
            <GameSettings />
          </Stack>
        </Stack>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2}>
          {teams.map((each, i) => (
            <Card key={each.id} p={2}>
              <CardContent>
                <Stack direction="row">
                  <Typography variant="h6">Team #{i + 1}</Typography>
                  <IconButton
                    onClick={() => handleRemoveTeam(each.id)}
                    color="primary"
                    disabled={teams.length < 3}
                    sx={{ p: 0, marginLeft: "auto" }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Stack>
                <TextField
                  variant="outlined"
                  name={each.id}
                  value={each.name}
                  onChange={handleTeamNameChange}
                />
              </CardContent>
            </Card>
          ))}
        </Stack>
        <Button
          variant="contained"
          onClick={() => setActiveStep((prev) => ++prev)}
        >
          Start!
        </Button>
      </Stack>
    </>
  );
}

function Step2StartGame() {
  const {
    start,
    setStart,
    currentRound,
    generateNewWord,
    gameSettings,
    setGameSettings,
  } = useContext(GameContext);
  const { setActiveStep } = useContext(StepperContext);
  const { round } = gameSettings;
  const isFirstRender = useIsFirstRender();
  const [personNum, setPersonNum] = useState(1);

  useEffect(() => {
    if (isFirstRender && !currentRound.wordObj) {
      generateNewWord();
    }
  }, [isFirstRender]);

  useEffect(() => {
    reset();
  }, [round]);

  const reset = () => {
    setStart(false);
    setPersonNum(1);
    generateNewWord();
    // refreshNewWord();
  };

  const content = start ? (
    <GuessTheWord personNum={personNum} setPersonNum={setPersonNum} />
  ) : currentRound.round >= gameSettings.rounds ? (
    <>
      <ScoreBoard />
      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        fullWidth
        onClick={() => {
          setActiveStep(stepList.length - 1);
        }}
      >
        Tally Scores
      </Button>
      <Button
        mt={2}
        variant="outlined"
        fullWidth
        onClick={() => {
          setGameSettings((prev) => ({
            ...prev,
            rounds: currentRound.round + 1,
          }));
          generateNewWord();
        }}
      >
        Add 1 More Round
      </Button>
    </>
  ) : (
    <>
      <ScoreBoard />
      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        fullWidth
        onClick={() => {
          setStart(true);
          setPersonNum(1);
        }}
      >
        Start!
      </Button>
    </>
  );

  const header = (
    <Stack
      direction="row"
      gap={2}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Stack direction="column">
        {currentRound.round >= gameSettings.rounds ? (
          <Typography variant="h2" textAlign="center">
            Round Completed!
          </Typography>
        ) : (
          <Typography variant="h2" textAlign="start">
            {`Round #${currentRound.round + 1}`}
          </Typography>
        )}

        {start && (
          <Stack direction="row" justifyContent="center" alignItems="center">
            {new Array(personNum).fill().map((_, i) => (
              <Box key={i} sx={{ width: "100px" }}>
                <img
                  src={
                    i === gameSettings.playerEachTeam - 1
                      ? answerPenguin
                      : i === personNum - 1
                      ? drawingPenguin
                      : regularPenguin
                  }
                  alt=""
                  style={{ width: "100%" }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
      <Stack direction="row" gap={2}>
        <IconButton color="primary" onClick={reset}>
          <AutoModeIcon /> Reset Round
        </IconButton>
        <GameSettings />
      </Stack>
    </Stack>
  );

  return (
    <Container sx={{ padding: { xs: "8px", md: "80px" } }}>
      {header}
      {content}
    </Container>
  );
}

function Step3Result() {
  const { teams } = useContext(GameContext);

  const { play, stop } = useSound(cheerSound);
  const sortedTeams = teams.sort((a, b) => b.score - a.score);
  let winners =
    sortedTeams[0].score === 0
      ? []
      : sortedTeams.filter((each) => each.score === sortedTeams[0].score);

  useEffect(() => {
    if (winners.length === 0) {
      return;
    }
    play();
  }, [winners]);

  const content =
    winners.length === 0 ? (
      <Typography variant="h2">No winners yet!</Typography>
    ) : (
      <>
        <Typography variant="h2" textAlign="center">
          🎉Congratulations🎉
        </Typography>
        <Typography variant="h2" color="secondary" textAlign="center">
          {winners.map((each) => each.name).join(", ")}!!
        </Typography>
      </>
    );

  return (
    <Container sx={{ padding: "20px" }}>
      {content}
      <ScoreBoard />
    </Container>
  );
}

// ------------ HELPER COMPONENTS
function AvatarHelper() {
  const [show, setShow] = useState(true);
  const activeStep = 0;

  if (activeStep > avatarInstructions.length - 1) {
    return <></>;
  }
  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-end"
        onClick={() => setShow((prev) => !prev)}
        sx={{
          cursor: "pointer",
          position: "absolute",
          right: "20px",
          bottom: "20px",
        }}
      >
        {show && (
          <Box
            sx={{
              backgroundColor: "#70d8d6",
              maxWidth: "350px",
              borderRadius: "100px 100px 10px 120px",
              padding: "20px",
              fontSize: "0.8em",
              marginRight: "100px",
            }}
          >
            {avatarInstructions[activeStep].content}
          </Box>
        )}
        <Avatar
          alt="Remy Sharp"
          src={avatarInstructions[activeStep].img}
          sx={{
            width: 100,
            height: 100,
            marginLeft: "auto",
            // border: "10px solid black",
            ":hover": {
              transform: "scale(1.25)",
            },
          }}
        />
      </Stack>
    </>
  );
}

const GameSettings = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { gameSettings, setGameSettings, resetEntireGame } =
    useContext(GameContext);
  const { setActiveStep } = useContext(StepperContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <IconButton
        variant="outlined"
        aria-describedby="game-settings"
        onClick={handleClick}
        color="primary"
      >
        <SettingsIcon /> Settings
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack direction="column" flex="1" gap={2} p={2}>
          <Box>
            <Typography variant="body1">
              Time for each player to draw:
            </Typography>
            <Stack
              direction="row"
              gap={2}
              justifyContent="flex-start"
              alignItems="center"
            >
              {[0, 10, 20, 30, 60, 90, 120, 150].map((each) => (
                <Button
                  variant={
                    gameSettings.timer === each ? "contained" : "outlined"
                  }
                  key={each}
                  onClick={() =>
                    setGameSettings((prev) => ({ ...prev, timer: each }))
                  }
                  color="primary"
                >
                  {each === 0 ? "No timer" : each + "s"}
                </Button>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="body1">Number of Rounds</Typography>
            <TextField
              id="num-rounds"
              label="Number"
              type="number"
              initialValue="5"
              value={gameSettings.rounds}
              onChange={(e) => {
                const { value } = e.target;
                if (value < 3) {
                  return;
                }
                setGameSettings((prev) => ({ ...prev, rounds: value }));
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
          <Box>
            <Typography variant="body1">Player in Each Team:</Typography>
            <TextField
              id="player-num"
              label="Number"
              type="number"
              initialValue="5"
              value={gameSettings.playerEachTeam}
              onChange={(e) => {
                const { value } = e.target;
                if (value < 3) {
                  return;
                }
                setGameSettings((prev) => ({ ...prev, playerEachTeam: value }));
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
          <Box>
            <Button
              variant="outlined"
              onClick={() => {
                resetEntireGame();
                setActiveStep(0);
              }}
            >
              Reset Entire Game
            </Button>
          </Box>
        </Stack>
      </Popover>
    </>
  );
};

function GuessTheWord({ personNum, setPersonNum }) {
  const { currentRound, nextRound, gameSettings, setStart } =
    useContext(GameContext);
  const [hints, setHints] = useState({ first: new Set(), last: new Set() });
  const [showAnswer, setShowAnswer] = useState(false);
  if (
    !currentRound ||
    !currentRound?.wordObj ||
    !currentRound?.wordObj.phrase
  ) {
    console.log("ERROR HERE", currentRound);
    return <></>;
  }
  const { wordObj: { phrase = "", img = "", meaning = "" } = {} } =
    currentRound || {};

  const wordsList = phrase.split(" ");
  const len = wordsList.length;
  const last = wordsList[len - 1].split("");
  const inbetween = len > 2 ? wordsList.slice(1, len - 1).join(" ") : "";
  const first = wordsList[0].split("");

  const handleHintsClick = (name = "first", index = 0) => {
    setHints((prev) => {
      const newSet = new Set(prev[name]); // Create a new Set to avoid mutating state directly
      if (newSet.has(index)) {
        newSet.delete(index); // Remove the index if it already exists
      } else {
        newSet.add(index); // Add the index if it doesn't exist
      }
      return {
        ...prev,
        [name]: newSet, // Update the state with the new Set
      };
    });
  };

  const handleComplete = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      nextRound();
      setStart(false);
    }
  };

  const isShowAnswer = (type = "first", i) => {
    return showAnswer || personNum === 1 || hints[type].has(i);
  };

  const questionBoxes = (
    <>
      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
          pb={2}
        >
          {first.map((eachF, i) => (
            <Box
              key={i}
              sx={{
                border: "1px solid black",
                borderRadius: "10px",
                width: "50px",
                height: "50px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                backgroundColor: isShowAnswer("first", i) ? "#37c2bf" : "#ffff",
              }}
              onClick={() => !showAnswer && handleHintsClick("first", i)}
            >
              {isShowAnswer("first", i) ? eachF : ""}
            </Box>
          ))}
        </Stack>
        <Typography variant="body1" textAlign="center" pb={2}>
          {" "}
          {inbetween}{" "}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          {last.map((eachL, i) => (
            <Box
              key={i}
              sx={{
                border: "1px solid black",
                borderRadius: "10px",
                width: "50px",
                height: "50px",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                backgroundColor: isShowAnswer("last", i) ? "#37c2bf" : "#ffff",
              }}
              onClick={() => !showAnswer && handleHintsClick("last", i)}
            >
              {isShowAnswer("last", i) ? eachL : ""}
            </Box>
          ))}
        </Stack>
      </Box>
      {meaning && (
        <Box>
          <Typography variant="body1" color="#b9b9b9">
            HINT: {meaning}
          </Typography>
        </Box>
      )}
    </>
  );

  const firstPersonBox = (
    <img src={img} alt="img" style={{ height: "500px", maxWidth: "100%" }} />
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ flex: 1 }}
    >
      <Stack justifyContent="center" alignItems="center">
        {personNum < gameSettings.playerEachTeam ? (
          <Timer
            duration={gameSettings.timer}
            setPersonNum={setPersonNum}
            playerEachTeam={gameSettings.playerEachTeam}
            personNum={personNum}
          />
        ) : (
          <Typography variant="h5" textAlign="center">
            Guess The Answer!
          </Typography>
        )}
      </Stack>
      <Stack
        direction="column"
        gap={2}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        sx={{ width: "100%", height: "100%", flex: 1 }}
      >
        {personNum === 1 ? firstPersonBox : questionBoxes}
        {personNum !== 1 && (
          <>
            {personNum >= gameSettings.playerEachTeam && (
              <Button variant="contained" onClick={handleComplete} fullWidth>
                {!showAnswer ? "Show Answer!" : "Next Round!"}
              </Button>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}

function ScoreBoard() {
  const { teams, setTeams } = useContext(GameContext);
  const sortedTeams = teams.sort((a, b) => b.score - a.score);
  const topTeamsId =
    sortedTeams[0].score === 0
      ? []
      : sortedTeams
          .filter((each) => each.score === sortedTeams[0].score)
          .map((each) => each.id);

  const handleScore = (isAdd, id) => {
    setTeams((prev) =>
      prev.map((each) => {
        if (each.id === id) {
          return {
            ...each,
            score: isAdd
              ? ++each.score
              : each.score === 0
              ? each.score
              : --each.score,
          };
        } else {
          return each;
        }
      })
    );
  };

  return (
    <Box sx={{ position: "relative", zIndex: "2" }}>
      <Card
        sx={{
          border: "5px solid black",
          borderRadius: "10px",
          backgroundColor: "#E3D03D",
          filter: "drop-shadow(0 0 0.75rem #68686893)",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        <CardContent>
          <Typography variant="h3" textAlign="center">
            SCOREBOARD
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#000000",
              borderRadius: "10px",
              minWidth: "none",
            }}
          >
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">
                    <Typography variant="h4" sx={{ color: "#ffff" }}>
                      #
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h4" sx={{ color: "#ffff" }}>
                      TEAM
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h4" sx={{ color: "#ffff" }}>
                      SCORE
                    </Typography>
                  </TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTeams.map((eachTeam, i) => (
                  <TableRow
                    key={eachTeam.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="h4"
                        color={
                          topTeamsId.includes(eachTeam.id)
                            ? "secondary"
                            : "white"
                        }
                        sx={{ fontStyle: "italic" }}
                      >
                        {" "}
                        {i < 3 ? "#" + (i + 1) : ""}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="body1"
                        color={
                          topTeamsId.includes(eachTeam.id)
                            ? "secondary"
                            : "white"
                        }
                      >
                        {eachTeam.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        color={
                          topTeamsId.includes(eachTeam.id)
                            ? "secondary"
                            : "white"
                        }
                      >
                        {eachTeam.score}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        sx={{ color: "#ffff" }}
                        onClick={() => handleScore(true, eachTeam.id)}
                      >
                        +
                      </IconButton>
                      <IconButton
                        sx={{ color: "#ffff" }}
                        onClick={() => handleScore(false, eachTeam.id)}
                      >
                        -
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Box
        sx={{
          cursor: "pointer",
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "250px",
          transition: "all 0.5s ease-out", // Transition for the initial state
          animation: "rotate 1.5s ease-in-out infinite", // Apply rotation animation on hover
          "@keyframes rotate": {
            "0%": { transform: "rotate(15deg)" },
            "50%": { transform: "rotate(-15deg)" },
            "100%": { transform: "rotate(15deg)" },
          },
        }}
      >
        <img src={cheer} alt="" style={{ width: "100%" }} />
      </Box>
    </Box>
  );
}

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return (
      <Box className="timer" sx={{ textAlign: "center" }}>
        Show your drawing to next person!
      </Box>
    );
  }

  return (
    <Box className="timer" sx={{ textAlign: "center" }}>
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </Box>
  );
};

function Timer({ setPersonNum, playerEachTeam, personNum, duration }) {
  // const { play } = useSound(bgSound);
  const { play: play2 } = useSound(alarmSound);

  // useEffect(() => {
  //   play(false);
  // }, []);

  if (duration === 0) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            play2(true);
            setPersonNum((prev) => ++prev);
          }}
        >
          Next
        </Button>
      </>
    );
  }

  return (
    <>
      <CountdownCircleTimer
        isPlaying={personNum !== playerEachTeam}
        duration={duration}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => {
          play2(true);
          setPersonNum((prev) => ++prev);
          return {
            shouldRepeat: true,
            delay: 5,
          };
        }}
      >
        {renderTime}
      </CountdownCircleTimer>
    </>
  );
}
