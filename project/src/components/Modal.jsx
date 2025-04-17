import Popup from "react";
import { useContext } from "react";
import { DataContext } from "../context/ContextReducer";

export default function Modal({ open, close, message }) {
  return (
    <Popup open={open} closeOnDocumentClick onClose={close} modal>
      <div className="modal">
        <h3>{message}</h3>
        <button onClick={close}>Close</button>
      </div>
    </Popup>
  );
}
