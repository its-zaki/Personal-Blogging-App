import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const form = document.querySelector("#form3");
const title = document.querySelector("#TITLE");
const desc = document.querySelector("#DESC");
const main = document.querySelector("#box");
const username = document.querySelector("#username");
const logo = document.querySelector("#logo-img");
const logout = document.querySelector("#logout");

let uid;
let img;
let idname;
console.log(auth);
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location = "home.html";
    return
  }
    uid = user.uid;
    // uid = user.uid;
    console.log(uid);
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      username.innerHTML = doc.data().names;
      logo.src = doc.data().profileUrl;
      img = doc.data().profileUrl
      idname = doc.data().names
      // const data = doc.data()
    });
    getdatafromfirestore(uid)
  
});
logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "home.html";
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    });
});

let arr = [];
function render ()
{
  const  date = new Date()
 const formatted =  date.toLocaleDateString()
  console.log(formatted);
  // const mydate = date.toLocalString()
  // console.log(mydate);
  arr.map((item) => {
    console.log(arr);
    main.innerHTML += ` <div id="main"><div class="container">
    <div class="user-img">
        <img src="${img}" alt="user-img">
    </div>
    <div class="heads">
        <h3>${item.title}</h3>
        <span>${idname}</span> -
        <span>${formatted}</span>
    </div>
  </div>
  <div>
    <p class="content">${item.desc}</p>
  </div>
  <div class="crud">
    <button class="crud-btn">Delete </button> <button class="crud-btn">Edit</button>
  </div> </div>`;
    // console.log(`${doc.id} => ${doc.data()}`);
  });
}
// function render (){

// }


async function getdatafromfirestore(uid) {
  arr.length = 0;
  // console.log( auth.currentUser.uid);
  const q = await query(collection(db, "posts"), orderBy("postDate", "desc"),where ("uid","==" , uid ));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
    console.log(doc.data());
  });
  render()
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (title.value && desc.value !== "") {
    // main.innerHTML = "";
    const Obj={
      title: title.value,
      desc: desc.value,
      uid: auth.currentUser.uid,
      postDate: Timestamp.fromDate(new Date()),
    }
    try {
      // arr.push();
      const docRef = await addDoc(collection(db, "posts"), 
       Obj
       );
       console.log("Document written with ID: ", docRef.id);
       arr = [{...Obj, arr}]
       console.log(arr);
       render()
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      title.value = "";
      desc.value = "";
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "please enter any title or description",
      });
    }
    // getdatafromfirestore();

});
