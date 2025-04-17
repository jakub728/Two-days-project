import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/ContextReducer";
import "../App.css";

export default function Form() {
  const { player, setPlayer, addPlayer } = useContext(DataContext);

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        name="player"
        placeholder="Add an item here"
        value={player}
        onChange={(e) => {
          setPlayer(e.target.value);
        }}
      />
      <button className="input-button" onClick={addPlayer}>
        Add
      </button>
    </form>
  );
}
