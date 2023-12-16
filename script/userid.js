import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const main = document.querySelector("#box");
const idname = document.querySelector("#seealluser");
const seeallname = document.querySelector("#seeallname");
const seeallimg = document.querySelector("#seeallimg");

let arr = [];

async function render() {
  // main.innerHTML = "";
  const data = localStorage.getItem("user");
  const useruid = JSON.parse(data);
  console.log(useruid);
  const username = useruid[0].name;
  const userimg = useruid[0].img;
  idname.innerHTML = `All from ${username}`;
  seeallname.innerHTML = username;
  seeallimg.src = userimg;
  const uid = useruid[0].uid;
  const q = query(
    collection(db, "posts"),
    orderBy("postDate", "desc"),
    where("uid", "==", uid)
  );
  const querySnapshot = await getDocs(q);
  arr = [];
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), docid: doc.id });
  });

  console.log(arr);

  arr.forEach((item, index) => {
    console.log(item);
    main.innerHTML += `
    <div id="mainuser">
      <div class="container">
          <div class="user-img">
              <img src="${item.img_link}" alt="user-img">
          </div>
          <div class="heads">
              <h3>${item.title}</h3>
              <span>${item.names}</span> -
              <span>${item.postDate}</span>
          </div>
      </div>
      <div>
          <p class="content">${item.desc}</p>
      </div>
    </div>
  `;
  });
}
render();
