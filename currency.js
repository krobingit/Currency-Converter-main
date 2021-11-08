
async function getAllCurrencies() {
 const response = await fetch("https://api.exchangerate.host/symbols");
 const jsonCode = await response.json();

 const curr = jsonCode.symbols;
 for (var key in curr) {
  document.querySelector("#currencyListIn").innerHTML += `
           <option class="chooseIn" value="${key}">${curr[key].description}</option>
           `
  document.querySelector("#currencyListOut").innerHTML += `
           <option  class="chooseOut" value="${key}">${curr[key].description}</option>
           `
 }
}
getAllCurrencies();

async function convert(input, output, amount) {

   //To display Symbols of Currencies
const response = await fetch("./currencies.json");
   const jsonSym = await response.json();
   const curr = jsonSym.main.en.numbers.currencies;
   var inputSym = "";
   var outputSym = "";
   var nameCurrInputP = "";
   var nameCurrOutputP = "";
   var nameCurrInputS = "";
    var nameCurrOutputS = "";
      for (var key in curr)
      {

         if (key !== input)
            continue;

         else {

            inputSym = curr[key].symbol;
            nameCurrInputP = curr[key].plural;
            nameCurrInputS = curr[key].singular;
            break;
         }
   }
    for (var key in curr)
      {

         if (key !== output)
            continue;

         else {

            outputSym = curr[key].symbol;
            nameCurrOutputP = curr[key].plural;
             nameCurrOutputS = curr[key].singular;
            break;
         }
      }
   document.querySelector('.content-display').innerHTML = `Convert ${amount} "${inputSym}" ${nameCurrInputP} To  <span class="res">"${outputSym}"
 ${nameCurrOutputP}</span>`


   if (document.getElementById('currency-input').value === "")
      document.getElementById('result').innerHTML=``;
   else {
      const response = await fetch(`https://api.exchangerate.host/convert?from=${input}&to=${output}`)
      const json = await response.json();
      const singular = (json.info.rate).toFixed(4);
      const result = (amount * (json.info.rate)).toFixed(3);
      document.getElementById('result').innerHTML = `<p>${outputSym} <span class="res">${result}</span> ${nameCurrOutputP}<br>
                                               <hr>
                  ${inputSym} 1 ${nameCurrInputS} = ${outputSym} <span class="res">${singular}</span> ${nameCurrOutputS}<br><hr>
              ${inputSym} ${amount} ${nameCurrInputP} = ${outputSym} <span class="res">${result}</span> ${nameCurrOutputP}</p>`;

 }

}


function swap(){
 if (true)
 {
  let temp = document.getElementById('currency-input').value;
  document.getElementById('currency-input').value = document.getElementById('currency-output').value;
  document.getElementById('currency-output').value = temp;
 }

}

function reset() {
   document.querySelector("form").reset();

}
