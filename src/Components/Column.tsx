import { useState, Dispatch, SetStateAction } from "react";
import { DragEvent as ReactDragEvent } from "react";

import { Card } from "./Card";
import { AddCard } from "./AddCard";
import { DropIndicator } from "./DropIndicator";
import { MdDeleteForever } from "react-icons/md";
import { CardType } from "../types/cardTypes";

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: string;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  deleteStatus: (status: string) => void;
};

export const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  deleteStatus,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (
    e: ReactDragEvent<HTMLDivElement>,
    card: CardType
  ) => {
    if (!e.dataTransfer) return;
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: ReactDragEvent<HTMLDivElement>) => {
    if (!e.dataTransfer) return;
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: ReactDragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: ReactDragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex justify-between">
        <div className="flex items-center gap-3">
          <h3
            style={{ background: `${headingColor}` }}
            className={`font-medium  text-black px-1 rounded-md `}
          >
            {title}
          </h3>
          <span className="rounded font-semibold text-base text-neutral-300">
            {filteredCards.length}
          </span>
        </div>
        <div className="flex gap-3 text-neutral-300 font-bold items-center">
          <MdDeleteForever
            onClick={() => deleteStatus(column)}
            className="cursor-pointer shrink-0 text-red-500"
          />
          <AddCard column={column} setCards={setCards} showText={false} />
        </div>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-200/50" : "bg-neutral-200/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              setCards={setCards}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} showText={true} />
      </div>
    </div>
  );
};
