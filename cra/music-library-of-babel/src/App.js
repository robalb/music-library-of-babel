import React from 'react';
import logo from './logo.svg';

function convertBase(value, from_base, to_base) {
  var range = Array.from('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/');
  var from_range = range.slice(0, from_base);
  var to_range = range.slice(0, to_base);
  
  var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
    if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
    return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
  }, 0);
  
  var new_value = '';
  while (dec_value > 0) {
    new_value = to_range[dec_value % to_base] + new_value;
    dec_value = (dec_value - (dec_value % to_base)) / to_base;
  }
  return new_value || '0';
}


function convertBase10toX(value, to_base){
  let radix = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  let Z = [];
  let M = -1;
  for (let i = value; 0 < i; i = Math.floor(i / to_base)) { 
    if(i % to_base >= 10) { 
      Z.push(radix[i % to_base - 10]);
    } else { 
      Z.push(i % to_base);
    } 
    M = M + 1;
  } 
  console.log(Z)
  return Z.reverse().join(" - ")
  // for (j = M; j >= 0; j--) {
  //   document.write(Z[j]);
  // } 
}

function App() {
  let [index, setIndex] = React.useState(1);
  let [base1, setBase1] = React.useState(1);
  let [base2, setBase2] = React.useState(1);

  function updateData(value){
    if(value>1){
      setIndex(value);
      setBase1(convertBase10toX(value, 20))
      setBase2(convertBase(''+value, 10, 20))
    }
  }
  let base200_1 = convertBase10toX(index, 20);
  let base200_2 = 23;
  return (
    <div className="App">
      <div className="input-group centered">
        <input id="a11y-input3"
        aria-labelledby="#a11y-input3"
        tabIndex="1"
        type="number"
        onChange = {e=>updateData(parseInt(e.target.value))}
        required/>
        <span className="bar"></span>
        <label htmlFor="a11y-input3">index</label>
      </div>

      <h2>{index}</h2>
      <h2>{base1}</h2>
      <h2>{base2}</h2>


    </div>
  );
}

export default App;
