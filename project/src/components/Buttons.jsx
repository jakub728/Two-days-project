import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/ContextReducer";

export default function Buttons() {
    const { display, handlePlay, handleReset } = useContext(DataContext)


  return (
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
  );
}
