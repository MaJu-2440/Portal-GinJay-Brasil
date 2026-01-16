const endpoint = "./produtos.json";

const filtroBtns = document.querySelectorAll(".filtro-btn");
const containerProdutos = document.querySelector(".produtos");

async function buscaProdutos() {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.produtos);
    return data.produtos;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

filtroBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filtro = btn.getAttribute("data-filtro");

    filtroBtns.forEach((b) => b.removeAttribute("selected"));
    btn.setAttribute("selected", "true");

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
  // Limpa o container antes de carregar novos cards
  containerProdutos.innerHTML = "";

  produtos.forEach((produto, index) => {
    // 1. Cria o elemento principal do card
    const card = document.createElement("div");
    card.classList.add("card-produto");

    // 2. Cria a estrutura HTML do Swiper com IDs únicos ou classes específicas por card
    const swiperId = `swiper-${index}`;
    card.innerHTML = `
      <div class="swiper ${swiperId}">
        <div class="swiper-wrapper">
          ${produto.url
            .map(
              (img) => `
            <div class="swiper-slide">
              <img src="${img}" alt="${produto.nome}" loading="lazy">
            </div>
          `,
            )
            .join("")}
        </div>
        <!-- Botões de navegação -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <h3>${produto.nome}</h3>
    `;

    // 3. Adiciona o card ao container primeiro
    containerProdutos.appendChild(card);

    // 4. Inicializa o Swiper para ESTE card específico após ele estar no DOM
    new Swiper(`.${swiperId}`, {
      direction: "horizontal",
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
}
