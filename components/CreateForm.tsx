import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createMovieType } from "../types/movie.type";
type ModalProps = {
  handleClose(): void;
  handleCreate(data: createMovieType): void;
  open: boolean;
  title: string;
  handleTitle(data: string): void;
  genre: string;
  handleGenre(data: string): void;
};

export default function CreateForm({
  open,
  handleClose,
  handleCreate,
  title,
  handleTitle,
  genre,
  handleGenre,
}: ModalProps): JSX.Element {
  const handleSubmit = () => {
    const movie = {
      title,
      genre,
    };
    handleCreate(movie);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Movie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a movie, please enter title and genre here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Movie Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="genre"
            label="Movie Genre"
            type="text"
            fullWidth
            variant="standard"
            value={genre}
            onChange={(e) => handleGenre(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={title === "" || genre === ""}
            onClick={handleSubmit}
          >
            Create New
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
