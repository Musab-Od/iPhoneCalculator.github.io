// DOM ELEMENTS
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const valueEl = document.querySelector(".value");

const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");
const precentEl = document.querySelector(".precent");

const additionEl = document.querySelector(".addition");
const subtractionEl = document.querySelector(".subtraction");
const multiplicationEl = document.querySelector(".multiplication");
const divisionEl = document.querySelector(".division");
const equalEl = document.querySelector(".equal");

const decimalEl = document.querySelector(".decimal");
const number1El = document.querySelector(".number-1");
const number2El = document.querySelector(".number-2");
const number3El = document.querySelector(".number-3");
const number4El = document.querySelector(".number-4");
const number5El = document.querySelector(".number-5");
const number6El = document.querySelector(".number-6");
const number7El = document.querySelector(".number-7");
const number8El = document.querySelector(".number-8");
const number9El = document.querySelector(".number-9");
const number0El = document.querySelector(".number-0");
const numberElArray = [
    number0El, number1El, number2El, number3El, number4El,
    number5El, number6El, number7El, number8El, number9El
]

//Variables
let valueStrInMemory = null;
let operatorInMemory = null;

//Functions
const getValueAsStr = () => valueEl.textContent.split(",").join("");


const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
}

const setStrAsValue = (valueStr) => {
    const hasDot = valueEl.textContent.includes(".");
    if (valueStr[valueStr.length - 1] === '.') {
        if(!hasDot){
        valueEl.textContent += '.'
        }
        return;
    }
    const [wholeNumStr, decimalStr] = valueStr.split(".");
    let formattedValue = parseFloat(wholeNumStr).toLocaleString();
    if (formattedValue.length >= 12) {
        // Truncate to 9 characters
        formattedValue = formattedValue.slice(0, 9);
    }
    if (decimalStr) {
        valueEl.textContent = formattedValue + "." + decimalStr;
    } else {
        valueEl.textContent = formattedValue;
    }

    if (wholeNumStr.length > 9 ) {
        // this here is to prevent user from adding more numbers than 9 but still hasn't find a way to solve it;
    }

    let fontSizeClassLarge;
    let fontSizeClassMedium;
    let fontSizeClassSmall;
    if (formattedValue.length <= 3) {
        fontSizeClassLarge = "large-font";
        valueEl.classList.add(fontSizeClassLarge);
    } else if (formattedValue.length > 3 && formattedValue.length <= 6) {
        fontSizeClassMedium = "medium-font";
        valueEl.classList.remove("large-font");
        valueEl.classList.add(fontSizeClassMedium);
    } else if (formattedValue.length > 6 && formattedValue.length <= 9) {
        fontSizeClassSmall = "small-font";
        valueEl.classList.remove("medium-font");
        valueEl.classList.add(fontSizeClassSmall)
    }
};


const handleNumberClick = (numStr)=>{
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
        setStrAsValue(numStr);
    } else {
        setStrAsValue(currentValueStr + numStr);
    }
    
};

const getResultOfOperationAsStr = () => {
    const currentValueNumber = getValueAsNum();
    const ValueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if (operatorInMemory === "addition") {
        newValueNum = ValueNumInMemory + currentValueNumber;
    } else if (operatorInMemory === "subtraction") {
        newValueNum = ValueNumInMemory - currentValueNumber;
    } else if (operatorInMemory === "multiplication") {
        newValueNum = ValueNumInMemory * currentValueNumber;
    } else if (operatorInMemory === "division") {
        newValueNum = ValueNumInMemory / currentValueNumber;
    }
    return newValueNum.toString();
}

const handleOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr();
    if(!valueStrInMemory){
        valueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    valueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue("0");
}

const handleKeyboardClicks = (e) => {
    const currentValueStr = getValueAsStr();
    if (e.key >= 0 && e.key <= 9) {
        if (currentValueStr === '0') {
            setStrAsValue(e.key);
        } else {
            setStrAsValue(currentValueStr + e.key);
        }
        }
    else if (e.key === '.') {
        setStrAsValue('.');
    }
    else if (e.key === 'Backspace') {
        if (valueEl.textContent.length === 1) {
            valueEl.textContent = "0"
        } else {
        valueEl.textContent = valueEl.textContent.toString().slice(0,-1);
        }
    }
    else if (e.key === 'Escape') {
        setStrAsValue('0')
        valueStrInMemory = null;
        operatorInMemory = null;
    }
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') 
        handleOperatorClick(convertOperator(e.key));
    else if (e.key === '=' || e.key === 'Enter') {
        if (valueStrInMemory){
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
    }
};

const convertOperator = (keyboardOperator) => {
    if (keyboardOperator === '/') return 'division'
    if (keyboardOperator === '*') return 'multiplication'
    if (keyboardOperator === '-') return 'subtraction'
    if (keyboardOperator === '+') return 'addition'
}


//Add Event Listeners to Functions 
acEl.addEventListener("click", () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});
pmEl.addEventListener("click", () => {
    const currentValueNumber = getValueAsNum();
    const currentValueStr = getValueAsStr();
    if (currentValueStr === "-0") {
        setStrAsValue("0");
        return;
    }
    if (currentValueNumber >= 0) {
        setStrAsValue("-" + currentValueStr);
    } else {
        setStrAsValue(currentValueStr.substring(1));
    }
});
precentEl.addEventListener("click", () => {
    const currentValueNumber = getValueAsNum();
    const newValueNumber = currentValueNumber / 100;
    setStrAsValue(newValueNumber.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
});

//Add Event Listeners to Operators
additionEl.addEventListener("click", () =>{
    handleOperatorClick("addition");
});
subtractionEl.addEventListener("click", () =>{
    handleOperatorClick("subtraction");
});
multiplicationEl.addEventListener("click", () =>{
    handleOperatorClick("multiplication");
});
divisionEl.addEventListener("click", () =>{
    handleOperatorClick("division");
});
equalEl.addEventListener("click", () => {
    if (valueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
});

//Add Event Listeners to Numbers & Decimals
for (let i=0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener("click", () => {
        handleNumberClick(i.toString());
    })
}

decimalEl.addEventListener("click", ()=>{
    const currentValueStr = getValueAsStr();
    if (!currentValueStr.includes(".")) {
        setStrAsValue(currentValueStr + ".");
    }
})

document.addEventListener('keydown', handleKeyboardClicks);



// Set Up The Time
const updateTime = () => {
    const currentTime = new Date();
    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes()

    if (currentHour > 12) {
        currentHour -= 12;
    }

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
} 
setInterval(updateTime, 1000);
updateTime();