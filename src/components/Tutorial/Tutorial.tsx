import React from "react";
import { Layout } from "../../layouts/Layout/Layout";
import style from './Tutorial.module.css'
const Tutorial = () => {
  return (
    <Layout>
      <div className={style.container}>
        <p className={style.title}>Tutorial for Buyers</p>

      </div>
    </Layout>

  );
};

export default Tutorial;