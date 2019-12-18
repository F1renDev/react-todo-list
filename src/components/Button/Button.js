import React from "react";
import styles from "./Button.module.css";

const button = props => (
  <button
    disabled={props.disabled}
    className={props.delete ? styles.buttonDelete : styles.button}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
