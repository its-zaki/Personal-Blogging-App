import {  onAuthStateChanged , signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {auth} from "./config.js"
 
const logout = document.querySelector("#logout")

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    
  } else {
    window.location ="home.html"
    
  }
});
logout.addEventListener("click", ()=>{
    signOut(auth).then(() => {
        window.location = "home.html"
    }).catch((error) => {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
          });
    });
})