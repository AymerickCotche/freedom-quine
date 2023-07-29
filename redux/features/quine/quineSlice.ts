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
  id: number
  name: string
  value: string[]
}

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

export const updateNumbers = createAsyncThunk(
  'quine/updateNumbers',
  async (data: TirageType, thunkAPI) => {
    const dataToSend = {
      id: data.id,
      name: data.name,
      value: data.value.length > 1 ? data.value.join(',') : data.value[0]
    }
    const tirages = await fetch('/api/addnumber', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    })
    return tirages.json()
  }
)

export const addNewTirage = createAsyncThunk(
  'quine/addNewTirage',
  async (data, thunkAPI) => {
    const tirages = await fetch('/api/addtirage', {
      method: 'POST',
      body: JSON.stringify(data)
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

// declaring the types for our state
export type QuineState = {
  cards: CardTypeNew[]
  tirages: TirageType[]
  lastTirage: TirageType
  cardNumberInput: string
  numValuesInput: string[]
  newNumberInput: string
};

const initialState: QuineState = {
  cards: [],
  tirages: [],
  lastTirage: {
    id: -1,
    name: '',
    value: []
  },
  cardNumberInput: '',
  numValuesInput: Array(15).fill(''),
  newNumberInput: ''
};

export const quineSlice = createSlice({
  name: 'quine',
  initialState,

  reducers: {
    setCardNumber: (state, action: PayloadAction<string>) => {
      state.cardNumberInput = action.payload;
    },
    setNumValue: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      state.numValuesInput[index] = value;
    },
    setNewNumber: (state, action: PayloadAction<string>) => {
      state.newNumberInput = action.payload;
    },
    setLastTirage: (state, action: PayloadAction<TirageType>) => {
      state.lastTirage = action.payload
    },
    setDrawn: (state, action: PayloadAction<TirageType>) => {
      for (const numero of state.lastTirage.value) {
        state.cards.forEach(card => {
          card.playedNumber.forEach(number => {
            if (number.value === numero) {
              number.drawn = true
            }
          })
        }
         
        )
      }
    },
    addNewNumber: (state, action: PayloadAction<string>) => {
      state.tirages[state.tirages.length - 1].value.push(action.payload)
    }
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchAllCards.fulfilled, (state, action) => {

        state.cards = action.payload
      })
      .addCase(fetchAllTirages.fulfilled, (state, action) => {

        state.tirages = action.payload
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        state.cards.push({
          id: action.payload.id,
          cardNumber: action.payload.cardNumber,
          playedNumber: transformNum(action.payload.playedNumber)
        })
      })
      .addCase(updateNumbers.fulfilled, (state, action) => {
        console.log('done')
      })
      .addCase(addNewTirage.fulfilled, (state, action) => {
        state.lastTirage.id = action.payload.id
        state.lastTirage.name = action.payload.name
        state.lastTirage.value = []
        state.tirages.push({
          id : action.payload.id,
          name : action.payload.name,
          value : []
        })
      })
  },
});


export const {
  setCardNumber,
  setNumValue,
  setLastTirage,
  setDrawn,
  setNewNumber,
  addNewNumber
} = quineSlice.actions

export default quineSlice.reducer;