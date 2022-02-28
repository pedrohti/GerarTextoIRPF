$(document).ready(function () {
	$.getJSON("/assets/plataformas.json", function (data) {
		data.forEach((e, i) => {
			let checked = i == 0 ? "checked='checked'" : "";

			$("#bttRadios").append(
				`<div class="form-check">
				<input class="form-check-input" type="radio" name="plataforma" value=${i} ${checked}>${e.plataforma}</input>
			</div>`
			);
		});
	}).fail(function () {
		alert("Não foi possivel ler o JSON.");
	});
});

var empresa = $("#txtEmpresa"),
	codigo = $("#txtCodigo"),
	qtd = $("#txtQuantidade"),
	precoMedio = $("#txtPrecoMedio"),
	gerar = $("#bttGerar"),
	resultado = $("#lblResultado");

const getPlataform = (opt) => {
	var plataforma;
	// $.getJSON("/assets/plataformas.json", function (data) {
	// 	data.forEach((e, i) => {
	// 		// if (i == opt) console.log(e.texto);
	// 		plataforma = i == opt ? e.texto : "";
	// 	});
	// }).fail(function () {
	// 	alert("Não foi possivel ler o JSON.");
	// });

	// console.log(opt);
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
	let radio = $(".form-check-input:checked")
		.map(function () {
			return $(this).val();
		})
		.get();

	let plataforma = getPlataform(radio[0]);

	let totalPago = Math.round(qtd.val() * precoMedio.val().replace(",", "."));
	let texto = `${qtd.val()} ações de ${empresa.val()} (${codigo.val()}). A um preço médio de R$ ${precoMedio.val()} e custo total de R$ ${totalPago}. ${plataforma}`;

	resultado.text(texto);
	copyToClipboard();
});
