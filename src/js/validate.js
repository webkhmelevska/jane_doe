document.addEventListener("submit", handleSubmit);
document.addEventListener("keyup", handleKeyup);

function handleSubmit(e) {
  e.preventDefault();
  const { target } = e;

  console.log("tn:" + target.name);

  if (target.name !== "emailform") {
    return;
  }

  console.log(4444);

  let isValid = true;

  [...target.elements].forEach((el) => {
    if (el.classList.contains("form-control")) {
      const val = el.value.trim();
      if (!val || !validateEmail(val)) {
        if (isValid) {
          el.classList.add("is-invalid");
        }
        isValid = false;
      }
    }
  });

  if (!isValid) {
    return;
  }

  if (!target.classList.contains("modal__form")) {
    alert("Sended successfully!");
  } else {
    orderPackage();
  }
}

function handleKeyup({ target }) {
  if (!target.classList.contains("form-control")) {
    return;
  }

  const val = target.value.trim();
  if (validateEmail(val)) {
    target.classList.add("is-valid");
    target.classList.remove("is-invalid");
    console.log("valid");
    return;
  }
  target.classList.add("is-invalid");
  target.classList.remove("is-valid");
  console.log("is-invalid");
}
