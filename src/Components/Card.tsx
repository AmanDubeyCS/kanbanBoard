import { useState, Dispatch, SetStateAction } from "react";
import { BootstrapDialog } from "./Dialogs";
import { motion } from "motion/react";
import { DropIndicator } from "./DropIndicator";
import { CardType } from "../types/cardTypes";
import { DragEvent as ReactDragEvent } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

type CardProps = CardType & {
  handleDragStart: (e: ReactDragEvent<HTMLDivElement>, card: CardType) => void;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  statuses: {status: string, bgColor: string}[]
};

export const Card = ({
  title,
  description,
  id,
  column,
  setCards,
  handleDragStart,
  statuses,
}: CardProps) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newStatus, setNewStatus] = useState(column);

  const handleDelete = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  const handleUpdate = (cardID: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardID
          ? {
              ...card,
              title: newTitle,
              description: newDescription,
              column: newStatus,
            }
          : card
      )
    );
    setOpen(false);
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
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              placeholder="Enter task description"
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newStatus}
                label="Age"
                onChange={(e) => setNewStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <MenuItem value={status.status}>{status.status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center justify-between gap-1.5 mt-4">
            <button
              onClick={() => handleDelete(id)}
              className="px-3 py-1.5 text-red-800 bg-red-400 rounded-md font-semibold transition-colors hover:text-red-900"
            >
              Delete
            </button>
            <button
              onClick={() => handleUpdate(id)}
              className="px-3 py-1.5 text-white bg-blue-400 rounded-md font-semibold transition-colors hover:text-blue-100"
            >
              Save
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
