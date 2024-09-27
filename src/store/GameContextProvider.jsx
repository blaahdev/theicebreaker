/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { TEAM_NAMES, WORDS_LIST } from "../helper/lists";

export const GameContext = createContext({});

const INITIAL_START = false;
const INITIAL_REMAININGWORDSOBJLIST = WORDS_LIST;
const INITIAL_TEAMS = new Array(2).fill().map((_, i) => ({
  id: i,
  name: TEAM_NAMES[Math.floor(Math.random() * TEAM_NAMES.length)],
  score: 0,
}));
const INITIAL_GAMESETTINGS = {
  timer: 30,
  playerEachTeam: 5,
  rounds: 3,
};
const INITIAL_CURRENTROUND = {
  wordObj: WORDS_LIST[0],
  round: 0,
};

export default function GameContextProvider({ children }) {
  const [start, setStart] = useState(INITIAL_START);
  const [remainingWordsObjList, setRemainingWordsObjList] = useState(
    INITIAL_REMAININGWORDSOBJLIST
  );
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [gameSettings, setGameSettings] = useState(INITIAL_GAMESETTINGS);
  const [currentRound, setCurrentRound] = useState(INITIAL_CURRENTROUND);

  const generateNewWord = () => {
    if (remainingWordsObjList.length === 0) {
      alert("No more words left to pick.");
      return;
    }
    const index = Math.floor(Math.random() * remainingWordsObjList.length);
    const wordObj = remainingWordsObjList[index];
    setRemainingWordsObjList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
    setCurrentRound((prev) => ({ ...prev, wordObj }));
  };

  const refreshNewWord = () => {
    if (currentRound.wordObj) {
      setRemainingWordsObjList((prev) => [...prev, currentRound.wordObj]);
    }
    generateNewWord();
  };

  const nextRound = () => {
    //   generateNewWord();
    //   if (currentRound.round === gameSettings.rounds) {
    //     return;
    //   }
    //   setCurrentRound((prev) => ({ ...prev, round: ++prev.round }));
    if (remainingWordsObjList.length === 0) {
      console.warn("No more words to generate.");
      return; // Handle according to your game logic
    }

    generateNewWord();
    if (currentRound.round === gameSettings.rounds) {
      return; // Handle the end of the game
    }
    setCurrentRound((prev) => ({ ...prev, round: prev.round + 1 }));
  };

  const resetEntireGame = () => {
    setStart(INITIAL_START);
    setRemainingWordsObjList(INITIAL_REMAININGWORDSOBJLIST);
    setTeams(INITIAL_TEAMS);
    setGameSettings(INITIAL_GAMESETTINGS);
    setCurrentRound(INITIAL_CURRENTROUND);
  };

  const resetWordsList = () => {
    setRemainingWordsObjList(INITIAL_REMAININGWORDSOBJLIST);
  };

  const value = {
    start,
    setStart,
    teams,
    setTeams,
    gameSettings,
    setGameSettings,
    remainingWordsObjList,
    setRemainingWordsObjList,
    currentRound,
    setCurrentRound,
    generateNewWord,
    refreshNewWord,
    nextRound,
    resetEntireGame,
    resetWordsList,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
