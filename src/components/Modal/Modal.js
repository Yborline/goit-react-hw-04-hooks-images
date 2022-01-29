import s from "../Modal/Modal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export default function  Modal ({onClose, alt, largeImage}){

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return (() => {
      window.removeEventListener("keydown", handleKeyDown);
    })
})
  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      onClose();
    }
  };
 const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
    return createPortal(
      <div onClick={handleBackdropClick} className={s.Overlay}>
        <img className={s.Modal} alt={alt} src={largeImage}></img>
      </div>,
      modalRoot
    );
  }
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
  };


