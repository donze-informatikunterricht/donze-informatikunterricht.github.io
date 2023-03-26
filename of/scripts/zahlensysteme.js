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

function build_system() {

    let surroundingDivElement = document.getElementById("general_n_adic");

    // remove content if existing
    let existingElement = document.getElementById("n_adic_content");
    if (existingElement) {
        existingElement.remove();
    }

    // Validate Input
    let chosenBase = parseInt(document.getElementById("n_choice").value);
    console.log("chosenBase:", chosenBase)
    if (!chosenBase || chosenBase < 2 || chosenBase > 36) {
        alert("Basis ungültig.")
        document.getElementById("n_choice").value = 2;
        return;
    }

    // surrounding div element
    let contentDivElement = document.createElement("div");
    contentDivElement.id = "n_adic_content";
    surroundingDivElement.appendChild(contentDivElement);


    let h3Element = document.createElement("h3");
    h3Element.innerHTML = chosenBase + "-er System"
    contentDivElement.appendChild(h3Element);
    let tableElement = document.createElement("table");
    tableElement.id = "system_table";
    let firstRowElement = document.createElement("tr");
    let firstRowTitleElement = document.createElement("th");
    firstRowTitleElement.innerHTML = "Stellenwert (Potenz):";
    firstRowElement.appendChild(firstRowTitleElement);
    for (let stelle = 7; stelle >= 0; stelle--) {
        let thElement = document.createElement("th");
        thElement.innerHTML = chosenBase;
        let supElement = document.createElement("sup")
        supElement.innerHTML = stelle;
        thElement.appendChild(supElement);
        firstRowElement.appendChild(thElement);
    }
    let thElement = document.createElement("th");
    thElement.innerHTML = "Dezimalzahl";
    firstRowElement.appendChild(thElement);
    tableElement.appendChild(firstRowElement);
    contentDivElement.appendChild(tableElement);

    let secondRowElement = document.createElement("tr")
    let secondRowTitleElement = document.createElement("td");
    secondRowTitleElement.innerHTML = "Stellenwert (dezimal):";
    secondRowElement.appendChild(secondRowTitleElement);
    for (let stelle = 7; stelle >= 0; stelle--) {
        let tdElement = document.createElement("td");
        tdElement.innerHTML = parseInt(chosenBase) ** stelle;
        tdElement.id = "stellenwert" + stelle;
        secondRowElement.appendChild(tdElement);
    }
    tableElement.appendChild(secondRowElement);

    let thirdRowElement = document.createElement("tr")
    let thirdRowTitleElement = document.createElement("td");
    thirdRowTitleElement.innerHTML = "Stellen:";
    thirdRowElement.appendChild(thirdRowTitleElement);
    for (let stelle = 7; stelle >= 0; stelle--) {
        let tdElement = document.createElement("td");
        tdElement.id = "stelle" + stelle;
        // if (stelle < 7) {
        //     tdElement.innerHTML = "+ 0";
        // } else {
        tdElement.innerHTML = 0;
        // }
        thirdRowElement.appendChild(tdElement);
    }
    tableElement.appendChild(thirdRowElement);

    let fourthRowElement = document.createElement("tr")
    let fourthRowTitleElement = document.createElement("td");
    fourthRowTitleElement.innerHTML = "Addition:";
    fourthRowElement.appendChild(fourthRowTitleElement);
    for (let stelle = 7; stelle >= 0; stelle--) {
        let tdElement = document.createElement("td");
        tdElement.id = "stelle_calc" + stelle;
        if (stelle < 7) {
            tdElement.innerHTML = "+ 0";
        } else {
            tdElement.innerHTML = 0;
        }
        fourthRowElement.appendChild(tdElement);
    }
    let tdElement2 = document.createElement("td");
    tdElement2.id = "corresponding_decimal";
    tdElement2.innerHTML = "= 0";
    fourthRowElement.appendChild(tdElement2);
    tableElement.appendChild(fourthRowElement);

    let fifthRowElement = document.createElement("tr")
    let fifthRowTitleElement = document.createElement("td");
    fifthRowTitleElement.innerHTML = "Ziffern";
    fifthRowElement.appendChild(fifthRowTitleElement);
    for (let stelle = 7; stelle >= 0; stelle--) {
        let tdElement = document.createElement("td");
        let selectElement = document.createElement("select")
        selectElement.name = "ziffer";
        selectElement.id = "zifferSelect" + stelle;
        if (parseInt(chosenBase) < 10) {
            for (let ziffer = 0; ziffer < chosenBase; ziffer++) {
                let optionElement = document.createElement("option");
                optionElement.value = ziffer;
                optionElement.text = ziffer;
                selectElement.appendChild(optionElement);
            }
        } else {
            for (let ziffer = 0; ziffer < 10; ziffer++) {
                let optionElement = document.createElement("option");
                optionElement.value = ziffer;
                optionElement.text = ziffer;
                selectElement.appendChild(optionElement);
            }
            let biggerDigits = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            for (let i = 0; i < chosenBase - 10; i++) {
                let optionElement = document.createElement("option");
                optionElement.value = 10 + i;
                optionElement.text = biggerDigits[i];
                selectElement.appendChild(optionElement);
            }
        }
        tdElement.appendChild(selectElement);
        selectElement.addEventListener('change', updateNadicNumber);
        fifthRowElement.appendChild(tdElement);

    }
    tableElement.appendChild(fifthRowElement);
}

function updateNadicNumber(e) {
    let selectElement = e;
    let val = e.target.value
    console.log("updating, new value", val);

    let stelle = e.target.id.replace("zifferSelect", "");
    console.log("stelle:", stelle.replace("zifferSelect", ""));
    let stellenwert = document.getElementById("stellenwert" + stelle).innerHTML;
    console.log("stellenwert", stellenwert);

    let elToUpdate = document.getElementById("stelle" + stelle)
    // Rechnung aus 
    let elToUpdate2 = document.getElementById("stelle_calc" + stelle)

    if (stelle < 7) {
        elToUpdate.innerHTML = val + "*" + stellenwert;
        elToUpdate2.innerHTML = "+" + String(val * stellenwert);
    } else {
        elToUpdate.innerHTML = val;
        elToUpdate2.innerHTML = val * stellenwert;
    }
    let summe = 0;

    for (let stelle = 0; stelle < 8; stelle++) {
        let anzahln = parseInt(document.getElementById("zifferSelect" + stelle).value);
        console.log(stelle + "anzahl:", anzahln);
        let stellenwertn = document.getElementById("stellenwert" + stelle).innerHTML;
        console.log(stelle + "stellenwert:", stellenwertn);
        summe += anzahln * stellenwertn;
    }

    let corresponding_decimalElement = document.getElementById("corresponding_decimal");
    corresponding_decimalElement.innerHTML = "= " + summe;
}