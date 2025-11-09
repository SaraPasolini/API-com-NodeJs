const apiUrl = "http://localhost:3000/produtos";


async function carregarProdutos() {
  const res = await fetch(apiUrl);
  const produtos = await res.json();

  const container = document.getElementById("produtosContainer");
  container.innerHTML = "";

  produtos.slice(-12).reverse().forEach(produto => {
    container.innerHTML += `
      <div class="col-md-3">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${produto.NomeProduto}</h5>
            <p class="text-success fw-bold">R$ ${produto.Preço.toFixed(2)}</p>
            <button class="btn btn-primary w-100" onclick="verDetalhes('${produto.id}')">Ver Detalhes</button>
          </div>
        </div>
      </div>
    `;
  });
}

function verDetalhes(id) {
  window.location.href = `detalhes.html?id=${id}`;
}

window.verDetalhes = verDetalhes;



document.getElementById("formAdd").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  data.Preço = parseFloat(data.Preço);
  data.Avaliacao = parseFloat(data.Avaliacao);
  data.QuantidadeEmEstoque = parseInt(data.QuantidadeEmEstoque);

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  form.reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalAdd"));
  modal.hide();
  carregarProdutos();
});

carregarProdutos();
