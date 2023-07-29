import React, { useEffect } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"

import {CardTypeNew, TirageType, setDrawn, setLastTirage} from "../redux/features/quine/quineSlice"


import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { fetchAllCards, fetchAllTirages } from "../redux/features/quine/quineSlice"
import FormAddCard from "../components/FormAddCard"
import FormNewNumber from "../components/FormNewNumber"


const Quine: React.FC = () => {
  const dispatch = useAppDispatch();

  
  const {cards} = useAppSelector(state => state.quine)
  const {tirages} = useAppSelector(state => state.quine)
  const {lastTirage} = useAppSelector(state => state.quine)
  
  useEffect(() => {
    dispatch(fetchAllCards())
    dispatch(fetchAllTirages())
    
  }, [])

  useEffect(() => {
    if (tirages.length > 0) {

      dispatch(setLastTirage(tirages[tirages.length -1]))
      
    }
  }, [tirages])

  useEffect(() => {
    if (tirages.length > 0 && cards.length > 0) {
      dispatch(setDrawn())
    }
  }, [tirages, cards])

  return (
    <Layout>
      <div className="page">
        <div className="flex">

          <div>
            {cards.map((card: CardTypeNew) => (
              <div className="bg-red-200 p-2">
                <p>{card.cardNumber}</p>
                <div className="grid grid-cols-5 gap-2">
                  {card.playedNumber.map(num => (
                    <p className={num.drawn ? "flex border p-2 justify-center items-center bg-green-200": "flex border p-2 justify-center items-center"}>{num.value}</p>
                  ))}
                </div>
              </div>
            ))}
            <FormAddCard/>

          </div>
          <div>
            
            <h2>Tirage N°{lastTirage.name}</h2>
            <div className="grid grid-cols-5 gap-2">
              {lastTirage.value.map((numero: string) => (
                <p>{numero}</p>
              ))}
            </div>
            <FormNewNumber/>
          </div>
        </div>
      </div>
      
    </Layout>
  )
}

export default Quine
