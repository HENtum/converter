import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { HiArrowPath } from "react-icons/hi2";
import style from "./InputBloc.module.scss";
import axios from "axios";

export const InputBloc = () => {
  const [lit1, setLit1] = useState(5);
  const [lit2, setLit2] = useState(8);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [inp1, setInp1] = useState("");
  const [inp2, setInp2] = useState("");
  const [params, setParams] = useState<any>({});
  const val = [
    { id: 1, name: "Белорусский рубль", lit: "BYN" },
    { id: 2, name: "Бразильский реал", lit: "BRL" },
    { id: 3, name: "Евро", lit: "EUR" },
    { id: 4, name: "Дирхам ОАЭ", lit: "AED" },
    { id: 5, name: "Доллар США", lit: "USD" },
    { id: 6, name: "Индийская рупия", lit: "INR" },
    { id: 7, name: "Китайский юань", lit: "CNY" },
    { id: 8, name: "Российский рубль", lit: "RUB" },
    { id: 9, name: "Турецкая лира", lit: "TRY" },
    { id: 10, name: "Фунт Стерлингов", lit: "GBP" },
    { id: 11, name: "Казахстангий тенге", lit: "KZT" },
  ];
  const litFindLit1 = val.find((obj) => obj.id === lit1);
  const litFindLit2 = val.find((obj) => obj.id === lit2);

  const func = async () => {
    let params = "";
    const valOnState = sessionStorage.getItem("valute");
    if (valOnState) {
      params = JSON.parse(valOnState);
      setParams(params);
    } else {
      const { data } = await axios.get(
        "https://v6.exchangerate-api.com/v6/d68497885a63a1e8ef7c951f/latest/USD"
      );
      if (data) {
        sessionStorage.setItem(
          "valute",
          JSON.stringify(data?.conversion_rates)
        );
        params = data?.conversion_rates;
        setParams(params);
      }
    }
  };

  const change1 = () => {
    console.log(params);
    if (litFindLit1?.lit === "USD") {
      const val = litFindLit2?.lit.toString();
      const valData = val && params[val];
      const calc = +inp1 * valData;
      setInp2(calc.toString());
    } else if (litFindLit2?.lit === "USD") {
      const val = litFindLit1?.lit.toString();
      const valData = val && params[val];
      const calc = +inp1 / valData;
      const sum = calc * 1000;
      const sum2 = Math.floor(sum);
      const sum3 = sum2 / 1000;
      setInp2(sum3.toString());
    } else {
      const val1 = litFindLit1?.lit.toString();
      const val2 = litFindLit2?.lit.toString();
      const calc = val2 && params[val2];
      const valData1 = val1 && params[val1];
      const dollCalc = +inp1 / valData1;
      const sumFull = dollCalc * calc;
      const sum = sumFull * 1000;
      const sum2 = Math.floor(sum);
      const sum3 = sum2 / 1000;

      setInp2(sum3.toString());
    }
  };

  useEffect(() => {
    if (inp1 === "0") {
      setInp1("");
    }
    if (inp2 === "0") {
      setInp2("");
    }
    func();

    change1();
  }, [inp1, inp2]);

  const chahgeLit = () => {
    const litFirst = lit2;
    setLit2(lit1);
    setLit1(litFirst);
  };

  return (
    <div className={style.inpBloc}>
      <div className={style.inpBlocInp}>
        <input
          type="number"
          value={inp1}
          className={style.inpBlocInpInput}
          onChange={(e) => setInp1(e.target.value)}
        />
        <p className={style.text1} onClick={() => setIsOpen1(!isOpen1)}>
          {litFindLit1?.lit}
        </p>
      </div>
      {isOpen1 && (
        <div className={style.optionInp1}>
          {val.map((obj) => (
            <div
              onClick={() => {
                const i = obj.id;
                if (lit2 === i) {
                  return;
                } else {
                  setLit1(i);
                  setInp1("");
                }
                setIsOpen1(false);
              }}
              className={
                lit1 === obj.id ? style.activeOptionInpVal : style.optionInpVal
              }
              key={obj.id}
            >
              {obj.name} {obj.lit}
            </div>
          ))}
        </div>
      )}
      {isOpen2 && (
        <div className={style.optionInp1}>
          {val.map((obj) => (
            <div
              onClick={() => {
                const i = obj.id;
                if (lit1 === i) {
                  return;
                } else {
                  setLit2(i);
                  setInp1("");
                }
                setIsOpen2(false);
              }}
              className={
                lit2 === obj.id ? style.activeOptionInpVal : style.optionInpVal
              }
              key={obj.id}
            >
              {obj.name} {obj.lit}
            </div>
          ))}
        </div>
      )}
      <div className={style.inpBlocInp}>
        <input
          type="number"
          value={inp2}
          className={style.inpBlocInpInput}
          onChange={(e) => setInp2(e.target.value)}
        />
        <p className={style.text2} onClick={() => setIsOpen2(!isOpen2)}>
          {litFindLit2?.lit}
        </p>
      </div>
      <BsArrowRight className={style.absoluteArrow} />
      <button className={style.absButton}>
        <HiArrowPath className={style.absoluteRevers} onClick={chahgeLit} />
      </button>
    </div>
  );
};
