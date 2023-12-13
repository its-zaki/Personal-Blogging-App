import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth , db, storage} from "./config.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const form = document.querySelector("#form");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const rpassword = document.querySelector("#rpassword");
const profile_img = document.querySelector("#profile_img");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (password.value !== rpassword.value) {
    console.log("password are not same");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "pass and rpass not same",
    });
    return
  } 
const files = profile_img.files[0];
const storageRef = ref(storage, email.value);

uploadBytes(storageRef, files)
  .then(() => {
    getDownloadURL(storageRef)
      .then((url) => {
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            const names = `${fname.value} ${lname.value}`;
            addDoc(collection(db, "users"), {
              names: names,
              email: email.value,
              uid: user.uid,
              profileUrl: url,
            })
              .then((res) => {
                console.log(res);
                window.location = "dashboard.html";
              })
              .catch((err) => {
                console.log(err);
              });
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
      })
      .catch((error) => {
        // Handle error for getDownloadURL
        console.log(error);
      });
  })
  .catch((error) => {
    // Handle error for uploadBytes
    console.log(error);
  });
});
