const endpoint = "http://localhost:3000/produtos";

async function buscaProdutos() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}


buscaProdutos().then(produtos => {
    produtos.forEach(produto => {
        console.log(produto);
    });
    });