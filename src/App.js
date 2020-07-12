import React from "react";
import Particles from "react-particles-js";

import "tachyons";
import TodoForm from "./containers/TodoForm";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.css";

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 600,
      },
    },
  },
};

const App = () => {
  return (
    <React.Fragment>
      <div className={styles.Wrapper}>
        <div className={styles.Content}>
          <Particles className={styles.particles} params={particlesOptions} />
          <TodoForm />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default App;
