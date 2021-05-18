// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { evaluate } from 'mathjs';

function App() {
  
  let [expression, setExpression] = useState(" ");
  let [oldExpression, setOldExpression] = useState(" ");
  let [prev, setPrev] = useState("ANS");
  
  let numerics = new Set("0123456789.");
  let operators = new Set("+-*/%");
  let brackets = new Set("()");

  let buttons = ["(", ")", "%", "AC", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
  let evaluateExpression = function(){
      let evaluation = evaluate(expression);
      setOldExpression(expression + "=");
      setExpression(String(evaluation));
      setPrev("ANS");
  };
  let putNumerics = function(value){
    if(prev === "ANS"){
      setOldExpression("Ans = "+ expression)
      setExpression(value);
    }
    else{ setExpression(expression + value); }
    setPrev("NUM");
  }
  let putOperator = function(value){
    if(prev !== "OP" && value !== "("){
      setExpression(expression + value);
    }
    else {
      setExpression(expression.slice(0,-1) + value);
    }
    setPrev("OP");
  }

  let putBrackets = function(value){
    if(value === "("){
      setExpression(expression + value);
    }
    else if(prev === "NUM"){
      setExpression(expression + value);
    }
    setPrev("BRAC");
  }

  let handleKeyUp = function(event){
    console.log(event.key);
    if(event.key === "Backspace" && expression.length >= 1){
      setExpression(expression.slice(0,-1));
      setPrev("DEL");
    }
    else if(numerics.has(event.key)){
      putNumerics(event.key); }
    else if(operators.has(event.key)){
      putOperator(event.key);
    }
    else if(event.key === "Enter"){
      evaluateExpression();
    }
  }
  return (
    <div className="App" tabIndex={0} onKeyUp={handleKeyUp} style={{
      width : "100%",
      height : "100vh",
      background : "#444444",
      display : "flex",
      flexDirection : "column",
      justifyContent : "center",
      alignItems : "center",
    }}>
      <div class="shrink">
        <div style={{
        width : "450px",
        height: "70px",
        background : "#FF5E13",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px 20px",
        borderRadius: "10px",
        overflow: "hidden"
        }}>
          <p style={{
            fontSize: "40px",
            color: "#ffffff",
            fontWeight: "bold"
          }}>CALCULATOR</p>
        </div>
        <div class= "screen" style={{
        width : "450px",
        minHeight: "108px",
        background : "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
        overflow: "hidden"
        }}>
          <h3 style={{ marginTop: "0px"}}>{oldExpression}</h3>
          <h1 style={{ marginBottom: "0px"}}>{expression}</h1>
        </div>

        <div style={{
        width : "450px",
        background : "#ffffff",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "20px",
        borderRadius: "10px"
        }}>
          {buttons.map(function(buttonValue,index){
            return <button style={{
              fontSize: "18px",
              width: "90px",
              margin:"5px 10px",
              padding: "4px 7px",
              background: "#9999",
              fontWeight: "bold",
              borderRadius: "5px"
            }} onClick={function(){
              if(buttonValue === "="){
                evaluateExpression();
              }
              else if(buttonValue === "AC" && expression.length >= 1){
                setExpression(expression.slice(0,-1));
                setPrev("DEL");
              }
              else if(operators.has(buttonValue)){
                putOperator(buttonValue);
              }
              else if(numerics.has(buttonValue)){
                putNumerics(buttonValue);
              }
              else if(brackets.has(buttonValue)){
                putBrackets(buttonValue);
              }
            }}>{buttonValue}</button>
          })}
        </div>
      </div>

    </div>
  );
}

export default App;
