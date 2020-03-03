// https://www.danvk.org/hex2dec.html

let convertBase2 = (value, from_base, to_base, range) => {
    if(!range){
      range = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split("");
    }
    if (from_base < 2 || from_base > range.length)
        throw new RangeError(`convertBase() from_base argument must be between 2 and ${range.length}`);
    if (to_base < 2 || to_base > range.length)
        throw new RangeError(`convertBase() to_base argument must be between 2 and ${range.length}`);
    let from_range = range.slice(0, from_base);
    let to_range = range.slice(0, to_base);
    
    let dec_value = value.split("").reverse().reduce((carry, digit, index) => {
        let fromIndex = from_range.indexOf(digit);
        if (fromIndex === -1)
            throw new Error(`Invalid digit ${digit} for base ${from_base}.`);
        return carry + fromIndex * Math.pow(from_base, index);
    }, 0);
    
    let new_value = "";
    while (dec_value > 0) {
        new_value = to_range[dec_value % to_base] + new_value;
        dec_value = (dec_value - dec_value % to_base) / to_base;
    }
    return new_value || "0";
};


// https://stackoverflow.com/a/55011290
function convertBase(str, fromBase, toBase) {

    const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";

    const add = (x, y, base) => {
        let z = [];
        const n = Math.max(x.length, y.length);
        let carry = 0;
        let i = 0;
        while (i < n || carry) {
            const xi = i < x.length ? x[i] : 0;
            const yi = i < y.length ? y[i] : 0;
            const zi = carry + xi + yi;
            z.push(zi % base);
            carry = Math.floor(zi / base);
            i++;
        }
        return z;
    }

    const multiplyByNumber = (num, x, base) => {
        if (num < 0) return null;
        if (num == 0) return [];

        let result = [];
        let power = x;
        while (true) {
            num & 1 && (result = add(result, power, base));
            num = num >> 1;
            if (num === 0) break;
            power = add(power, power, base);
        }

        return result;
    }

    const parseToDigitsArray = (str, base) => {
        const digits = str.split('');
        let arr = [];
        for (let i = digits.length - 1; i >= 0; i--) {
            const n = DIGITS.indexOf(digits[i])
            if (n == -1) return null;
            arr.push(n);
        }
        return arr;
    }

    const digits = parseToDigitsArray(str, fromBase);
    if (digits === null) return null;

    let outArray = [];
    let power = [1];
    for (let i = 0; i < digits.length; i++) {
        digits[i] && (outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase));
        power = multiplyByNumber(fromBase, power, toBase);
    }

    let out = '';
    for (let i = outArray.length - 1; i >= 0; i--)
        out += DIGITS[outArray[i]];

    return out;
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


export {convertBase, convertBase2};
