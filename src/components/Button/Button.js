
import s from "./Button.module.css";
import PropTypes from "prop-types";

export default function Button({Click}) {
 



    return (
      <div className={s.ButtonDiv}>
        <button className={s.Button} onClick={Click} type="button">
          Load more
        </button>
      </div>
    );
  }


Button.propTypes = {
  Click: PropTypes.func.isRequired,
};


