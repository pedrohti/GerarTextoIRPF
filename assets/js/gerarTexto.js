var platInvestimentos = ["Clear", "Mercado Bitcoin", "Binance", "Rico"];
var radios = "";

$(document).ready(function () {
	platInvestimentos.forEach((e, i) => {
		let checked = i == 0 ? "checked='checked'" : "";

		$("#bttRadios").append(
			`<div class="form-check">
				<input class="form-check-input" type="radio" name="plataforma" value=${i} ${checked}>${e.trimEnd()}</input>
			</div>`
		);
	});
	radios = $("input[name=plataforma]");
});

var empresa = $("#txtEmpresa"),
	codigo = $("#txtCodigo"),
	qtd = $("#txtQuantidade"),
	precoMedio = $("#txtPrecoMedio"),
	gerar = $("#bttGerar"),
	resultado = $("#lblResultado");

const getPlataform = (opt) => {
	let platformas = {
		0: "Na Clear Corretora (02.332.886/0011-78)",
		1: "No Mercado Bitcoin (18.213.434/0001-35)",
		2: "Na Binance (37.512.394/0001-77)",
		3: "Na Rico Corretora (02.332.886/0016-82)",
	};

	return platformas[opt];
};

function copyToClipboard() {
	var copyText = document.getElementById("lblResultado").textContent;
	navigator.clipboard.writeText(copyText);
}

gerar.click((e) => {
	e.preventDefault();

	let plataforma;

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			plataforma = getPlataform(radios[i].value);
			break;
		}
	}

	let totalPago = Math.round(qtd.val() * precoMedio.val().replace(",", "."));
	let texto = `${qtd.val()} ações de ${empresa.val()} (${codigo.val()}). A um preço médio de R$ ${precoMedio.val()} e custo total de R$ ${totalPago}. ${plataforma}`;

	resultado.text(texto);
	copyToClipboard();
});
