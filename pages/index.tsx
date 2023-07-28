import React, { useEffect } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"

import {CardTypeNew, TirageType} from "../redux/features/quine/quineSlice"


import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { fetchAllCards, fetchAllTirages } from "../redux/features/quine/quineSlice"
import FormAddCard from "../components/FormAddCard"


const Quine: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCards())
    dispatch(fetchAllTirages())
  }, [])

  const {cards} = useAppSelector(state => state.quine)
  const {tirages} = useAppSelector(state => state.quine)


  return (
    <Layout>
      <div className="page">
        {cards.map((card: CardTypeNew) => (
          <div className="bg-red-200 p-2">
            <p>{card.cardNumber}</p>
            <div className="grid grid-cols-5 gap-2">
              {card.playedNumber.map(num => (
                <p className=" flex border p-2 justify-center items-center">{num.value}</p>
              ))}
            </div>
          </div>
        ))}
        <FormAddCard/>
        {tirages.map((tirage: TirageType) => (
          <div>
            <p>{tirage.name}</p>
          </div>
        ))}
      </div>
      
    </Layout>
  )
}

export default Quine
