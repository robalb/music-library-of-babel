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
export default function getNotesPermutations(){
  //note combinations
  let weights = [
    ["4", "5"], //octave
    ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"], //note
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
