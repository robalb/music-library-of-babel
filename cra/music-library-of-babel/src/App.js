import React from 'react';
import logo from './logo.svg';
import {Flow} from 'vexflow';

import getNotesPermutations from './scripts/getNotesPermutations.js';
import { convertBase2, convertBase } from './scripts/convertBase.js';

console.log("--BEGIN TESTING--")

function test(string, baseFrom, baseTo, radix){
  let converted = convertBase(string, baseFrom, baseTo, radix)
  let reconverted = convertBase(converted, baseTo, baseFrom, radix)
  console.log({
    string: string,
    converted: converted,
    reconverted: reconverted,
    equal: string.localeCompare(reconverted) == 0 ? "PASSED" : "failed"
  })
}


test("5a2a9c826c75045be9ba8fbffc80c6f25a2a9c826c75045be9ba8fbffc80c6f2", 16, 54, '')
test("5a2a9c826c75045be9ba8fbffc80c6f25a2a9c826c75045be9ba8fbffc80c6f2", 16, 3, '')

console.log("--END TESTING--")

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

    let beams = VF.Beam.generateBeams(notes);
    VF.Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach(function(b) {b.setContext(context).draw()})


  });
  // }, [index]);

  function updateData(value){
    if(value>1){
      setIndex(value);
      console.log(index)
      value = String(value)
      let baseX = convertBase(value, 10, 20)
      console.log(baseX)
      console.log(convertBase(String(baseX), 20, 10))
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
