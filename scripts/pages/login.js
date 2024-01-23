const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const inputValues = Object.fromEntries(formData);

  try {
    const result = await fetch("login.html", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValues),
    });

    if (!result.ok) {
      throw new Error("Gagal untuk login");
    }
  } catch (error) {
    alert(error.message);
  }
});
