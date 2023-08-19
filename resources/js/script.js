
      //fontpickerr ----------------------

      window.onload = function() {
        //YOUR JQUERY CODE
        $('#font').fontselect();
      
      }
      
      $(function(){
        $('#fonts').fontselect().change(function(){
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

      function changeBackgroundcolorFromPicker(value) {
        const hex = value;
  
        normalColors.style.backgroundColor = hex;
        backgroundColorpicker.value = hex; //needed??
        normalBackgroundHex.value = hex;
  
        // divNormalText.style.backgroundColor = hex;
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
  
        // divNormalTextInverted.style.backgroundColor = hex;
        textColorpicker.value = hex;
        normalTextHex.value = hex;
  
        text1p.style.color = hex;
        bg1p.style.color = hex;
      }

      function checkForEnter(modeToChose, valueToPass) {
        console.log(event.keyCode +" mode:" +modeToChose+" value:"+valueToPass);
  
        if(event.keyCode == 13){
          passValuePickerToParam(modeToChose, valueToPass);
        }
      }