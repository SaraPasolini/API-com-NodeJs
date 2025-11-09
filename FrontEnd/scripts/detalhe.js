const apiUrl = "http://localhost:3000/produtos";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

window.abrirModalEditar = abrirModalEditar;
window.excluirProduto = excluirProduto;

async function carregarDetalhes() {
  const res = await fetch(`${apiUrl}/${id}`);
  const produto = await res.json();

  const container = document.getElementById("detalhesProduto");
  container.innerHTML = `
    <h2>${produto.NomeProduto}</h2>
    <p><strong>Preço:</strong> R$ ${produto.Preço.toFixed(2)}</p>
    <p><strong>Descrição:</strong> ${produto.Descricao}</p>
    <p><strong>Categoria:</strong> ${produto.Categoria}</p>
    <p><strong>Quantidade:</strong> ${produto.QuantidadeEmEstoque}</p>
    <p><strong>Avaliação:</strong> ${produto.Avaliacao}</p>
    <div class="mt-3">
      <button class="btn btn-primary" onclick="abrirModalEditar()">✏️ Editar</button>
      <button class="btn btn-danger" onclick="excluirProduto()">🗑️ Excluir</button>
    </div>
  `;
}

function abrirModalEditar() {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(produto => {
      const form = document.getElementById("formEditar");
      form.innerHTML = `
        <input type="text" name="NomeProduto" class="form-control mb-2" value="${produto.NomeProduto}">
        <input type="number" step="0.01" name="Preço" class="form-control mb-2" value="${produto.Preço}">
        <textarea name="Descricao" class="form-control mb-2">${produto.Descricao}</textarea>
        <input type="number" name="QuantidadeEmEstoque" class="form-control mb-2" value="${produto.QuantidadeEmEstoque}">
        <input type="number" step="0.1" name="Avaliacao" class="form-control mb-2" value="${produto.Avaliacao}">
        <input type="text" name="Categoria" class="form-control mb-2" value="${produto.Categoria}">
        <button type="submit" class="btn btn-primary w-100">Salvar Alterações</button>
      `;

      form.onsubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        data.Preço = parseFloat(data.Preço);
        data.Avaliacao = parseFloat(data.Avaliacao);
        data.QuantidadeEmEstoque = parseInt(data.QuantidadeEmEstoque);

        await fetch(`${apiUrl}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
        carregarDetalhes();
      };

      new bootstrap.Modal(document.getElementById("modalEditar")).show();
    });
}

async function excluirProduto() {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    alert("Produto excluído com sucesso!");
    window.location.href = "index.html";
  }
}

carregarDetalhes();
