import { motion } from "motion/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BootstrapDialog } from "./Dialogs";
import { CardType } from "../types/cardTypes";

type AddCardProps = {
  column: string;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  showText: boolean;
};

export const AddCard = ({ column, setCards, showText }: AddCardProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim().length) return;

    const newCard = {
      column,
      title: title.trim(),
      description: description?.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <>
      <motion.button
        layout
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-1.5 text-base font-semibold text-neutral-400 transition-colors hover:text-neutral-600"
      >
        <FiPlus />
        {showText && <span>New</span>}
      </motion.button>
      <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        title={"Add task"}
      >
        <motion.form layout onSubmit={handleSubmit} className="w-[400px]">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              placeholder="Enter task description"
            />
          </div>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 font-bold text-neutral-400 transition-colors hover:bg-neutral-300 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-200 px-3 py-1.5 font-bold text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
            </button>
          </div>
        </motion.form>
      </BootstrapDialog>
    </>
  );
};
