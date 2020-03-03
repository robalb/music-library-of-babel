import React from 'react';
import logo from './logo.svg';
import {Flow} from 'vexflow';

// https://gist.github.com/ryansmith94/91d7fd30710264affeb9
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



/*
* expected values:
*  "c/4/16/0/0"
*  "c/4/16/0/1"
*  "c/4/16/1/0"
*  "c/4/16/1/1"
*  "c/4/8/0/0"
*  ...
*  "b/5/2/1/1"
*
* permutation calc
* (expected length)
* 12 * 2 * 4 * 2 * 2 = 384 
*/
function getNotesPermutations(){
  //note combinations
  let weights = [
    ["4", "5"], //octave
    ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"],
    ["16", "8", "4", "2"], //duration
    [0, 1], //is dotted
    [0, 1] //is rest
  ]

  let output = [];

  for(let octave of weights[0]){
    for(let note of weights[1]){
      for(let duration of weights[2]){
        for(let isDotted of weights[3]){
          for(let isRest of weights[4]){
            output.push( [note, octave, duration, isDotted, isRest].join("/") )
          }
        }
      }
    }
  }

  return output;
}
console.log(getNotesPermutations())


function App() {
  let [index, setIndex] = React.useState(1);
  let [base1, setBase1] = React.useState(1);
  let [base2, setBase2] = React.useState(1);
  let [toDecimal, setToDecimal] = React.useState(1);

  let noteContainerRef = React.createRef();

  React.useEffect(()=>{
    let div = document.getElementById("boo")
    let VF = Flow;
    let renderer = new VF.Renderer(noteContainerRef.current, VF.Renderer.Backends.SVG);
    // Configure the rendering context.
    renderer.resize(420, 120);
    let context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    let stave = new VF.Stave(8, 0, 400);
    stave.setEndBarType(VF.Barline.type.DOUBLE);
    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();


    let rndIndex = Math.floor(Math.random()*300)
    let notes = getNotesPermutations().slice(rndIndex, rndIndex+10)
    console.log(notes)
    notes = notes.map(note => {
      //parse note format
      let [letterAndAcc, octave, duration, isDotted, isRest] = note.split("/")
      if(isRest === "1") duration += "r";
      //generate note
      let generated = new VF.StaveNote({
        clef: "treble",
        keys: [`${letterAndAcc}/${octave}`],
        duration: duration
      });
      if(isDotted === "1"){
        generated.addDotToAll();
      }

      return generated;
    });

    console.log(notes)
    let beams = VF.Beam.generateBeams(notes);
    VF.Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach(function(b) {b.setContext(context).draw()})


  });
  // }, [index]);

  function updateData(value){
    if(value>1){
      setIndex(value);
      // setBase1(convertBase10toX(value, 20))
      // setBase2(convertBase(''+value, 10, 20))

      // setToDecimal(convertBase(base2, 20, 10))
    }
  }
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

      <h2><span>decimal</span> {index}</h2>
      <h2><span>tobase</span> {base1}</h2>
      <h2><span>tobase</span> {base2}</h2>
      <h2><span>back to decimal</span> {toDecimal}</h2>

      <div className="noteContainer" ref={noteContainerRef}></div>


    </div>
  );
}

export default App;
