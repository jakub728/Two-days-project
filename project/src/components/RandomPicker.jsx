import React, { useEffect } from "react";
import { useState, useReducer } from "react";
import { v4 as idMaker } from "uuid";
import "../App.css";

const gitArr = [
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm5oaG9pYWdmNG1ocWU1ZmZicmRvaHM4bjRidWF1Y25yNmE4bjljdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eYilisUwipOEM/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3RoaXNudGw0MXRwdHMyYWFtNHk1c3MwZjgybTNpa2p0dWU3OGo4cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UO5elnTqo4vSg/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnBscGFveXQwc3ZrNHllMXNiMHlvbXp5b3AxbHZ0dHBsN2Y4bHIzMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tsX3YMWYzDPjAARfeg/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG1lYjZvY241c2I0amdpY3poanFrMjUwM3czZnpxZWJhdjh6bmZncSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CGXnGb7zpsvXD2uwvd/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWN2eW01OG1jb3JreGhyNGl0bmpnMWNnMTV2ZWJqdXo4YzA2bjZqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NtY188QaxDdC/giphy.gif",
];

const initialState = {
  items: [],
  isPlaying: false,
  pickedItem: {},
  pickedGif: "",
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

export default function RandomPicker() {
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

  useEffect(() => {
    if (!state.isPlaying) return;

    let interval;
    let stopTimeout;

    let timeout = setTimeout(() => {
      interval = setInterval(() => {
        dispatch({ type: "PICK" });
      }, 100);

      setDisplay("none");

      stopTimeout = setTimeout(() => {
        setDisplay("block");
        clearInterval(interval);
      }, 3000);
    }, 0);

    return () => {
      clearTimeout(timeout);
      clearTimeout(stopTimeout);
      clearInterval(interval);
    };
  }, [state.isPlaying]);

  useEffect(() => {
    if (!state.isPlaying) return;

    let interval;
    let stopTimeout;

    let timeout = setTimeout(() => {
      interval = setInterval(() => {
        dispatch({ type: "PICK_GIF" });
      }, 500);

      stopTimeout = setTimeout(() => {
        clearInterval(interval);
      }, 3000);
    }, 0);

    return () => {
      clearTimeout(timeout);
      clearTimeout(stopTimeout);
      clearInterval(interval);
    };
  }, [state.isPlaying]);

  return (
    <>
      <h2>add items and pick one</h2>
      <form>
        <input
          type="text"
          name="player"
          placeholder="Add an item here"
          value={player}
          onChange={(e) => {
            setPlayer(e.target.value);
          }}
        />
        <button onClick={addPlayer}>Add</button>
      </form>

      {state.items.map((element) => (
        <div className="wrapper" style={{ display }} key={element.id}>
          <p>{element.content}</p>
          <span onClick={() => deletePlayer(element.id)}>X</span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <button
          style={{ display }}
          onClick={() => {
            handlePlay();
          }}
        >
          Play
        </button>
        <button style={{ display }} onClick={() => handleReset()}>
          Reset
        </button>
      </div>
      {state.isPlaying ? <h2>{state.pickedItem?.content}</h2> : null}
      {state.isPlaying ? <img src={state.pickedGif} alt="" /> : null}
    </>
  );
}
