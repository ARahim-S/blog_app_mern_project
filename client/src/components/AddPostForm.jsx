import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from "react-file-base64";
import { createPost } from "../Redux/actions/postActions";
const tags = [
  "fun",
  "tecnology",
  "entertainment",
  "fun",
  "programming",
  "health",
  "science",
];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tags: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { register, handleSubmit, control, formState, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    dispatch(createPost({ ...data, image: file }));
    clearForm();
  };

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new article</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the form correctly
          </DialogContentText>
          <div>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                id="title"
                label="Title"
                name="title"
                variant="outlined"
                size="small"
                {...register("title")}
                error={formState.errors?.title ? true : false}
                fullWidth
              />
              <TextField
                id="subtitle"
                label="Subtitle"
                name="subtitle"
                size="small"
                {...register("subtitle")}
                error={formState.errors?.subtitle ? true : false}
                fullWidth
              />
              <Controller
                render={({ field }) => (
                  <Select {...field} input={<Input />} fullWidth>
                    {tags.map((tag, index) => (
                      <MenuItem {...field} key={index} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                name="tag"
                control={control}
                error={formState.errors?.tag ? true : false}
                defaultValue={tags[0]}
              />
              <TextField
                id="content"
                label="Content"
                name="content"
                multiline
                size="small"
                {...register("content")}
                rows={4}
                variant="outlined"
                error={formState.errors?.content ? true : false}
                fullWidth
              />
              <FileBase64
                multiple={false}
                onDone={({ base64 }) => setFile(base64)}
              />
              <DialogActions>
                <Button color="primary" variant="outlined" onClick={clearForm}>
                  Clear
                </Button>{" "}
                <Button
                  color="secondary"
                  variant="outlined"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPostForm;
