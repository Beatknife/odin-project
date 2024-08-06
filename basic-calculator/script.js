const display = document.getElementById("display");
const buttons = document.querySelectorAll("#keys button");
const errorMessageDisplay = document.querySelector(".errorMessageDisplay");
const backSpace = document.querySelector(".backSpace");

let elements = []; 
let isOperateCalled = false; 
let isDeleteCalled = false;

backSpace.addEventListener("click", () => { 
    display.value = display.value.slice(0, -1); 
});

buttons.forEach(button => { 

    button.addEventListener("click", () => { 

        errorMessageDisplay.textContent = " ";
        errorMessageDisplay.style.display = "none";

        if(isOperateCalled){     
            isOperateCalled = false;
            
            if(!['+','-','*','/','='].includes(button.id)){
                clearDisplay();
            }
        }

        if(button.id == "C"){
            clearDisplay();
            return;
        }

        if(button.id == "=") { 
            let ret = parseElements(display.value);
            if(ret)
                display.value = operate();   
            return;
        }

        if(display.value.length > 9){
            return;
        }
        else {
            if (!['+', '-', '*', '/'].includes(display.value.slice(-1))){
            updateDisplay(button.id);
        } else if (["0","1","2","3","4","5","6","7","8","9", "."].includes(button.id)) {
            updateDisplay(button.id);
        }
        }

    });

});

function parseElements(elementsString){    
    elements = [];
    console.log("tempElements: " + elementsString);

    elementsString += "=";

    if(elementsString[0] == "*" || elementsString[0] == "/"){
        updateErrorDisplay("Can't start with Operator");
        return false;
    }   

    let tempNum = "";                                                               
    for (let i = 0; i < elementsString.length; i++) { 
        
        if(['+', '-','*', '/','='].includes(elementsString[i]) && tempNum !== ""){
            elements.push(parseFloat(tempNum));
            elements.push(elementsString[i]);        
            tempNum = "";
        }
        else{
            tempNum += elementsString[i];
        }
        console.log("elementString: " + elementsString);
        console.log("parsed: " + elements);
    }

    if(elements.includes("")){
        updateErrorDisplay("Invalid Operation");
        return false;
    }

    console.log("parsed elements: " + elements);
    return true;
}

function clearDisplay() { 
    display.value = "";
    elements = [];
    errorMessageDisplay.textContent = " "
    errorMessageDisplay.style.display = "none"
    isOperateCalled = false;
}

function operate() {

    elements.pop(); 
    console.log("elements after = clicked: " + elements)

    while(elements.includes("*")){
        let indexOfOperator = elements.indexOf("*");
        elements[indexOfOperator-1] = multiply(elements[indexOfOperator-1],elements[indexOfOperator+1]);
        elements.splice(indexOfOperator, 2);

        console.log("new Elem arr:" + elements);
    }

    while(elements.includes("/")){
        let indexOfOperator = elements.indexOf("/");
        if(elements[indexOfOperator - 1] === 0 && elements[indexOfOperator + 1] === 0){
            errorMessageDisplay.textContent = "Dividing zero is undefined"
        }
        elements[indexOfOperator-1] = divide(elements[indexOfOperator-1],elements[indexOfOperator+1]);
        elements.splice(indexOfOperator, 2);  
        
        console.log("new Elem arr:" + elements);
    }

    while(elements.includes("-")){
        let indexOfOperator = elements.indexOf("-");
        elements[indexOfOperator-1] = add(elements[indexOfOperator-1],-elements[indexOfOperator+1]);
        elements.splice(indexOfOperator, 2);    
        
        console.log("new Elem arr:" + elements);
    }

    while(elements.includes("+")){
        let indexOfOperator = elements.indexOf("+");
        elements[indexOfOperator-1] = add(elements[indexOfOperator-1],elements[indexOfOperator+1]);
        elements.splice(indexOfOperator, 2);    
        
        console.log("new Elem arr:" + elements);
    }

    let result = elements[0];
    elements = [];
    
    if(result === Infinity) {
        errorMessageDisplay.textContent = "Invalid Operation"
        errorMessageDisplay.style.display = "block";
    }

    isOperateCalled = true;

    if(result % 1 == 0){
        return result;
    }

    if (result === "Undefined") {
        return "Undefined"
    }

    return result.toFixed(2);
}

function add(num1, num2) {
    console.log(num1 + "+" + num2);
    return num1 + num2;
}

function subtract(num1, num2) {
    console.log("-");
    return num1 - num2;
}

function multiply(num1, num2) {
    console.log("*");
    return num1 * num2;

}

function divide(num1, num2) {
    console.log("/");
    if(num1 === 0){
        return "Undefined";
    }
    return num1 / num2;
}

function updateDisplay(displayID){
    if (display.value.length < 9 && displayID !== "=") {
        display.value += displayID;
    } else if (displayID === "="){
        display.value = operate();
    }
}

function updateErrorDisplay(errorMessage){
    errorMessageDisplay.textContent = errorMessage;
    errorMessageDisplay.style.display = "block";
}