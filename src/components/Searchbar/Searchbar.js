import { useState } from "react";
import { ImSearch } from "react-icons/im";
import s from "./Searchbar.module.css";
import PropTypes from "prop-types";

export default function Searchbar({onSubmit ,pageSearch}) {
  const [nameImg, setNameImg] = useState("")
  const [page] = useState(1)

const  changeInput = (event) => {
    const { value } = event.target;
    setNameImg(value.toLowerCase());
  };

const  handleSubmit = (event) => {

    event.preventDefault();
    if (nameImg.trim() === "") {
      alert("Введите название");
      return;
    }
    onSubmit(nameImg);
    pageSearch(page);
     setNameImg('')
  };

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <ImSearch style={{ marginRight: 8 }} />
            Найти
          </button>
          <input
            onChange={changeInput}
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            value={nameImg}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };


