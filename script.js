let addbtnContainer = document.querySelector(".add_sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
let fontBtn = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
let allAlignBtns = document.querySelectorAll(".alignment-container>input");
let sheetDB = workSheetDB[0];
firstSheet.addEventListener("click", handleActiveSheet);
// create sheets and add functionlities
addbtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = `Sheet ${idx + 1}`;
    // page add
    sheetList.appendChild(NewSheet);
    //  db
    // active set 
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr[sheetsArr.length - 1].classList.add("active-sheet");
    // 2 d array 
    initCurrentSheetDb();
    // /current change
    sheetDB = workSheetDB[idx];
    // cell empty 
    // new page element value empty
    initUI();
    // change sheet
    NewSheet.addEventListener("click", handleActiveSheet);
})
function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }
    //  index
    let sheetIdx = MySheet.getAttribute("sheetIdx")
        ;
    sheetDB = workSheetDB[sheetIdx - 1];
    // get data from that and set ui
    setUI(sheetDB);

}
// *****************************************************
//  address set on click of a cell 
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handleCell() {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObject = sheetDB[rid][cid];
        // styling-> set 
        // object styling set 
        // UI 
        // cell
        // boldness
        if (cellObject.bold == true) {
            boldElem.classList.add("active-btn")
        } else {
            boldElem.classList.remove("active-btn");
        }
        // alignment
        for (let i = 0; i < allAlignBtns.length; i++) {
            allAlignBtns[i].classList.remove("active-btn");
        }
        console.log(cellObject.halign);
        if (cellObject.halign == "left") {
            // left active
            leftBtn.classList.add("active-btn")
        } else if (cellObject.halign == "right") {
            rightBtn.classList.add("active-btn")
            // right active
        } else if (cellObject.halign == "center") {
            centerBtn.classList.add("active-btn")
        }
    });
}
// initial cell click emulate
Allcells[0].click();
// ************Formatting****************
leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "left";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    // db update 
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "left";
})
rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    // db update 
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "right";
})
centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "center";
})
fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    console.log(fontSize);
    cell.style.fontSize = fontSize + "px";
})
fontFamily.addEventListener("change", function () {
    // alert(fontFamily.value);
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cFont = fontFamily.value
    cell.style.fontFamily = cFont;
})
boldElem.addEventListener("click", function () {
    let isActive = boldElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text bold
        cell.style.fontWeight = "bold";
        boldElem.classList.add("active-btn");
        cellObject.bold = true
    } else {
        // cell text normal
        cell.style.fontWeight = "normal";
        boldElem.classList.remove("active-btn");
        cellObject.bold = false
    }
    // console.log(sheetDB)
})
italicElem.addEventListener("click", function () {
    let isActive = italicElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    if (isActive == false) {
        // cell text bold
        cell.style.fontStyle = "italic";
        italicElem.classList.add("active-btn");
    } else {
        // cell text normal
        cell.style.fontStyle = "normal";
        italicElem.classList.remove("active-btn");
    }
})
underlineElem.addEventListener("click", function () {
    let isActive = underlineElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    if (isActive == false) {
        // cell text bold
        cell.style.textDecoration = "underline";
        underlineElem.classList.add("active-btn");
    } else {
        // cell text normal
        cell.style.textDecoration = "none";
        underlineElem.classList.remove("active-btn");
    }
})
// ****************************************************************




// Helper function
function getRIdCIdfromAddress(adress) {
    // A1
    let cellColAdr = adress.charCodeAt(0);
    // console.log(cellColAdr);
    let cellrowAdr = adress.slice(1);
    let cid = cellColAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid };

}
function initUI() {
    for (let i = 0; i < Allcells.length; i++) {
        // boldness
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily = "Arial";
        Allcells[i].style.fontSize = "10px";
        Allcells[i].style.textAlign = "left";
        Allcells[i].innerText = "";
    }
}
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("blur", function handleCell() {
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        let cellObject = sheetDB[rid][cid];
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        cellObject.value = cell.innerText;
    });
}
function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, fontFamily, fontSize, halign, value } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.innerText = value;
        }
    }
}


// let addbuttonContainer = document.querySelector(".add_sheet_container");
// let sheetList = document.querySelector(".sheets-list");
// let firstSheet = document.querySelector(".sheet");
// let Allcells = document.querySelectorAll(".grid .col");
// let addressBar = document.querySelector(".address-box");
// let arid = 0;
// let acid = 0;
// let affectedcell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
// // addressBar.value = address;



// ////////////////////////// alignement buttons events//////////////////////////////////////////
// let alignmentbtns = document.querySelectorAll(".alignment-container .align-btn")
// for (let i = 0; i < alignmentbtns.length; i++) {
//     alignmentbtns[i].addEventListener("click", function d() {
//         // console.log("hello")

//         console.log(alignmentbtns[i].classList[1]);
//         // console.log()
//         let rid = Number(addressBar.getAttribute("rid"));
//         let cid = Number(addressBar.getAttribute("cid"));
//         arid = rid;
//         acid = cid;

//         let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
//         cell.style.textAlign = alignmentbtns[i].classList[1]
//     })
// }
// firstSheet.addEventListener("click", handleActiveSheet);
// addbuttonContainer.addEventListener("click", function() {
//     console.log("hello");
//     let sheetArr = document.querySelectorAll(".sheet");
//     let lastSheetElem = sheetArr[sheetArr.length - 1];
//     let idx = lastSheetElem.getAttribute("sheetIdx");
//     idx = Number(idx);
//     let NewSheet = document.createElement("div");
//     NewSheet.setAttribute("class", "sheet");
//     NewSheet.setAttribute("sheetIdx", idx + 1);
//     NewSheet.innerText = ` Sheet ${ idx + 1 }`;
//     sheetList.appendChild(NewSheet);
//     NewSheet.addEventListener("click", handleActiveSheet);
// })

// function handleActiveSheet(e) {
//     let MySheet = e.currentTarget;
//     let sheetsArr = document.querySelectorAll(".sheet");
//     sheetsArr.forEach(function(sheet) {
//         sheet.classList.remove("active-sheet");
//     })
//     if (!MySheet.classList[1]) {
//         MySheet.classList.add("active-sheet");
//     }
// }


// //--------------------------- select event for cells ------------------------------//
// for (let i = 0; i < Allcells.length; i++) {
//     Allcells[i].addEventListener("click", function handleCell() {
//         let rid = Number(Allcells[i].getAttribute("rid"));
//         let cid = Number(Allcells[i].getAttribute("cid"));
//         let rowAdd = rid + 1;
//         let colAdd = String.fromCharCode(cid + 65);
//         let address = colAdd + rowAdd;
//         addressBar.value = address;
//         addressBar.setAttribute("rid", rid);
//         addressBar.setAttribute("cid", cid);
//         acid = cid;
//         arid = rid;
//         let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
//         afffectedcell = cell;
//     });
// }
// Allcells[0].click();



// //>>>>>>>>>>>>>>>>>>>>>font family drop down event management<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// let fontfamilyselect = document.querySelector(".font-family");
// fontfamilyselect.addEventListener("change", function() {
//     console.log(fontfamilyselect.value);
//     let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
//     console.log(cell.getAttribute("rid"));
//     cell.style.fontFamily = fontfamilyselect.value;
//     console.log("font-family changed");
// })

// //>>>>>>>>>>>>>>>>>>>>>font size drop down event management<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// let fontsizeselect = document.querySelector(".font-size");
// fontsizeselect.addEventListener("change", function() {
//     let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
//     console.log(cell.getAttribute("rid"));
//     cell.style.fontSize = fontsizeselect.value + "px";
//     console.log("font-size changed");
// })


// //>>>>>>>>>>>>>>>>>>>>>>>>>>>colour container<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// let colourselect = document.querySelector("#color");
// colourselect.addEventListener("change", function() {
//     let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
//     cell.style.color = colourselect.value;

// })




// //>>>>>>>>>>>>>>>>>>>>>>>>>>>background  colour container<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// let bgcolourselect = document.querySelector("#bg-color");
// bgcolourselect.addEventListener("change", function() {
//     let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
//     cell.style.backgroundColor = bgcolourselect.value;

// })

// //-------------------------------Font-Weight------------------------------------------------

// let bold = document.querySelector(".bold");
// bold.addEventListener("click",function(){
//     let cell = document.querySelector(`.col[rid="${arid}"][cid="${acid}"]`);
//     if(cell.style.fontWeight == "bold"){
//         cell.style.fontWeight = "none";
//     }
//     else{
//         cell.style.fontWeight = "bold";
//     }
    
// })

// let italic = document.querySelector(".italic");
// italic.addEventListener("click",function(){
//     let cell = document.querySelector(`.col[rid="${arid}"][cid="${acid}"]`);
//     if(cell.style.fontStyle == "italic"){
//         cell.style.fontStyle = "normal";
//     }
//     else{
//         cell.style.fontStyle = "italic";
//     }
    
// })

// let underline = document.querySelector(".underline");
// underline.addEventListener("click",function(){
//     let cell = document.querySelector(`.col[rid="${arid}"][cid="${acid}"]`);
//     if(cell.style.textDecoration == "underline"){
//         cell.style.textDecoration = "none";
//     }
//     else{
//         cell.style.textDecoration = "underline";
//     }
    
// })

