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
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const form = document.querySelector("#form3");
const title = document.querySelector("#TITLE");
const desc = document.querySelector("#DESC");
const main = document.querySelector("#box");
const username = document.querySelector("#username");
const logo = document.querySelector(".logo-dp");
const logout = document.querySelector("#logout");

let uid;
let img;
let idname;
console.log(auth);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location = "index.html";
    return;
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
    img = doc.data().profileUrl;
    idname = doc.data().names;
    // const data = doc.data()
  });
  
  render(uid);

});
logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "index.html";
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
async function render(uid) {
  main.innerHTML = "";
  arr.length = 0;
  const q = query(
    collection(db, "posts"),
    where("uid", "==", uid),
    orderBy("postDate", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), docid: doc.id });
    // console.log(arr);
  });
  const date = new Date();
  const formatted = date.toLocaleDateString();
  console.log(formatted);
  // const mydate = date.toLocalString()
  // console.log(mydate);
  // console.log(arr);
  arr.map((item) => {
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
    <button class="crud-btn" id="delete">Delete </button> <button class="crud-btn" id="update">Edit</button>
  </div> </div>`;
    // console.log(`${doc.id} => ${doc.data()}`);
  });

  const delete_btn = document.querySelectorAll("#delete");
  const update_btn = document.querySelectorAll("#update");

  delete_btn.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("Delete Called", arr[index]);
      await deleteDoc(doc(db, "posts", arr[index].docid))
        // getdatafromfirestore()
        .then(() => {
          console.log("post deleted");
          arr.splice(index, 1);
          render(uid);
        });
    });
  });
  update_btn.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      const question = prompt("Want to change title/desc");
      if (question === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `First Type "title" or "desc" to change title or description `,
        });

        return;
      } else if (question === "title") {
        const newTitle = prompt("Enter new Title");
        if (newTitle == null || newTitle == "") {
          return;
        }

        try {
          const cityRef = doc(db, "posts", arr[index].docid);

          await updateDoc(cityRef, {
            title: newTitle,
          });

          render(uid);
        } catch (error) {
          console.error(error);
        }
      } else if (question === "desc") {
        const Updatedcap = prompt("Enter new Desc");
        if (Updatedcap == null || Updatedcap == "") {
          return;
        }

        try {
          const cityRef = doc(db, "posts", arr[index].docid);

          await updateDoc(cityRef, {
            desc: Updatedcap,
          });

          render(uid);
        } catch (error) {
          console.error(error);
        }
      }
    });
  });
}
// arr.length = 0;
//   // console.log( auth.currentUser.uid);
//   const q = await query(collection(db, "posts"), orderBy("postDate", "desc") ,where("uid" ,"==", uid));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     arr.push({...doc.data() , docid: doc.id});
//     console.log(arr);
//   });
// function render (){

// }

// async function getdatafromfirestore(uid) {
//   arr.length = 0;
//   // console.log( auth.currentUser.uid);
//   const q = await query(collection(db, "posts"), orderBy("postDate", "desc"), where("uid", "==", uid));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     arr.push({...doc.data() , docid: doc.id});
//     console.log(arr);
//   });
//   render()
// }

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // main.innerHTML = "";
  const Obj = {
    title: title.value,
    desc: desc.value,
    uid: auth.currentUser.uid,
    img_link: img,
    names: idname,
    postDate: new Date().toLocaleDateString(),
  };
  try {
    // arr.push();
    const docRef = await addDoc(collection(db, "posts"), Obj);
    console.log("Document written with ID: ", docRef.id);
    arr = [Obj];
    console.log(arr);
    render(uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  title.value = "";
  desc.value = "";

  // getdatafromfirestore();
});
