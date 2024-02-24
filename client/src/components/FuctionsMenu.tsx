import { Button } from "@mui/material";
import { ProcessImage } from "../apis/fuction_api";
import { useContext } from "react";
import { ImageContext } from "../App";
import functionsJson from "../data/functions.json";
import { IProcessFunction } from "../types";

export default function FunctionsMenu() {
  const { file, setFile, setProcessedImageName } = useContext(ImageContext);
  const processFunctions = functionsJson as IProcessFunction[];

  async function handleClick(route: string) {
    if (!file) {
      console.log("there is no file");
      return;
    }

    var bodyFormData = new FormData();
    bodyFormData.append("image", file);

    const res = await ProcessImage(route, bodyFormData);

    const data = await res.blob();
    const imageUrl = URL.createObjectURL(data);
    setProcessedImageName(imageUrl);
    setFile(new File([data], "file"));
  }

  return (
    <div className="functions-container">
      {processFunctions.map((func: IProcessFunction, i) => (
        <Button onClick={() => handleClick(func.route)}>{func.name}</Button>
      ))}
    </div>
  );
}
