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
