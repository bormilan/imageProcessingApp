import React, { createContext, useState } from "react";
import "./App.css";
import ImageViewer from "./components/ImageViewer";
import FunctionsMenu from "./components/FuctionsMenu";
import ImageUploader from "./components/ImageUploader";
import ResultList from "./components/ResultList";

export const ImageContext = createContext<{
  file: File | null;
  setFile: (f: File | null) => void;
  originalImageName: string | null;
  setOriginalImageName: (p: string | null) => void;
  processedImageName: string | null;
  setProcessedImageName: (p: string | null) => void;
}>({
  file: null,
  setFile: () => {},
  originalImageName: null,
  setOriginalImageName: () => {},
  processedImageName: null,
  setProcessedImageName: () => {},
});

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [originalImageName, setOriginalImageName] = useState<string | null>(
    null
  );
  const [processedImageName, setProcessedImageName] = useState<string | null>(
    null
  );

  return (
    <ImageContext.Provider
      value={{
        file,
        setFile,
        originalImageName,
        setOriginalImageName,
        processedImageName,
        setProcessedImageName,
      }}
    >
      <div className="main-container">
        <ImageViewer imageSrc={originalImageName} />
        <ImageViewer imageSrc={processedImageName} />
        <ImageUploader />
        <FunctionsMenu />
        <ResultList />
      </div>
    </ImageContext.Provider>
  );
}

export default App;
