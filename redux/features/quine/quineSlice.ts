import {
  createSlice,
  PayloadAction,
  createAsyncThunk
} from '@reduxjs/toolkit';
import type { RootState } from '../../store';

import prisma from '../../../lib/prisma'

export type Numero = {
  value: string
  drawn: boolean
}

export type CardType = {
  id?: string;
  cardNumber: string
  playedNumber: string
}

export type CardTypeNew = {
  id: string;
  cardNumber: string
  playedNumber: Numero[]
}

export type TirageType = {
  id: string
  name: string
  value: string
}

// declaring the types for our state
export type QuineState = {
  cards: CardTypeNew[];
  tirages: TirageType[]
  cardNumberInput: string
  numValuesInput: string[];
};

export const fetchAllCards = createAsyncThunk(
  'quine/fetchAllCards',
  async (_, thunkAPI) => {
    const cards = await fetch('/api/card')
    return cards.json()
  }
)

export const fetchAllTirages = createAsyncThunk(
  'quine/fetchAllTirages',
  async (_, thunkAPI) => {
    const tirages = await fetch('/api/tirage')
    return tirages.json()
  }
)

export const addNewCard = createAsyncThunk(
  'quine/addNewCard',
  async (data: CardType, thunkAPI) => {
    const tirages = await fetch('/api/addcard', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return tirages.json()
  }
)
const transformNum = (numString: string) => {
  const formattedNumeros = []
  const numArray = numString.split(',')
  for (const num of numArray) {
    formattedNumeros.push({
      value: num,
      drawn: false
    })
  }
  return formattedNumeros

}
const initialState: QuineState = {
  cards: [],
  tirages: [],
  cardNumberInput: '',
  numValuesInput: Array(15).fill(''),
};

export const quineSlice = createSlice({
  name: 'quine',
  initialState,
// The `reducers` field lets us define reducers and generate associated actions. 
// In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app. 
// So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    setCardNumber: (state, action: PayloadAction<string>) => {
      state.cardNumberInput = action.payload;
    },
    setNumValue: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      state.numValuesInput[index] = value;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        // Add user to the state array
        state.cards = action.payload
      })
      .addCase(fetchAllTirages.fulfilled, (state, action) => {
        // Add user to the state array
        state.tirages = action.payload
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        state.cards.push({
          id: action.payload.id,
          cardNumber: action.payload.cardNumber,
          playedNumber: transformNum(action.payload.playedNumber)
        })
      })
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.

export const {
  setCardNumber, setNumValue
} = quineSlice.actions
// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.


// exporting the reducer here, as we need to add this to the store
export default quineSlice.reducer;