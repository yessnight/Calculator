let runnigTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

document.addEventListener("keydown", function(event) {
const key = event.key;

if(!isNaN(key)) {
    handleNumber(key);
} else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "=" || key === "Enter") {
    handleSymbol(convertKeyToSymbol(key));
} else if (key === "Backspace") {
    handleSymbol("←");
} else if (key === "Delete") {
    handleSymbol("C");
} else if (key === ".") {
    handleSymbol(".");
} else if (key === "[") {
    handleSymbol("√");
} else if (key === "]") {
    handleSymbol("%");
}
screen.innerText = buffer;
});

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value)
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runnigTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runnigTotal;
            runnigTotal = 0;
            break;
        case '.':
            if(!buffer.includes('.')){
                buffer += '.';
            }
            break;
        case '←':
            if(buffer.length ===1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '%':
            if (previousOperator) {
                buffer = (runnigTotal * (parseFloat(buffer) / 100)).toString();
            } else {
                buffer = (parseFloat(buffer) / 100).toString();
            }
            break;
        case '√':
            const floatBuffer = parseFloat(buffer);
            if(floatBuffer >= 0) {
                buffer = Math.sqrt(floatBuffer).toString();
            } else {
                buffer = "Error";
            }
            break;
        case '−':
            if (buffer === "0") {
                buffer = "-";
            } else {
                handleMath(symbol);
            }
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if(runnigTotal === 0){
        runnigTotal = floatBuffer;
    }else{
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    let floatBuffer = parseFloat(buffer);
    if(previousOperator === '+'){
        runnigTotal += floatBuffer;
    }else if(previousOperator === '−'){
        runnigTotal -= floatBuffer;
    }else if(previousOperator === '×'){
        runnigTotal *= floatBuffer;
    }else if(previousOperator === '÷'){
        runnigTotal /= floatBuffer;
    }
    buffer = runnigTotal.toString();
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else if (buffer === "−") {
        buffer += numberString;
    } else {
        buffer += numberString;
    }
}

function convertKeyToSymbol(key) {
    switch (key) {
        case "+": return "+";
        case "-": return "−";
        case "*": return "×";
        case "/": return "÷";
        case "Enter": return "=";
        default: return key;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
