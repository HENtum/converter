import React from "react";
import style from "./Home.module.scss";
import Meta from "@/ui/Meta";
import { InputBloc } from "../InputBloc/InputBloc";

export const Home = () => {
  return (
    <>
      <Meta title="converter" description="converterApp" />
      <div className={style.homeContainer}>
        <div className={style.homeContent}>
          <p className={style.convText}>Converter</p>
          <InputBloc />
        </div>
      </div>
    </>
  );
};
