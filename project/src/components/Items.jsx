import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/ContextReducer";
import "../App.css";

export default function Items() {
  const { display, state, deletePlayer } = useContext(DataContext);

  return (
    <div className="bigger-wrapper">
      {state.items.map((element) => (
        <div className="wrapper" style={{ display }} key={element.id}>
          <p>{element.content}</p>
          <span onClick={() => deletePlayer(element.id)}>X</span>
        </div>
      ))}
    </div>
  );
}
