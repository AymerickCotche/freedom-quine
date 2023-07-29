// components/FormAddCard.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewNumber,setNewNumber, updateNumbers } from '../redux/features/quine/quineSlice';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const FormNewNumber: React.FC = () => {
  const dispatch = useAppDispatch();

  const newNumberInput = useSelector((state: RootState) => state.quine.newNumberInput);
  const {lastTirage} = useAppSelector(state => state.quine)

  // useEffect(() => {
  //   dispatch(updateNumbers(lastTirage))
  // }, [lastTirage])

  const handleChangeNewNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewNumber(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(addNewNumber(newNumberInput))

    const allValues = []

    lastTirage.value.forEach(num => allValues.push(num))

    allValues.push(newNumberInput)

    const toUpdateNumber = {
      id : lastTirage.id,
      name: lastTirage.name,
      value: allValues
    }
    dispatch(updateNumbers(toUpdateNumber))
    dispatch(setNewNumber(''))
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <label htmlFor="number" className="block font-medium mb-2">
        Numéro:
      </label>
      <input
        type="text"
        id="number"
        value={newNumberInput}
        onChange={handleChangeNewNumber}
        className="border p-2 mb-4 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormNewNumber;