import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addNewTirage, fetchAllCards } from "../redux/features/quine/quineSlice";
import FormNewNumber from "./FormNewNumber";

const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  const {tirages} = useAppSelector(state => state.quine)
  const {lastTirage} = useAppSelector(state => state.quine)
  
  const handleNewTirage = () => {
    if (confirm("Sur ?")) {
      dispatch(addNewTirage())
    }
  }
  return (
    <div className=" bg-blue-200 h-full p-2 text-center">
      <h1 className="text-xl font-bold text-center mb-2">Loto Quine Freedom</h1>
      <p className="border border-blue-700 inline-block rounded-md p-2 cursor-pointer mb-2">ajouter une carte</p>
      <div>
            
          <h2 className="mb-2 font-semibold">Tirage N°{lastTirage.name}</h2>
          <div className="grid grid-cols-5 gap-2">
            {lastTirage.value.map((numero: string) => (
              <p className="bg-yellow-400 font-bold">{numero}</p>
            ))}
          </div>
          <FormNewNumber/>
        </div>
      <p onClick={handleNewTirage} className="border border-red-700 text-red-800 font-bold bg-red-300 inline-block rounded-md p-2 cursor-pointer mb-2">Nouveau tirage</p>
    </div>
  );
};

export default Header;
