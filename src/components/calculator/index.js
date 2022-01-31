/* eslint no-eval: 0 */
import React, { useState, useCallback } from "react";
import "./index.css";

const OPERATION_FONT_DEFAULT = "+";

export default function Calculator() {
  const [input1, setInput1] = useState(null);
  const [input2, setInput2] = useState(null);
  const [operationFont, setOperationFont] = useState(OPERATION_FONT_DEFAULT);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(null);
  
  const onClickButton = useCallback((e) => {
    e.preventDefault();
    const opFont = e.target.value
    const num1 = input1;
    const num2 = input2;
    const result = `${num1}${opFont}${num2}`;
    setOperationFont(opFont);
    setResult(+eval(result));
    setCount((prevCount => prevCount + 1));
  }, [input1, input2]); 

  const onClickResetButton = useCallback((e) => {
    e.preventDefault();
    setOperationFont(OPERATION_FONT_DEFAULT)
    setInput1(null);
    setInput2(null);
    setResult(null)
  }, []); 

  return (
    <div className="layout-column align-items-center">
      <div data-testid="total-operations" className="pt-50 total-operations">Total operations performed: {count}</div>
      <div className="card">

        <section className="card-text">
          <div className="layout-row justify-content-around align-items-center mt-40">
            <input value={input1 || ""} onChange={e => setInput1(e.target.value)}  type="number" className="ml-3 mr-3" data-testid="app-input1" autoComplete="off" placeholder="Eg: 1"
                  name="input1"/>
            <label className="ml-2 mr-2 symbol text-center" data-testid="selected-operator">{operationFont}</label>
            <input value={input2 || ""} onChange={e => setInput2(e.target.value)} type="number" data-testid="app-input2" autoComplete="off" className="ml-3 mr-3"
                  placeholder="Eg: 2"/>
          </div>

          <div className="layout-row justify-content-around mt-30">
            <button value="+" onClick={onClickButton} className="operationFont" type="submit" data-testid="addButton">+</button>
            <button value="-" onClick={onClickButton} className="operationFont" type="submit" data-testid="subtractButton">-</button>
            <button value="*" onClick={onClickButton} className="operationFont" type="submit" data-testid="multiplyButton">*</button>
            <button value="/" onClick={onClickButton} className="operationFont" type="submit" data-testid="divideButton">/</button>
          </div>

          <div className="layout-row justify-content-between align-items-center mt-30">
            <button onClick={onClickResetButton} type="reset" data-testid="resetButton" className="outline danger">Reset</button>
            <div className="layout-row justify-content-center align-items-center result-container">
              {result !== null && <div data-testid="result" className="result-value ma-0 slide-up-fade-in">Result: {result}</div>}
            </div>
          </div>
        </section>

      </div>
    </div>
  );

}