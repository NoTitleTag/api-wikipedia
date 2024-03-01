// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const error = document.querySelector(".error-msg");
const input = document.querySelector("input");
const resultContainer = document.querySelector(".result-container");
const loader = document.querySelector(".container-dot");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  if (input.value === "") {
    input.value = "Veuillez remplir le champ 😊";
    input.classList.toggle("active");
    input.addEventListener("focus", () => {
      input.value = "";
    });
    return;
  } else {
    resultContainer.textContent = "";
    error.textContent = "";
    input.addEventListener("focus", () => {
      input.value = "";
      error.textContent = "";
    });
    input.addEventListener("keypress", () => {
      input.classList.remove("active");
    });
    loader.style.display = "flex";
    setTimeout(() => connectArticle(input.value), 1500);
  }
}

async function connectArticle(input) {
  let data;
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${input}`)
    if(!response.ok) {
      throw new Error(`${response.status} 😿`);
    };

    data = await response.json();
    getArticle(data.query.search);
    loader.style.display = "none";

  } catch(Error) {
    error.textContent = `${Error}`;
    loader.style.display = "none";

  }
}

function getArticle(data) {
  if (!data.length) {
    error.textContent = "Wops, recherche introuvable ☹️";
    resultContainer.textContent = "";
    return;
  }
  data.forEach((el) => {
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
    const result = document.createElement("div");
    result.className = "result-card";
    result.innerHTML = `
    <h3 class="result-title">
    <a href="${url}">${el.title}</a>
    </h3>
    <a class="result-link" href="${url}">${url}</a><br>
    <span class="result-text">${el.snippet}</span>
    <hr>
    `;
    resultContainer.appendChild(result);
  });
}
