
type DropIndicatorProps = {
  beforeId: string | null; 
  column: string;
  onDrop?: (column: string, beforeId: string | null) => void;
};

export const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={column}
        className="my-0.5 h-0.5 w-full bg-black opacity-0"
      />
    );
  };
