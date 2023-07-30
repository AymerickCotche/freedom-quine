// components/FormAddCard.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCard, setCardNumber, setNumValue } from '../redux/features/quine/quineSlice';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/hooks';

const FormAddCard: React.FC = () => {
  const cardNumberInput = useSelector((state: RootState) => state.quine.cardNumberInput);
  const numValuesInput = useSelector((state: RootState) => state.quine.numValuesInput);
  const dispatch = useAppDispatch();

  const handleChangeCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCardNumber(event.target.value));
  };

  const handleChangeNumValue = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNumValue({ index, value: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const concatenatedNums = numValuesInput.join(',');
    dispatch(addNewCard({
      cardNumber: cardNumberInput,
      playedNumber: concatenatedNums
    }))

    for (let i = 0; i< 15; i++) {
      dispatch(setNumValue({ index : i, value: "" }));
    }
    dispatch(setCardNumber(""));
    // Vous pouvez effectuer ici l'action que vous souhaitez avec la chaîne de caractères concaténée
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <label htmlFor="cardNumber" className="block font-medium mb-2">
        Numéro du carton
      </label>
      <input
        type="text"
        id="cardNumber"
        value={cardNumberInput}
        onChange={handleChangeCardNumber}
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-5">

        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`num${index + 1}`} className="block font-medium mb-2">{`Num${index + 1}:`}</label>
            <input
              type="text"
              id={`num${index + 1}`}
              value={numValuesInput[index]}
              onChange={(event) => handleChangeNumValue(index, event)}
              className="border p-2 w-full"
            />
          </div>
        ))}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Enregistrer le carton
      </button>
    </form>
  );
};

export default FormAddCard;