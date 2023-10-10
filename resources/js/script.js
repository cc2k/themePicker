

const reset = document.getElementById("resetValue");
const pcsBgColorButton = document.getElementById("pcsBgColorButton");
const pcsTxtColorButton = document.getElementById("pcsTxtColorButton");

const normalColors = document.getElementById('normal-colors');
const invertedColors = document.getElementById('inverted-colors');

//bg1wheel + bg2wheel
const backgroundColorpicker = document.getElementById('backgroundcolorpicker');
const backgroundInvertedColorpicker = document.getElementById('backgroundcolorinvertedpicker');

//bg1hex + bg2hex
const normalBackgroundHex = document.getElementById('backgroundhexinput');
const invertedBackgroundHex = document.getElementById('backgroundhexinvertedinput');

//text1wheel + text2wheel
const textColorpicker = document.getElementById('textcolorpicker');
const textColorInvertedpicker = document.getElementById('textcolorinvertedpicker');

//text1hex + text2hex
const normalTextHex = document.getElementById('texthexinput');
const invertedTextHex = document.getElementById('texthexinvertedinput');

//bg1p + bg2p
const bg1p = document.getElementById('backgroundtext');
const bg2p = document.getElementById('invertedbackground');

//text1p + text2p
const text1p = document.getElementById('normaltextcolor');
const text2p = document.getElementById('invertedbackgroundtext');

const fontsInput = document.getElementById("fonts");
const fontsSizeElement = document.getElementById("fonts-size");
const textToChange = document.getElementById("text-to-change");
const textToChangeInverted = document.getElementById("text-to-change-inverted");
let fontSize = window.getComputedStyle(textToChange).fontSize;


const customerSavesTxt = document.getElementById("add-save-customer")
const customerSavesbtn = document.getElementById("add-save-customor-btn")
const customerSaves = document.getElementById("customer-saves");

//text selected save
const textSaveName = document.getElementById("save-name")
const textSaveSize = document.getElementById("save-size")
const textSaveBackgroundColor = document.getElementById("save-backgroundcolor")
const textSaveTextColor = document.getElementById("save-textcolor")
const textSaveFamily = document.getElementById("save-textfamily")
const textSaveID = document.getElementById("save-id")
const textSaveCreated = document.getElementById("save-created")
const textSaveUpdated = document.getElementById("save-updated")

//customers color codes
const pcsColorFuscia = "#D9027D";



fontSize = 16;
fontsSizeElement.value = fontSize;

let savesObjectsArray = [];
/*what needs to be in the theme object
- text color
- textsize
- text family
- background color
- save-name
*/
// let themeObject = {
//   // '_id': "64kakrioaltest",
//   'savename': "test save",
//   'textsize': 20,
//   'text-family': "",
//   'text-color': "#095jks",
//   'background-color': "#mna674",
//   'createdAt': "2023-07-30T23:55:55.674Z",
//   'updatedAt': "2023-07-30T23:55:55.674Z",
//   // '__v': 0
// }

let saveCurrent = { };
// let saveCurrent = { ...themeObject };
// console.log(saveCurrent);
// savesObjectsArray.push(saveCurrent);
// console.log("savesObjectsArray");
// console.log(savesObjectsArray);
// console.log("next");


window.onload = function () {

  getSaveObject();




  backgroundColorpicker.addEventListener('change', function () { passValuePickerToParam(0, backgroundColorpicker.value); }, false);

  textColorpicker.addEventListener('change', function () { passValuePickerToParam(1, textColorpicker.value); }, false);

  pcsBgColorButton.addEventListener('click', function () { passValuePickerToParam(2, pcsColorFuscia); }, false);

  pcsTxtColorButton.addEventListener('click', function () { passValuePickerToParam(3, pcsColorFuscia); }, false);

  reset.addEventListener('click', function () { passValuePickerToParam(4, null); }, false);

  normalBackgroundHex.addEventListener('keydown', function (event) { checkForEnter(event, 2, this.value); }, false);

  normalTextHex.addEventListener('keydown', function (event) { checkForEnter(event, 3, this.value); }, false);

  fontsSizeElement.addEventListener('input', function () { changeFontSize(this.value); }, false);

  customerSavesTxt.addEventListener('keydown', function (event) {
    console.log(`value listener: ${customerSavesTxt.value} `);
    checkForEnter(event, 5, this.value);
  }, false);

  customerSavesbtn.addEventListener('click', function (event) {
    console.log(`value listener: ${customerSavesTxt.value} `);
    checkForEnter(event, true, customerSavesTxt.value);
  }, false);



};//window on load end

customerSaves.addEventListener('change', function () {
  const index = customerSaves.selectedIndex;
  console.log("index: " + index);
  const valueTxt = customerSaves.options[customerSaves.selectedIndex].value

  console.log("valuetxt should be savename: " + valueTxt);
  console.log(savesObjectsArray);

  textSaveName.textContent = `Savename: ${savesObjectsArray[index].savename}`;
  textSaveSize.textContent = `Text Size: ${savesObjectsArray[index]['text_size']}`;
  textSaveFamily.textContent = `Text family: ${savesObjectsArray[index]['text_family']}`;
  textSaveBackgroundColor.textContent = `Backgroundcolor: ${savesObjectsArray[index]['background_color']}`;
  textSaveTextColor.textContent = `Textcolor: ${savesObjectsArray[index]['text_color']}`;
  textSaveID.textContent = `ID: ${savesObjectsArray[index]._id}`;
  textSaveCreated.textContent = `Created: ${savesObjectsArray[index].createdAt}`;
  textSaveUpdated.textContent = `Updated: ${savesObjectsArray[index].updatedAt}`;


});



$(function () {
  $('#fonts').fontselect().change(function () {
    // replace + signs with spaces for css
    var font = $(this).val().replace(/\+/g, ' ');

    // split font into family and weight
    font = font.split(':');

    // set family on paragraphs
    $('p').css('font-family', font[0]);
  });
});

//-------------------------



function passValuePickerToParam(modeTochoice, value) {
  switch (modeTochoice) {
    case 0:
      changeBackgroundcolorFromPicker(value);
      // console.log(value);
      break;
    case 1:
      changeTextcolorFromPicker(value);
      // console.log(value);
      break;
    case 2:
      backgroundColorpicker.value = value;
      changeBackgroundcolorFromPicker(value);
      break;
    case 3:
      textColorpicker.value = value;
      changeTextcolorFromPicker(value);
      break;
    case 4:
     resetTheme();
      break;
    case 5:
      // console.log(saveCurrent);
      const jsonObject = { };
      // const jsonObject = { ...themeObject };
      console.log((`json`));
      console.log(jsonObject);

      // console.log(`value: ${value}`);
      jsonObject["savename"] = value;
      jsonObject["background_color"] = backgroundColorpicker.value.replace("#", "");;
      jsonObject["text_color"] = textColorpicker.value.replace("#", "");
      // jsonObject["text-family"] = textToChange.value;//not working yet
      jsonObject["text_size"] = fontsSizeElement.value;
      // jsonObject.__v = null;
      // jsonObject._id = null;
      // jsonObject.createdAt = null;
      // jsonObject.updatedAt = null;

      console.log("jsonObject before handle:");
      console.log(jsonObject);

      handleSavedAllJson(jsonObject, 1);

      break;

  }
};



function changeBackgroundcolorFromPicker(value) {
  const hex = value;

  normalColors.style.backgroundColor = hex;
  backgroundColorpicker.value = hex; //needed??
  normalBackgroundHex.value = hex;


  textColorInvertedpicker.value = hex;
  textToChangeInverted.style.color = hex;
  invertedTextHex.value = hex;

  bg2p.style.color = hex;
  text2p.style.color = hex;

};

function changeTextcolorFromPicker(value) {
  const hex = value;

  invertedColors.style.background = hex;
  backgroundInvertedColorpicker.value = hex;
  invertedBackgroundHex.value = hex;

  textColorpicker.value = hex;
  normalTextHex.value = hex;

  text1p.style.color = hex;
  bg1p.style.color = hex;
  textToChange.style.color = hex;
};

function checkForEnter(event, modeToChose, valueToPass) {
  let key = event.keyCode || event.which || event.key;

  // console.log("key:" + key);
  // console.log("value: "+valueToPass);
  // console.log("mode: "+modeToChose);
  // console.log("mode: "+Boolean(modeToChose));

  if (modeToChose === true) {key = 13;}
  const pass = ((key === 13 || key === "Enter") && (valueToPass));

  // console.log("pass value: "+pass);

  if (modeToChose && pass) return passValuePickerToParam(5, valueToPass);

  if ((modeToChose === 5) && pass) return passValuePickerToParam(modeToChose, valueToPass);


  console.log("failed enter check");
};

function changeFontSize(value) {
  // console.log("value: "+value);
  textToChange.style.fontSize = value + "px";
  textToChangeInverted.style.fontSize = value + "px";
};

function handleSavedAllJson(data, toDB) {
  // toDB =1;
  // console.log("toDB");
  // console.log(data);


  if (toDB == 0) {
// console.log(savesObjectsArray);
    for (let index = 0; index < data.length; index++) {

      // if (index === 0) {
      //   let AddOpt = new Option(savesObjectsArray[index].savename, index);
      //   // console.log(AddOpt);
      //   customerSaves.appendChild(AddOpt);
      // }

      // if (index !== 0) {
        // console.log(data);
        // console.log(index);
        // console.log(data[index]);

        const element = data[index];
        // const element = data[index - 1];

        // console.log(" handle , option 0");
        // console.log(savesObjectsArray);
        // console.log(element);
        savesObjectsArray.push(element);

        // let AddOpt = new Option(element.savename, index);
        // // console.log(AddOpt);
        // customerSaves.appendChild(AddOpt);
      // }



      updateCustomerSavesSelect();

    }
  }

  if (toDB === 1) 
  {
    getSaveExistenceFromDB(data); 
  }
}

function updateCustomerSavesSelect() {
  // Clear existing options
  customerSaves.innerHTML = "";
  savesObjectsArray.forEach((item, index) => {
    let AddOptNew = new Option(item.savename, index);
    customerSaves.appendChild(AddOptNew);
  });
}


function resetTheme(){
  backgroundColorpicker.value = "#ffffff";
  textColorpicker.value = "#000000";
  textToChange.style.fontSize = "16px";
  textToChangeInverted.style.fontSize = "16px";
  fontsSizeElement.value = 16;
  // textToChange.style.fontFamily = "Times new Roman";
  // textToChangeInverted.style.fontFamily = "Times New Roman";
  textToChangeInverted.style.color = "#ffffff"
  // fontsInput.ariaPlaceholder = "Times new Roman";


  // Manually set the font selection to "Times New Roman"
  fontsInput.value = "Times New Roman";

  // Trigger a change event on the fonts select element
  $('#fonts').change();


  changeBackgroundcolorFromPicker("#ffffff");
  changeTextcolorFromPicker("#000000");
}
