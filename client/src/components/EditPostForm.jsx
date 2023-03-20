import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Select, Input, MenuItem } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from "react-file-base64";
import { updatePost } from "../Redux/actions/postActions";

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

const EditPostForm = ({ post, closeEditMode }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(post?.image);
  const { register, handleSubmit, control, formState, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    const updatedPost = {
      _id: post._id,
      ...data,
      image: file,
    };

    dispatch(updatePost(post._id, updatedPost));
    reset();
    setFile(null);
    closeEditMode();
  };

  return (
    <div>
      <div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{ marginBottom: "10px" }}
            id="title"
            label="Title"
            name="title"
            variant="outlined"
            size="small"
            {...register("title")}
            error={formState.errors?.title ? true : false}
            fullWidth
            defaultValue={post?.title}
          />
          <TextField
            sx={{ marginBottom: "10px" }}
            id="subtitle"
            label="Subtitle"
            name="subtitle"
            size="small"
            {...register("subtitle")}
            error={formState.errors?.subtitle ? true : false}
            fullWidth
            defaultValue={post?.subtitle}
          />
          <Controller
            sx={{ marginBottom: "25px" }}
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
            defaultValue={post?.tag}
          />
          <TextField
            sx={{ marginBottom: "10px", marginTop: "25px" }}
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
            defaultValue={post?.content}
          />
          <FileBase64
            sx={{ marginBottom: "25px" }}
            multiple={false}
            onDone={({ base64 }) => setFile(base64)}
          />
          <div>
            <Button
              color="secondary"
              variant="outlined"
              onClick={closeEditMode}
            >
              Back
            </Button>
            <Button type="submit" color="primary" variant="outlined">
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;
