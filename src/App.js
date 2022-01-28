import Searchbar from "./components/Searchbar/Searchbar";
import { useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import s from "./App.css";

export default function App() {
  
  const [imgName, setImgName] = useState('')
  const [pageApp , setPageApp] = useState(1)

    return (
      <div className={s.body}>
        <Searchbar pageSearch={setPageApp} onSubmit={setImgName} />
        <ImageGallery  pageSearch={pageApp}  imgName={imgName} />
      </div>
    );
  }


