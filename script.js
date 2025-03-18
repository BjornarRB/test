// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU_LYYZdEbcAUC5jgPssYQVnbKnB67oCE",
  authDomain: "jobber-ute.firebaseapp.com",
  projectId: "jobber-ute",
  storageBucket: "jobber-ute.firebasestorage.app",
  messagingSenderId: "317030944915",
  appId: "1:317030944915:web:7ef23ef8fa68a82a7bbd66",
  measurementId: "G-D1GG7N8486"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load saved button states from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  let savedStates = JSON.parse(localStorage.getItem("buttonStates")) || {};

  Object.keys(savedStates).forEach((id) => {
    let container = document.getElementById(id);
    if (container) {
      if (savedStates[id].selected) {
        container.classList.add("selected");
        container.innerHTML = `<div class="selected-text">${savedStates[id].text}</div>`;
      }
    }
  });
});

// Function to select an option (turns button red and saves state)
function selectOption(event, id, option) {
  event.stopPropagation(); // Prevents triggering reset
  let container = document.getElementById(id);
  container.classList.add("selected");
  container.innerHTML = `<div class="selected-text">${option}</div>`;

  // Save state to localStorage
  let savedStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
  savedStates[id] = { selected: true, text: option };
  localStorage.setItem("buttonStates", JSON.stringify(savedStates));
}

// Function to reset a button (turns it back to green and restores options)
function resetCell(id) {
  let container = document.getElementById(id);
  if (container.classList.contains("selected")) {
    container.classList.remove("selected");
    container.innerHTML = `
      <div class="half-button top" onclick="selectOption(event, '${id}', 'Kantine')">Kantine</div>
      <div class="half-button bottom" onclick="selectOption(event, '${id}', 'Grupperom')">Grupperom</div>
    `;

    // Remove from localStorage
    let savedStates = JSON.parse(localStorage.getItem("buttonStates")) || {};
    delete savedStates[id];
    localStorage.setItem("buttonStates", JSON.stringify(savedStates));
  }
}
