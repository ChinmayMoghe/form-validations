/*Store regex expressions here*/
const validations = {
    username: /^[A-Za-z]{8,50}$/,
    password: /^(?=(.*[^A-Za-z0-9]){3})(?=(.*[A-Z]){3})(?=(.*\d){3}).+/,
    email: /^[A-Z0-9a-z._%+-]+\@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
    pancard: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    passport: /^[A-Z][1-9]\d\d{4}[1-9]$/
}

const errorStatuses = {
    username: "Please enter a name with length greater than 8 characters but less than 50.",
    password: "Enter a password atleast having three of each : uppercase letters, numerical digits and special characters.",
    email: "Enter a valid E-mail Id",
    pancard: "Please enter valid pancard number, Ex. ABCDE1213D , example shows the format not a valid pancard number.",
    passport: "Please enter a valid passport number. Ex.R2210321"
}

/*
 optimize input validation to delay the validation
 to avoid stray keypresses.
*/
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunc() {
        let context = this;
        let args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    }
}

const delayedValidate = debounce(function validateInput(event) {
    const messageBox = event.target.nextElementSibling.children[0];
    validator = validations[event.target.name];
    let validationStatus = null;
    if (validator) {
        validationStatus = validator.test(event.target.value);
    }
    if (validationStatus === false) {
        messageBox.innerText = errorStatuses[event.target.name];
    } else {
        messageBox.innerText = "";
    }
}, 150);

window.addEventListener("input", delayedValidate);