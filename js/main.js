const endpoint = "http://localhost:3000/produtos";

const filtroBtns = document.querySelectorAll(".filtro-btn");
const containerProdutos = document.querySelector(".produtos");

async function buscaProdutos() {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

filtroBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filtro = btn.getAttribute("data-filtro");

    containerProdutos.innerHTML = "";
    filtraProdutos(filtro);
  });
});

function filtraProdutos(filtro) {
  buscaProdutos().then((produtos) => {
    const produtosFiltrados =
      filtro === "todos"
        ? produtos
        : produtos.filter((produto) => produto.categoria === filtro);

    carregaCards(produtosFiltrados);
  });
}
filtraProdutos("todos");


function carregaCards(produtos) {
  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("card-produto");

    const img = document.createElement("img");
    img.src = produto.url;
    img.alt = produto.nome;
    img.loading = "lazy";

    const titulo = document.createElement("h3");
    titulo.textContent = produto.nome;

    card.append(img, titulo);
    containerProdutos.appendChild(card);
  });
}
