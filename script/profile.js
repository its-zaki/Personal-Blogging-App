import { updatePassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const form_profile = document.querySelector("#form_profile");

const user = auth.currentUser;
console.log(auth);

form_profile.addEventListener("submit", (event) => {
  event.preventDefault();

  //     const new_pass = document.querySelector("#new-pass");
  //     const reset_pass = document.querySelector("#reset-pass");
  //   if (new_pass.value != reset_pass.value ) {
  //     console.log("reset password not same");
  //   } else {
  //     const user = auth.currentUser;
  //     const newPassword = reset_pass.value;

  //     updatePassword(user, newPassword)
  //       .then(() => {
  //         console.log(newPassword);
  //         console.log("passwordupdated successfully");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
});
