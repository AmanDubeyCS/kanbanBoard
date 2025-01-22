import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { IoIosClose } from "react-icons/io";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactElement;
};

export const BootstrapDialog = ({ open, onClose, title, children }: Props) => (
  <CustomDialog
    onClose={onClose}
    aria-labelledby="customized-dialog-title"
    open={open}
  >
    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
      {title}
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={(theme) => ({
        position: "absolute",
        right: 8,
        top: 8,
        color: theme.palette.grey[500],
      })}
    >
      <IoIosClose />
    </IconButton>
    <DialogContent dividers>{children}</DialogContent>
  </CustomDialog>
);
