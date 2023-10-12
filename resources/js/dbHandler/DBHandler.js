let URLAPISERVER ="";

function setURL(){
if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
{

  URLAPISERVER = "http://localhost:5500"
  return;
}
  URLAPISERVER = "https://apiserver-production-05de.up.railway.app"
}



function getSaveObject() {


  const urlLocal = `${URLAPISERVER}/saves`;
  // const urlLocal = "http://localhost:5500/saves";
  // const urlLocal = "https://dv9sdcgg-5500.euw.devtunnels.ms/saves";

  console.log(urlLocal);


  fetch(urlLocal)
    .then(response => {
      // {
      //handle response            
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json()
    })


    .then(data => {
      //handle data

      // console.log(data);
      handleSavedAllJson(data, 0);
      // console.log(`savesObjectsArray in fetch`);
      // console.log(savesObjectsArray);  
    })

    .catch(error => {
      //handle error

      console.log("im here error!");
      throw new Error(`HTTP error: ${error}`);
    });

};


function getSaveExistenceFromDB(jsonObjectToSave) {
  //check if same name excist in list
  //check if same name excist in db? findone
  //fetch post  to db
  
  if (!jsonObjectToSave || !jsonObjectToSave.savename) {
    console.error("Invalid jsonObjectToSave:", jsonObjectToSave);
    return; // Exit early if jsonObjectToSave is not valid
  }


  console.log(jsonObjectToSave);

  const savenameValue = jsonObjectToSave["savename"];
// console.log(savenameValue);

console.log("array");
console.log(savesObjectsArray);
console.log("sabenamevalue");
console.log(savenameValue);

  const existsInClientCollection = savesObjectsArray.some(item => item['save-name'] === savenameValue);

  const urlLocal = `${URLAPISERVER}/getsave/${savenameValue}`;
  // const urlLocal = `http://localhost:5500/getsave/${savenameValue}`;
  // const urlLocal = `http://127.0.0.1:5500/getsave/${savenameValue}`;

  console.log(urlLocal);
  console.log(existsInClientCollection);

  if (!existsInClientCollection) {




    console.log(urlLocal);
    fetch(urlLocal)
      .then(response => {
        // {
        //handle response            
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })

      .then(data => {
        //handle data
        if (data.exists) {
          console.log("data");
          console.log(data);
          console.log(`Object with save-name ${savenameValue} exists.`);
        } else {
          console.log("data");
          console.log(data); 
          console.log(`Object with save-name "${savenameValue}" does not exist.`);

          savesObjectsArray.unshift(jsonObjectToSave);
          let AddOptNew = new Option(savenameValue, customerSaves.options.length);
          // console.log("AddOpt");
          // console.log(AddOptNew);
          customerSaves.prepend(AddOptNew);
          // console.log("savesObjectsArray");
          // console.log(savesObjectsArray);
          // alert(JSON.stringify(jsonObjectToSave));
          console.log("jsonObjectToSave")
          console.log(jsonObjectToSave)
          getSaveToDB(jsonObjectToSave);

        }
      })

      .catch(error => {
        //handle error

        console.log("im here error!");
        throw new Error(`HTTP error: ${error}`);
      });

  }
  if (existsInClientCollection) {
    alert(`Object with save-name "${savenameValue}" already exists.`);
  }
}



function getSaveToDB(jsonObjectToSave) {
const urlLocal = `${URLAPISERVER}/saves`;
  

console.log(JSON.stringify(jsonObjectToSave));

  
fetch(urlLocal, {
  method: "POST",
  // mode: "cors",
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
  body: JSON.stringify(jsonObjectToSave),//why only savename into db??
})
.then(response => {
  // {
  //handle response            
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
})
.then (data =>{
console.log(`saved worked? : ${data}`);

})
  .catch(error => {
    //handle error

    console.log("im here error!");
    throw new Error(`HTTP error: ${error}`);
  });
}




