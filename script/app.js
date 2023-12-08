import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector("#form");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const rpassword = document.querySelector("#rpassword");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (password.value !== rpassword.value) {
    console.log("password are not same");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "pass and rpass not same",
    });
  } else {
    createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value,
      fname.value,
      lname.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // Swal.fire({
        //     position: "center",
        //     icon: "success",
        //     title: "Signup Successfully",
        //     showConfirmButton: false,
        //     timer: 1500
        //   });
        window.location = "dashboard.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  }
});
