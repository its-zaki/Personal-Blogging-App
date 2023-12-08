import {signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {auth} from "./config.js"

const email = document.querySelector("#email")
const password = document.querySelector("#password")

form.addEventListener('submit', (event) => {
    event.preventDefault();

signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    // Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "login Successfully",
    //     showConfirmButton: false,
    //     timer: 1000
    //   });
      window.location = "dashboard.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
  });
});