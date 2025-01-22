import { useState, useEffect } from "react";

import { Column } from "./Column";
import { BootstrapDialog } from "./Dialogs";

const DEFAULT_CARDS = [
  { title: "Task 1", id: "1", column: "Not Started" },
  { title: "Task 2", id: "2", column: "In Progress" },
  { title: "Task 3", id: "3", column: "Completed" },
];

const DEFAULT_STATUSES = [
  { status: "Not Started", bgColor: "rgba(255, 0, 0, 0.2)" },
  { status: "In Progress", bgColor: "rgba(255, 255, 0, 0.2)" },
  { status: "Completed", bgColor: "rgba(0, 128, 0, 0.2)" },
];

export const Board = () => {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("cards");
    return savedCards ? JSON.parse(savedCards) : DEFAULT_CARDS;
  });
  const [statuses, setStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem("statuses");
    return savedStatuses ? JSON.parse(savedStatuses) : DEFAULT_STATUSES;
  });

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem("statuses", JSON.stringify(statuses));
  }, [statuses]);

  const addStatus = () => {
    function getRandomColorWithOpacity() {
      const randomColor = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
      const opacity = 0.2;
      const r = parseInt(randomColor.slice(1, 3), 16);
      const g = parseInt(randomColor.slice(3, 5), 16);
      const b = parseInt(randomColor.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${opacity})`;
    }
    if (newStatus && !statuses.includes(newStatus)) {
      setStatuses([
        ...statuses,
        { status: newStatus, bgColor: getRandomColorWithOpacity() },
      ]);
    }
    setOpen(false);
  };

  const deleteStatus = (statusToRemove: string) => {
    setStatuses((prev: { status: string; bgColor: string }[]) =>
      prev.filter((status) => status.status !== statusToRemove)
    );
  };

  console.log(statuses);
  return (
    <>
      <BootstrapDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add New Status"
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            onChange={(e) => setNewStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter status name"
            required
          />
          <button
            onClick={addStatus}
            className="rounded bg-blue-500 px-2 py-1 font-bold text-white"
          >
            Add
          </button>
        </div>
      </BootstrapDialog>

      <div className="flex h-full w-full gap-3 p-12 justify-center">
        {statuses.map((status: { status: string; bgColor: string }) => (
          <Column
            key={status.status}
            title={status.status}
            headingColor={status.bgColor}
            column={status.status}
            cards={cards}
            setCards={setCards}
            deleteStatus={deleteStatus}
          />
        ))}
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 text-sm text-neutral-50 bg-blue-500 rounded h-10"
        >
          Add Status
        </button>
      </div>
    </>
  );
};
