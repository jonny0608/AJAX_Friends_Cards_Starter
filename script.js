// =============================================================
// 2.02 AJAX + JSON: Friends Cards
// Your job: load friends.json with an XMLHttpRequest and turn
// every person in it into a card.
// =============================================================

// Supplied page connections. Keep these IDs unchanged.
const loadButton = document.getElementById("loadFriends");
const cardsContainer = document.getElementById("cards");
const statusMessage = document.getElementById("status");

// CHECKPOINT 2: When the Load Friends button is clicked, run loadFriends.

loadButton.addEventListener('click', () => {
  loadFriends();
});
// -------------------------------------------------------------
// loadFriends: request the file, check the response, parse it.
// -------------------------------------------------------------
function loadFriends() {
  statusMessage.classList.remove("error");
  statusMessage.textContent = "Loading friends...";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "friends.json");
  xhr.onload = function () {
    const status = xhr.status;
    if (status !== 200) {
      showLoadError();
      return;
    }

    try {
      const friends = JSON.parse(xhr.responseText);
      if (!Array.isArray(friends)) {
        throw new Error("friends.json must contain an array.");
      }
      renderFriends(friends);
    } catch (error) {
      showDataError(error);
    }
  };

  xhr.onerror = showLoadError;
  xhr.send();
}


// -------------------------------------------------------------
// renderFriends: turn the array into cards on the page.
// -------------------------------------------------------------
function renderFriends(friends) {
  const cardsMarkup = friends.map((friend) => `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="card h-100">
        <div class="card-body">
          <h2 class="card-title h4">${friend.name}</h2>
          <p class="relationship">${friend.relationship}</p>
          <p>${friend.details}</p>
          <p class="hobbies"><strong>Hobbies:</strong> ${friend.hobbies.join(", ")}</p>
        </div>
      </article>
    </div>
  `).join("");

  cardsContainer.innerHTML = cardsMarkup;
  statusMessage.classList.remove("error");
  statusMessage.textContent = `${friends.length} friends loaded.`;
}


// =============================================================
// Supplied helpers. Do not change these.
// =============================================================

// Call this when the request fails (wrong file name, server error).
function showLoadError() {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "Could not load friends. Check the JSON file name and path, then try again.";
}

// Call this from your catch block. The file arrived, but its data
// could not be used: usually a JSON typo or a misspelled key.
function showDataError(error) {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "friends.json loaded, but its data could not be used. Check quotes, commas, brackets, and key names.";
  console.error("Data problem:", error.message);
}