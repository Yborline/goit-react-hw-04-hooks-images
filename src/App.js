import Searchbar from "./components/Searchbar/Searchbar";
import { useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import s from "./App.css";

export default function App() {
  
  const [imgName, setImgName] = useState('')
  const [page , setPage] = useState(1)

    return (
      <div className={s.body}>
        <Searchbar pageSearch={setPage} onSubmit={setImgName} />
        <ImageGallery pageApp={page} imgName={imgName} />
      </div>
    );
  }


