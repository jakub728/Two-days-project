import { createContext, useState, useReducer } from "react";
import { v4 as idMaker } from "uuid";
import Modal from "../components/Modal";

export const DataContext = createContext();

const gitArr = [
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm5oaG9pYWdmNG1ocWU1ZmZicmRvaHM4bjRidWF1Y25yNmE4bjljdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eYilisUwipOEM/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3RoaXNudGw0MXRwdHMyYWFtNHk1c3MwZjgybTNpa2p0dWU3OGo4cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UO5elnTqo4vSg/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnBscGFveXQwc3ZrNHllMXNiMHlvbXp5b3AxbHZ0dHBsN2Y4bHIzMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tsX3YMWYzDPjAARfeg/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG1lYjZvY241c2I0amdpY3poanFrMjUwM3czZnpxZWJhdjh6bmZncSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CGXnGb7zpsvXD2uwvd/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWN2eW01OG1jb3JreGhyNGl0bmpnMWNnMTV2ZWJqdXo4YzA2bjZqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NtY188QaxDdC/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnBtM2txOTY2NHZ6eDVmZWFudmxiempwN2tzNTU4OWI2cHZpd2Y4dyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/bbshzgyFQDqPHXBo4c/giphy.gif",
  "https://media.giphy.com/media/VbnJA6zyOeo6IA1F7f/giphy.gif?cid=82a1493biv8ald8cawf1qsz6aoled3s3gulsawbdobh88whg&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2xyZXpjdXY4ZDYyYmlpeWtqb3Vrcnc3MHN5dzZnaWE5bXVhMDJ2MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d3mlE7uhX8KFgEmY/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2xyZXpjdXY4ZDYyYmlpeWtqb3Vrcnc3MHN5dzZnaWE5bXVhMDJ2MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kd9BlRovbPOykLBMqX/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2xyZXpjdXY4ZDYyYmlpeWtqb3Vrcnc3MHN5dzZnaWE5bXVhMDJ2MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Lopx9eUi34rbq/giphy.gif",
];

const initialState = {
  items: [],
  isPlaying: false,
  pickedItem: {},
  pickedGif:
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm5oaG9pYWdmNG1ocWU1ZmZicmRvaHM4bjRidWF1Y25yNmE4bjljdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eYilisUwipOEM/giphy.gif",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const newPlayer = {
        content: action.payload,
        id: idMaker(),
      };

      if (action.payload === "") {
        alert("No input!");
      } else if (state.items.some((item) => item.content === action.payload)) {
        alert("item already exists!");
      } else {
        return {
          ...state,
          items: [...state.items, newPlayer],
        };
      }

    case "DELETE":
      const updatedItems = state.items.filter(
        (element) => element.id !== action.payload
      );

      return {
        ...state,
        items: updatedItems,
      };

    case "PLAY":
      if (state.items.length < 2) {
        alert("minimum 2 items required to play");
      } else {
        return {
          ...state,
          isPlaying: !state.isPlaying,
        };
      }

    case "PICK":
      function randomNumber(arr) {
        const number = Math.floor(Math.random() * arr.length);
        return arr[number];
      }

      return {
        ...state,
        pickedItem: randomNumber(state.items),
      };

    case "RESET":
      return {
        ...state,
        items: [],
        pickedItem: {},
      };

    case "PICK_GIF":
      function randomGif(arr) {
        const number = Math.floor(Math.random() * arr.length);
        return arr[number];
      }

      return {
        ...state,
        pickedGif: randomGif(gitArr),
      };

    default:
      return initialState;
  }
};

export default function ContextReducer({ children }) {
  const [player, setPlayer] = useState("");
  const [display, setDisplay] = useState("block");
  const [state, dispatch] = useReducer(reducer, initialState);

  function addPlayer(e) {
    e.preventDefault();
    dispatch({ type: "ADD", payload: player });
  }

  function deletePlayer(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function handlePlay() {
    dispatch({ type: "PLAY" });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  return (
    <DataContext.Provider
      value={{
        gitArr,
        state,
        initialState,
        reducer,
        dispatch,
        player,
        setPlayer,
        display,
        setDisplay,
        addPlayer,
        deletePlayer,
        handlePlay,
        handleReset,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
