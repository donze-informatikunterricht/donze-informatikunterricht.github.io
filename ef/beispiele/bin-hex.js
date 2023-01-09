"use strict";

function updateNumber(id) {
    let elementBin = document.getElementById(id);
    let bitNo = Number(id.substr(id.length - 1, 1));
    console.log("bitNo", bitNo);
    elementBin.classList.toggle("active");
    elementBin.innerHTML = elementBin.classList[0] == "active" ? "1" : "0";
    let elementDig = document.getElementById("digit" + bitNo);
    elementDig.innerHTML = Number(elementBin.innerHTML) * 2 ** bitNo;
    let elementBinBit = document.getElementById("binBit" + bitNo);
    elementBinBit.innerHTML = elementBin.innerHTML;
    showBinaryNumber();
    convertToDigital();
    convertToHex();
}

function showBinaryNumber() {
    let binaryNumber = "";
    for (let bitNo = 7; bitNo >= 0; bitNo--) {
        binaryNumber += document.getElementById("bit" + bitNo).innerHTML;
    }
    let binaryNumberElement = document.getElementById("binaryNumber");
    binaryNumberElement.innerHTML = binaryNumber;
}

function convertToDigital() {
    let decimalNumber = 0;
    for (let bitNo = 0; bitNo < 8; bitNo++) {
        decimalNumber += Number(document.getElementById("digit" + bitNo).innerHTML);
    }
    let decimalNumberElement = document.getElementById("decimalNumber");
    decimalNumberElement.innerHTML = decimalNumber;
}

function convertToHex() {
    // take the value calculated by showBinaryNumber()
    let binNumber = document.getElementById("binaryNumber").innerHTML;
    let decimalNumber = document.getElementById("decimalNumber").innerHTML;
    let hexNumber = parseInt(binNumber, 2).toString(16).toUpperCase();
    let hexNumberElement = document.getElementById("hexNumber");
    hexNumberElement.innerHTML = hexNumber;//binaryNumber.toString(2).toUpperCase();
    let hex1Element = document.getElementById("hex1");
    let hex0Element = document.getElementById("hex0");
    if (decimalNumber > 15) {
        hex1Element.innerHTML = hexNumber[0];
        hex0Element.innerHTML = hexNumber[1];
    } else {
        hex1Element.innerHTML = 0;
        hex0Element.innerHTML = hexNumber;
    }
}
