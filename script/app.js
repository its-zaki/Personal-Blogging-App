import {
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import { auth, db } from "./config.js";
  import {
    collection,
    getDocs,
    where,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
  

  const currentTime = new Date();
const currentHour = currentTime.getHours();
const greeting = document.querySelector('#greeting');
const main = document.querySelector('#box')

let uid;
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        return
    }
    uid = user.uid
})
// greeting start
let greet;
if (currentHour >= 5 && currentHour < 12) {
    greet = 'Good Morning'
} else if (currentHour >= 12 && currentHour < 17) {
    greet = 'Good Afternoon'
} else if (currentHour >= 17 && currentHour < 21) {
    greet = 'Good Evening';
} else {
    greet = 'Good Night';
}
// console.log(greeting);
const text = document.createTextNode(`${greet} Readers!`)
greeting.appendChild(text)

// greeting end


const array = [];



const postsQuerySnapshot = await getDocs(collection(db, "posts"), where('uid', '==', uid));
postsQuerySnapshot.forEach((doc) => {
    array.push({ ...doc.data(), docId: doc.id });
});

const  date = new Date().toLocaleDateString()
  console.log(date);
  // const mydate = date.toLocalString()
  // console.log(mydate);
  array.map((item) => {
    // console.log(item);
    main.innerHTML += ` <div id="main"><div class="container">
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
  <div class="crud">
    <button class="crud-btn" id="seeall">See All From This User</button>
  </div> </div>`;
  });
  const seeAll = document.querySelectorAll("#seeall");

  seeAll.forEach((item, index) => {
    item.addEventListener("click", () => {
      console.log(index);
      let define_arr = [];
      const obj = {
        uid: array[index].uid,
        name: array[index].names,
        img: array[index].img_link,
      };
      define_arr.push(obj);

      const useruid = JSON.stringify(define_arr);
      localStorage.setItem("user", useruid);
      window.location = "userid.html";
    });
  });


