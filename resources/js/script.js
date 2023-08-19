
//fontpickerr ----------------------

window.onload = function () {
  //YOUR JQUERY CODE
  $('#font').fontselect();


  backgroundColorpicker.addEventListener('change', function () { passValuePickerToParam(0, backgroundColorpicker.value); }, false);

  textcolorpicker.addEventListener('change', function () { passValuePickerToParam(1, backgroundColorpicker.value); }, false);

  pcsBgColorButton.addEventListener('click', function () { passValuePickerToParam(2, pcsColorFuscia); }, false);

  pcsTxtColorButton.addEventListener('click', function () { passValuePickerToParam(3, pcsColorFuscia); }, false);

  reset.addEventListener('click', function () { passValuePickerToParam(4, null); }, false);

  normalBackgroundHex.addEventListener('keydown', function () { checkForEnter(2, this.value); }, false);

  normalTextHex.addEventListener('keydown', function () { checkForEnter(3, this.value); }, false);

}

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


function passValuePickerToParam(pickerTochoice, value) {
  switch (pickerTochoice) {
    case 0:
      changeBackgroundcolorFromPicker(value);
      console.log(value);
      break;
    case 1:
      changeTextcolorFromPicker(value);
      console.log(value);
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
      backgroundColorpicker.value = "#ffffff";
      textColorpicker.value = "#000000";
      changeBackgroundcolorFromPicker("#ffffff");
      changeTextcolorFromPicker("#000000");
      break;
  }
}

const pcsColorFuscia = "#D9027D";

function changeBackgroundcolorFromPicker(value) {
  const hex = value;

  normalColors.style.backgroundColor = hex;
  backgroundColorpicker.value = hex; //needed??
  normalBackgroundHex.value = hex;

  textColorInvertedpicker.value = hex;
  invertedTextHex.value = hex;

  bg2p.style.color = hex;
  text2p.style.color = hex;
}

function changeTextcolorFromPicker(value) {
  const hex = value;

  invertedColors.style.background = hex;
  backgroundInvertedColorpicker.value = hex;
  invertedBackgroundHex.value = hex;

  textColorpicker.value = hex;
  normalTextHex.value = hex;

  text1p.style.color = hex;
  bg1p.style.color = hex;
}

function checkForEnter(modeToChose, valueToPass) {
  console.log(event.keyCode + " mode:" + modeToChose + " value:" + valueToPass);

  if (event.keyCode == 13) {
    passValuePickerToParam(modeToChose, valueToPass);
  }



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

}

