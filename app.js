// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const submit = document.querySelector("form");
const input = document.querySelector("input");
const resultContainer = document.querySelector(".result");
const error = document.querySelector(".error-msg");

submit.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  if (input.value === "") {
    input.value = "Veuillez remplir le champs 😊";
  } else {
    getArticle(input.value);
  }
}

async function getArticle(input) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${input}`
    );
    console.log(response);
    if (!response.ok) {
      throw Error(`${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    createArticle(data.query.search);
  } catch (error) {
    error.textContent = `Error : ${error.message}`;
    console.dir(error);
  }
}

function createArticle(data) {
  if (!data.length) {
    error.textContent = "Woops, aucune réponse trouvée... ☹️";
  }
  data.forEach(el => {
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
    const card = document.createElement("div");
    console.log(card);
    card.className = "result-card";
    card.innerHTML = `
        <h3 class="result-title">
            <a href="${url} target="_blank">${el.title}</a>
        </h3>
        <a class="result-link" href="${url} target ="_blank">${url}</a><br>
        <span class="result-text">${el.snippet}</span>
        `;
    resultContainer.appendChild(card);
  });
}

/* <a href="${url}>${url}</a>
<span class="result-text">${el.snippet}</span> */
