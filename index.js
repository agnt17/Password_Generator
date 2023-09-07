document.addEventListener("DOMContentLoaded", function () {
  const inputSlider = document.querySelector("[data-lengthSlider]");
  const lengthDisplay = document.querySelector("[data-length]");
  const PasswordDisplay = document.querySelector("[data-passwordDisplay]");
  const copyBtn = document.querySelector("[data-copy]");
  const copyMsg = document.querySelector("[data-copyMsg]");
  const uppercaseCheck = document.querySelector("#uppercase");
  const lowercaseCheck = document.querySelector("#lowercase");
  const numbersCheck = document.querySelector("#numbers");
//   const symbolCheck = document.querySelector("#symbols");
  const indicator = document.querySelector("[data-indicator]");
  const generateBtn = document.querySelector(".generateButton");
  const allCheckBox = document.querySelectorAll("input[type=checkbox]");
  

  let Password = "";
  let Passwordlength = 10;
  let checkCount = 0;

  // all function callings
  handleSlider();

  // handleslider sets password length
  function handleSlider() {
    inputSlider.value = Passwordlength;
    lengthDisplay.innerText = Passwordlength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((Passwordlength - min)*100/(max-min)) + "%100%"; 
  }

  // setting indicator
  function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow -hw
    
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
  }
  // this function is used to generate random integer b/w min max values
  function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // random digits
  function generateRandomNumber() {
    return getRandInteger(0, 9);
  }
  // random lowercase letters
  function generatelowerCase() {
    return String.fromCharCode(getRandInteger(97, 123));
  }
  //random uppercase letters
  function generateupperCase() {
    return String.fromCharCode(getRandInteger(65, 91));
  }
  //random symbols
//   const Symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
//   function generatesymbols() {
//     const randNum = getRandInteger(0, Symbols.length);
//     return Symbols.charAt(randNum);
//   }
setIndicator("#ccc");
  function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    // let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    // if (symbolCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum) && Passwordlength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum) &&
      Passwordlength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
  }

  async function copyContent() {
    try {
      await navigator.clipboard.writeText(PasswordDisplay.value);
      copyMsg.innerText = "copied";
    } catch (e) {
      copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout(() => {
      copyMsg.classList.remove("active");
    }, 2000);
  }

  // shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
  // Shuffle the array randomly - Fisher Yates Method
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }
  function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) => {
      if (checkBox.checked) {
        checkCount++;
      }
    });
    //special condition
    if (Passwordlength < checkCount) {
      Passwordlength = checkCount;
      handleSlider();
    }
  }
  allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
  });
  // this eventlistner changes the number by changing lenght of slider...
  inputSlider.addEventListener("input", (e) => {
    Passwordlength = e.target.value;
    handleSlider();
  });

  copyBtn.addEventListener("click", () => {
    if (PasswordDisplay.value) {
      copyContent();
    }
  });

  generateBtn.addEventListener("click", () => {
    if (checkCount == 0) return;
    if (Passwordlength < checkCount) {
      Passwordlength = checkCount;
      handleSlider();
    }

    // code to generate random password eachtime

    //remove old password
    Password = "";

    let arrayOfCheckedFunction = [];

    if (uppercase.checked) arrayOfCheckedFunction.push(generateupperCase);
    if (lowercase.checked) arrayOfCheckedFunction.push(generatelowerCase);
    if (numbers.checked) arrayOfCheckedFunction.push(generateRandomNumber);
    // if (Symbols.checked) arrayOfCheckedFunction.push( generatesymbols);

    // Compulsory Addition
    for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
      Password += arrayOfCheckedFunction[i]();
    }

    // Additional addition
    for (let i = 0; i < Passwordlength - arrayOfCheckedFunction.length; i++) {
      let randIndex = getRandInteger(0, arrayOfCheckedFunction.length);
      if (randIndex >= 0 && randIndex < arrayOfCheckedFunction.length) {
        Password += arrayOfCheckedFunction[randIndex]();
      }
    }

    // Shuffle Password
    Password = shuffle(Array.from(Password));
    PasswordDisplay.value = Password;
    calcStrength();
  });
});
