import { useState , useEffect } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import s from "../ImageGallery/ImageGallery.module.css";
import api from "../../api/api";


export default function ImageGallery({imgName , pageSearch}) {
  const [error] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [largeImage, setLargeImage] = useState("")
  const [alt, setAlt] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState(false)
  const [status, setStatus] = useState("idle")

 const  scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const loadNextPage = () => {
    setPage(state =>state + 1 )
  };

  const closeModal = () => {
    setShowModal(!{ showModal })
      setLargeImage('')
      setAlt('')
  }

  useEffect(() => {
    if (!imgName) { return }
 setStatus("pending")
    setImages([])
    api.fetchImages(imgName, pageSearch).then((img) => {
        setImages([...img.hits])
        setStatus("resolved")
      });
}, [imgName])

  useEffect(() => {
    if (page > 1) {
       setStatus("pending")
      api.fetchImages(imgName, page).then((img) => {
        setImages([...images, ...img.hits])
        setTimeout(() => {
               scrollToBottom()},400)})
               setStatus("resolved")};
  }, [ page])
  
  const openModal = ({ alt, largeURL }) => {
    setShowModal({ showModal })
      setLargeImage(largeURL)
      setAlt(alt)
  }

    if (status === "idle") {
      return <div className={s.text}>Введите название </div>;
    }
  
    if (status === "pending") {
    return <Loader />
  }

    if (status === "rejected") {
      return <h1 className={s.text}>{error.message}</h1>;
    }

      if (status === "pending" || status === "resolved"  ) {
      return (
        <div className={s.text}>
     
{images.length === 0 ? <p className={s.text}>Такого запроса не существует</p> : 
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                onClick={openModal}
                className={s.ImageGalleryItemImag}
                key={id}
                url={webformatURL}
                alt={tags}
                largeURL={largeImageURL}
              />
            ))}
          </ul>}
          {showModal && (
            <Modal
              onClose={closeModal}
              alt={alt}
              largeImage={largeImage}
            />
          )}
          {images.length > 0 ? (
            <Button Click={loadNextPage} />
          ) : ''}
        </div>
      );
  }}