import React, { useEffect, useContext } from "react";
import "../App.css";
import { DataContext } from "../context/ContextReducer";
import Form from "./Form";
import Items from "./Items";
import Buttons from "./Buttons";
import Modal from "./Modal";

export default function RandomPicker() {
  const { setDisplay, state, dispatch, open, handleClose } =
    useContext(DataContext);

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
      }, 200);

      stopTimeout = setTimeout(() => {
        clearInterval(interval);
      }, 3000);
    });

    return () => {
      clearTimeout(timeout);
      clearTimeout(stopTimeout);
      clearInterval(interval);
    };
  }, [state.isPlaying]);

  return (
    <>
      {state.isPlaying ? (
        <h2 className="header">{state.pickedItem?.content}</h2>
      ) : (
        <h2 className="header">Add name & pick one</h2>
      )}
      <Form />
      <Items />
      <Buttons />
      <Modal />
      {state.isPlaying ? (
        <img className="gif" src={state.pickedGif} alt="gif" />
      ) : (
        <img
          className="gif"
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm5oaG9pYWdmNG1ocWU1ZmZicmRvaHM4bjRidWF1Y25yNmE4bjljdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eYilisUwipOEM/giphy.gif"
          alt="gif"
        />
      )}
    </>
  );
}
