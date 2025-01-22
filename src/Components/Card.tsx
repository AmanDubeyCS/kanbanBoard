import { useState, Dispatch, SetStateAction } from "react";
import { BootstrapDialog } from "./Dialogs";
import { motion } from "motion/react";
import { DropIndicator } from "./DropIndicator";
import { CardType } from "../types/cardTypes";
import { DragEvent as ReactDragEvent } from "react";

type CardProps = CardType & {
  handleDragStart: (e: ReactDragEvent<HTMLDivElement>, card: CardType) => void;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

export const Card = ({
  title,
  description,
  id,
  column,
  setCards,
  handleDragStart,
}: CardProps) => {
  const [open, setOpen] = useState(false);

  const handleDelete = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };
  return (
    <>
      <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        title="Task Details"
      >
        <div className="w-[400px]">
          <div className="flex gap-1">
            <label htmlFor="title">Title:</label>
            <p id="title" className="font-bold">
              {title}
            </p>
          </div>
          <div className="flex gap-1">
            <label htmlFor="description">Description:</label>
            <p id="description" className="font-bold">
              {description}
            </p>
          </div>
          <div className="flex gap-1">
            <label htmlFor="status">Status:</label>
            <p id="status" className=" font-bold">
              {column}
            </p>
          </div>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => handleDelete(id)}
              className="px-3 py-1.5 text-red-800 bg-red-400 rounded-md font-semibold transition-colors hover:text-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      </BootstrapDialog>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e: DragEvent) =>
          handleDragStart(e as unknown as ReactDragEvent<HTMLDivElement>, {
            title,
            id,
            column,
            description,
          })
        }
        onClick={() => setOpen(true)}
        className="cursor-grab rounded border border-neutral-300 p-3 active:cursor-grabbing shadow-md"
      >
        <p className="text-sm font-bold">{title}</p>
      </motion.div>
    </>
  );
};
