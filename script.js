const display = document.getElementById("display"); 
const buttons = document.querySelectorAll("button"); 


buttons.forEach(button => { 
  button.addEventListener("click", () => { 

 

    if (button.dataset.type === "clear") {
        display.value = "0";
        return;
    }

    if (button.dataset.type === "delete") {
        if (display.value.length === 1) {
          display.value = "0";
        } else {
          display.value = display.value.slice(0, -1);
        }
        return;
    }

    if (button.dataset.type === "op") {
        const op = button.dataset.op;
      
        // If display is "0", don't start with an operator (except minus if you want later)
        if (display.value === "0") return;
      
        // Prevent double operators like 12++ or 12×÷
        const last = display.value.slice(-1);
        const ops = ["+", "−", "×", "÷"];
        if (ops.includes(last)) {
          // Replace last operator with new one
          display.value = display.value.slice(0, -1) + op;
        } else {
          // Append operator
          display.value += op;
        }
        return;
      }

    if (button.dataset.type === "dot") {
        if (button.dataset.type === "dot") {
            const last = display.value.slice(-1);
            const ops = ["+", "−", "×", "÷"];

            // don't allow dot right after an operator
            if (ops.includes(last)) return;

            // only check the current number part (after the last operator)
            const parts = display.value.split(/[+\−×÷]/);
            const current = parts[parts.length - 1];

            if (!current.includes(".")) {
                display.value += ".";
            }
            return;
        }
    }

    
    if (button.dataset.type === "number") {
        if (display.value === "0") {
          display.value = button.innerText;
        } else {
          display.value += button.innerText;
        }
    }

    if (button.dataset.type === "equals") {
        try {
          display.value = String(evaluate(display.value));
        } catch (e) {
          
        }
        return;
      }
  });
});

function evaluate(expr) {
    // Convert pretty operators into JS operators
    const jsExpr = expr
      .replaceAll("×", "*")
      .replaceAll("÷", "/")
      .replaceAll("−", "-");
  
  
    // Evaluate
    const result = Function(`return (${jsExpr});`)();

  
    return result;
  }