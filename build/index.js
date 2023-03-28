"use strict";
const resetBtn = document.querySelector(".reset-btn");
const unitInputs = document.querySelectorAll(".input-wrapper input");
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", () => {
    unitInputs.forEach(input => input.value = "");
});
unitInputs.forEach(input => {
    input.addEventListener("keyup", function () {
        if (this.value.trim() === "") {
            updateAllInputs(0, input);
            return;
        }
        const toStandardFormula = this.dataset.formula;
        const toStandardFormulaAfterSubstitution = (toStandardFormula === null || toStandardFormula === void 0 ? void 0 : toStandardFormula.replace(/x/, this.value)) || "x*1";
        const toStandardFormulaSolution = eval(removeZerosFromStart(toStandardFormulaAfterSubstitution));
        updateAllInputs(toStandardFormulaSolution, input);
    });
});
const updateAllInputs = (standardValue, currentInput) => {
    unitInputs.forEach(input => {
        if (input === currentInput) {
            return;
        }
        const toStandardFormula = input.dataset.formula;
        let toCurrentUnitFormula = "", currentValue = 0;
        if (toStandardFormula === null || toStandardFormula === void 0 ? void 0 : toStandardFormula.includes("*")) {
            toCurrentUnitFormula = toStandardFormula.replace("*", "/");
        }
        else {
            toCurrentUnitFormula = (toStandardFormula === null || toStandardFormula === void 0 ? void 0 : toStandardFormula.replace("/", "*")) || "x";
        }
        toCurrentUnitFormula = toCurrentUnitFormula.replace(/x/, standardValue.toString());
        currentValue = eval(removeZerosFromStart(toCurrentUnitFormula));
        input.value = currentValue.toString();
    });
};
const removeZerosFromStart = (str) => {
    while (str[0] === "0" && !["*", "/"].includes(str[1])) {
        str = str.substring(1);
    }
    return str;
};
