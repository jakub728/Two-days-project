import { useContext } from "react";
import { DataContext } from "../context/ContextReducer";

export default function Modal() {
  const { state, handleClose, open } = useContext(DataContext);

  if (!open) return null;

  return (
    <div className="error">
      <p>{state.error}</p>
      {state.error ? <button onClick={handleClose}>OK</button> : null}
    </div>
  );
}
