const BASE_URL = `https://v6.exchangerate-api.com/v6/26aca53297541a7f853d10cd/latest/USD`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for(let currCode in countryList){
        newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        
        if(select.name == "from" && currCode == "USD"){
            newOptions.selected = "selected";
        }
        else if(select.name == "to" && currCode == "INR"){
            newOptions.selected = "selected";
        }
        select.append(newOptions);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
    
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newImg;
}



btn.addEventListener("click" , async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `https://v6.exchangerate-api.com/v6/26aca53297541a7f853d10cd/latest/${fromCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];

    let finalValue = rate * amount.value;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalValue} ${toCurr.value}`;

})
