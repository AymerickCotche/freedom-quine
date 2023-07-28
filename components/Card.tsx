import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type CardProps = {
  id: string;
  cardNumber: string;
  playedNumber: string
};

const Card: React.FC<{ card: CardProps }> = ({ card }) => {
  return (
    <div>
      <h2>{card.cardNumber}</h2>
      <p>{card.playedNumber}</p>
    </div>
  );
};

export default Card;
