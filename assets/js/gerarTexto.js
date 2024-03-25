var pls = './assets/corretoras.json'
var corretoras

var empresa = $("#txtEmpresa"),
	codigo = $("#txtCodigo"),
	qtd = $("#txtQuantidade"),
	precoMedio = $("#txtPrecoMedio"),
	gerar = $("#bttGerar"),
	resultado = $("#lblResultado");

$(document).ready(() => {
	fetch(pls)
	.then(response => response.json())
	.then(data => corretoras = data)
	.then(() => {
		corretoras.forEach((e, i) => {
			let checked = i == 0 ? "checked='checked'" : "";
			$("#bttRadios").append(
				`<div class="form-check">
					<input class="form-check-input" type="radio" name="corretora" value=${i} ${checked}>${e.nome}</input>
				</div>`
			);
		})
	})
});

const copyToClipboard = (texto) => navigator.clipboard.writeText(texto);

function clearInputs() {
	empresa.val("");
	codigo.val("");
	qtd.val("");
	precoMedio.val("");
}

var formatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
});

gerar.click((e) => {
	e.preventDefault();

	let radio = $(".form-check-input:checked")
		.map(function () {
			return $(this).val();
		}).get();

	let totalPago = qtd.val() * precoMedio.val().replace(",", ".").replace("R$", "");
	let texto = `${codigo.val()} - ${empresa.val()}: ${qtd.val()} ações a um custo total de R$ ${formatter.format(totalPago)} em ${corretoras[radio[0]].nome} (${corretoras[radio[0]].cnpj})`.toUpperCase();

	clearInputs();
	resultado.text(texto);
	copyToClipboard(texto);
});
