import React, { useContext, useState } from "react";
import { Button, Grid, Input, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ImageContext } from "../App";

var backend = process.env.REACT_APP_BACKEND;

async function handleUploadClick(
  file: File | undefined,
  setOriginalImageName: (p: string | null) => void,
  setFile: (f: File | null) => void
) {
  if (!file) {
    console.log("there is no file");
    return;
  }

  var bodyFormData = new FormData();

  bodyFormData.append("image", file);

  console.log(backend);
  const res = await fetch(`${backend}/resize_image`, {
    method: "POST",
    body: bodyFormData,
  });

  const data = await res.blob();
  const imageUrl = URL.createObjectURL(data);
  setOriginalImageName(imageUrl);
  setFile(new File([data], "file"));
}

const ImageUploader: React.FC = () => {
  const acceptedFileTypes = ".png, .jpg, .jpeg";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { setFile, setOriginalImageName } = useContext(ImageContext);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      handleUploadClick(selectedFile, setOriginalImageName, setFile);
      setSelectedFile(null);
    }
  };

  return (
    <div className="image-uploader">
      <Grid sx={{ m: 2, height: "100%", width: "100%" }}>
        <Typography variant="h6">Upload a file</Typography>
        {selectedFile && (
          <Typography variant="subtitle1" color="textSecondary">
            {selectedFile.name}
          </Typography>
        )}
        <input
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileSelect}
          style={{ display: "none", width: "100%" }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Choose a file
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFileUpload}
          disabled={!selectedFile}
          style={{ marginLeft: "16px" }}
        >
          Upload
        </Button>
      </Grid>
    </div>
  );
};

export default ImageUploader;
