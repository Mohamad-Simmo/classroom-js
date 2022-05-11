document
  .querySelectorAll('input[name="options-outlined"]')
  .forEach((element) => {
    element.addEventListener("change", (btn) => {
      continueRegisterForm(btn.target.value);
    });
  });

function continueRegisterForm(accountType) {
  form = document.getElementById("register-form");
  if (accountType === "student") {
    form.style.animationPlayState = "running";
  }
}
