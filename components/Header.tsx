import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { addNewTirage } from "../redux/features/quine/quineSlice";

const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleNewTirage = () => {
    dispatch(addNewTirage())
  }
  return (
    <div className="bg-blue-200 h-full p-2">
      <h1>Loto Quine Freedom</h1>
      <p>Tirage n° </p>
      <p>ajouter une carte</p>
      <p onClick={handleNewTirage}>Nouveau tirage</p>
    </div>
  );
};

export default Header;
