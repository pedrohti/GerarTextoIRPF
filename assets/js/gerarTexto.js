var plataformas = ["Clear", "Mercado Bitcoin", "Binance", "Rico"];

var cnpjs = {
	0: "Na Clear Corretora (02.332.886/0011-78)",
	1: "No Mercado Bitcoin (18.213.434/0001-35)",
	2: "Na Binance (37.512.394/0001-77)",
	3: "Na Rico Corretora (02.332.886/0016-82)",
};

var empresa = $("#txtEmpresa"),
	codigo = $("#txtCodigo"),
	qtd = $("#txtQuantidade"),
	precoMedio = $("#txtPrecoMedio"),
	gerar = $("#bttGerar"),
	resultado = $("#lblResultado");

$(document).ready(function () {
	plataformas.forEach((e, i) => {
		let checked = i == 0 ? "checked='checked'" : "";

		$("#bttRadios").append(
			`<div class="form-check">
				<input class="form-check-input" type="radio" name="plataforma" value=${i} ${checked}>${e}</input>
			</div>`
		);
	});
});

const getPlataforma = (opt) => {
	return cnpjs[opt];
};

function copyToClipboard(texto) {
	navigator.clipboard.writeText(texto);
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
		})
		.get();

	let plataforma = getPlataforma(radio[0]);

	let totalPago = qtd.val() * precoMedio.val().replace(",", ".");
	let texto =
		`${qtd.val()} ações de ${empresa.val()} (${codigo.val()}). A um custo total de ${formatter.format(
			totalPago
		)}. ${plataforma}`.toUpperCase();

	resultado.text(texto);
	copyToClipboard(texto);
});
