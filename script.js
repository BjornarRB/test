// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ 1. Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU_LYYZdEbcAUC5jgPssYQVnbKnB67oCE",
  authDomain: "jobber-ute.firebaseapp.com",
  projectId: "jobber-ute",
  storageBucket: "jobber-ute.firebasestorage.app",
  messagingSenderId: "317030944915",
  appId: "1:317030944915:web:7ef23ef8fa68a82a7bbd66"
};

// ✅ 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ 3. Load Button States from Firestore
document.addEventListener("DOMContentLoaded", async function () {
  const docRef = doc(db, "buttons", "state");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let savedStates = docSnap.data();
    Object.keys(savedStates).forEach((id) => {
      let container = document.getElementById(id);
      if (container) {
        if (savedStates[id].selected) {
          container.classList.add("selected");
          container.innerHTML = `<div class="selected-text">${savedStates[id].text}</div>`;
        }
      }
    });
  }

  // ✅ 4. Real-time updates
  onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      let savedStates = docSnap.data();
      Object.keys(savedStates).forEach((id) => {
        let container = document.getElementById(id);
        if (container) {
          if (savedStates[id].selected) {
            container.classList.add("selected");
            container.innerHTML = `<div class="selected-text">${savedStates[id].text}</div>`;
          }
        }
      });
    }
  });
});

// ✅ 5. Save Button State to Firestore
async function selectOption(event, id, option) {
  event.stopPropagation(); // Prevents triggering reset
  let container = document.getElementById(id);
  container.classList.add("selected");
  container.innerHTML = `<div class="selected-text">${option}</div>`;

  // Save to Firestore
  const docRef = doc(db, "buttons", "state");
  const docSnap = await getDoc(docRef);
  let savedStates = docSnap.exists() ? docSnap.data() : {};
  savedStates[id] = { selected: true, text: option };

  await setDoc(docRef, savedStates);
}

// ✅ 6. Reset Button (Remove from Firestore)
async function resetCell(id) {
  let container = document.getElementById(id);
  if (container.classList.contains("selected")) {
    container.classList.remove("selected");
    container.innerHTML = `
      <div class="half-button top" onclick="selectOption(event, '${id}', 'Kantine')">Kantine</div>
      <div class="half-button bottom" onclick="selectOption(event, '${id}', 'Grupperom')">Grupperom</div>
    `;

    // Remove from Firestore
    const docRef = doc(db, "buttons", "state");
    const docSnap = await getDoc(docRef);
    let savedStates = docSnap.exists() ? docSnap.data() : {};
    delete savedStates[id];

    await setDoc(docRef, savedStates);
  }
}
