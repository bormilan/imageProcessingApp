import { useContext } from "react";
import { ImageContext } from "../App";

type Props = {
  imageSrc: string | null;
};

export default function ImageViewer({ imageSrc }: Props) {
  return (
    <div className="image-viewer">{imageSrc && <img src={imageSrc} />}</div>
  );
}
