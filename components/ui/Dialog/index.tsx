import { Dialog as MUIDialog, DialogContent, DialogTitle } from '@mui/material';

interface DialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog = ({ title, open, onClose, children }: DialogProps) => {
  return (
    <MUIDialog open={open} onClose={onClose}>
      <DialogTitle>
        <span>{title}</span>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MUIDialog>
  );
};

export { Dialog };
