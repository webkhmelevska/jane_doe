const btns = document.querySelectorAll(".package__btn-buy");
const modal = document.querySelector(".modal");
const modalTitle = modal.querySelector(".modal__title");
const modalClose = modal.querySelector(".modal__close");
const modalForm = modal.querySelector("form");
const modalSubtitle = modal.querySelector(".modal__subtitle");
const modalInputs = modal.querySelectorAll(".modal__input");
const labels = modal.querySelectorAll(".modal__label");
const sendMessage = {
  package: modalTitle.textContent,
};

function slowClose() {
  clearForm();
}

const orderPackage = async () => {
  labels.forEach((label) => {
    const span = label.querySelector("span");
    const input = label.querySelector("input");
    sendMessage[span.textContent] = input.value;
  });

  try {
    console.log(88887777);

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(sendMessage),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("Sended:", JSON.stringify(json));

    modalSubtitle.textContent =
      "The request has been sent! Our managers will contact you soon :)";
    modalSubtitle.style.color = "#37b048";

    setTimeout(slowClose, 5000);
  } catch (error) {
    console.error("Error:", error);
  }
};

const clearForm = () => {
  modal.style.display = "none";
  modalSubtitle.textContent = "Buy package";
  modalInputs.forEach((inp) => {
    inp.classList.remove("is-valid");
    inp.classList.remove("is-invalid");
  });

  modalForm.reset();
};

const sendForm = () => {
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      modal.style.display = "flex";
      modalTitle.textContent = btn.dataset.content;
    });
  });

  modalClose.addEventListener("click", () => {
    clearForm();
  });
};

sendForm();
