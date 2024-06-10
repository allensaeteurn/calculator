document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display-text");
  let currentInput = "0";
  let previousInput = "";
  let operator = null;
  let shouldResetDisplay = false;

  const updateDisplay = () => {
    display.textContent = currentInput;
  };

  const clearDisplay = () => {
    currentInput = "0";
    previousInput = "";
    operator = null;
    updateDisplay();
  };

  const appendNumber = (number) => {
    if (currentInput === "0" || shouldResetDisplay) {
      currentInput = number;
      shouldResetDisplay = false;
    } else {
      currentInput += number;
    }
    updateDisplay();
  };

  const chooseOperator = (newOperator) => {
    if (operator !== null) evaluate();
    previousInput = currentInput;
    operator = newOperator;
    shouldResetDisplay = true;
  };

  const evaluate = () => {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "×":
        result = prev * curr;
        break;
      case "÷":
        result = prev / curr;
        break;
      default:
        return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";
    updateDisplay();
  };

  const deleteLastDigit = () => {
    currentInput = currentInput.slice(0, -1) || "0";
    updateDisplay();
  };

  const addDecimal = () => {
    if (currentInput.includes(".")) return;
    currentInput += ".";
    updateDisplay();
  };

  const convertToPercent = () => {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  };

  document.querySelectorAll(".key").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.textContent;

      if (button.id === "clear") {
        clearDisplay();
      } else if (button.id === "backspace") {
        deleteLastDigit();
      } else if (button.id === "decimal") {
        addDecimal();
      } else if (button.id === "percent") {
        convertToPercent();
      } else if (button.classList.contains("operator")) {
        chooseOperator(key);
      } else if (button.id === "equals") {
        evaluate();
      } else {
        appendNumber(key);
      }
    });
  });

  updateDisplay();
});
