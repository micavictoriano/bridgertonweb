const searchItems = [
	{
		title: "The Whistledown",
		destination: "./bridgerton.html",
		description: "Portada y secciones del sitio.",
		keywords: "inicio portada the ton whistledown",
	},
	{
		title: "Romance: Sophie y Benedict",
		destination: "./lady-whistledown.html#romance",
		description: "Un amor que desafía las reglas y las diferencias de clase.",
		keywords: "lady whistledown romance sophie baek benedict bridgerton amor pareja baile mascaras clase",
	},
	{
		title: "Sociedad: Eloise Bridgerton",
		destination: "./lady-whistledown.html#sociedad",
		description: "Una dama con ideas propias y las expectativas del Ton.",
		keywords: "lady whistledown sociedad eloise bridgerton mujeres matrimonio reglas expectativas",
	},
	{
		title: "Entretenimiento: música y teatro",
		destination: "./lady-whistledown.html#entretenimiento",
		description: "Ópera, música en vivo y una noche en Londres.",
		keywords: "lady whistledown entretenimiento musica teatro opera londres concierto",
	},
	{
		title: "Accesorios y belleza",
		destination: "./glamour.html#accesorios",
		description: "Perlas, guantes, abanicos, peinados y maquillaje.",
		keywords: "glamour moda accesorios belleza perlas guantes abanicos collares cabello peinados maquillaje",
	},
	{
		title: "Look destacado: Sophie Baek",
		destination: "./glamour.html#look-destacado",
		description: "El vestido plateado y la máscara de la Dama de Plata.",
		keywords: "glamour look vestido sophie baek plateado plata mascara dama misterio baile",
	},
	{
		title: "Los vestidos más memorables",
		destination: "./glamour.html#mejores-vestidos",
		description: "Los estilos de Daphne, Penelope y la reina Charlotte.",
		keywords: "glamour vestidos moda daphne bridgerton penelope featherington reina charlotte estilo",
	},
	{
		title: "Agenda del Ton",
		destination: "./bailes-eventos.html#agenda",
		description: "Invitaciones, bailes, recepciones y encuentros de temporada.",
		keywords: "bailes eventos agenda ton invitaciones baile mascaras recepcion reina charlotte picnic jardines temporada",
	},
	{
		title: "El evento de la temporada",
		destination: "./bailes-eventos.html#evento-temporada",
		description: "El baile de máscaras organizado por Violet Bridgerton.",
		keywords: "bailes eventos temporada acontecimiento baile mascaras violet bridgerton antifaces salon",
	},
	{
		title: "Aprendé a bailar el vals",
		destination: "./bailes-eventos.html#aprende-bailar",
		description: "Una guía para aprender los pasos básicos del vals.",
		keywords: "bailes eventos aprender bailar vals pasos tutorial danza pareja",
	},
	{
		title: "Familia Bridgerton",
		destination: "./familias.html#familia-bridgerton",
		description: "Violet, Anthony, Benedict, Colin, Daphne, Eloise, Francesca, Gregory y Hyacinth.",
		keywords: "familia bridgerton violet anthony benedict colin daphne eloise francesca gregory hyacinth amor vizconde artista viajero musica",
	},
	{
		title: "Familia Featherington",
		destination: "./familias.html#familia-featherington",
		description: "Portia, Penelope, Prudence y Philippa Featherington.",
		keywords: "familia featherington portia penelope prudence philippa matriarca hijas estatus sociedad",
	},
	{
		title: "Familia real",
		destination: "./familias.html#familia-real",
		description: "La reina Charlotte y el rey George III.",
		keywords: "familia real reina charlotte rey george monarquia corte poder",
	},
	{
		title: "Contacto y newsletter",
		destination: "./contacto.html",
		description: "Sumate a la comunidad Bridgerton y recibí novedades.",
		keywords: "contacto newsletter suscripcion suscribite comunidad novedades correo email registro",
	},
];

const normalizeSearchText = (text) =>
	text
		.toLocaleLowerCase("es")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim();

const searchForm = document.querySelector(".search");
const searchInput = searchForm?.querySelector("#site-search");
const searchResults = searchForm?.querySelector("#search-results");

if (searchForm && searchInput && searchResults) {
	let matchingItems = [];

	const closeResults = () => {
		searchResults.hidden = true;
		searchInput.setAttribute("aria-expanded", "false");
	};

	const updateResults = () => {
		const query = normalizeSearchText(searchInput.value);
		searchResults.replaceChildren();

		if (!query) {
			matchingItems = [];
			closeResults();
			return;
		}

		const searchWords = query.split(/\s+/);
		matchingItems = searchItems.filter((item) => {
			const searchableText = normalizeSearchText(
				`${item.title} ${item.description} ${item.keywords}`,
			);
			return searchWords.every((word) => searchableText.includes(word));
		});

		if (matchingItems.length === 0) {
			const emptyMessage = document.createElement("div");
			emptyMessage.className = "search-empty";
			emptyMessage.setAttribute("role", "listitem");
			emptyMessage.textContent = "No encontramos resultados. Probá con otras palabras.";
			searchResults.append(emptyMessage);
		} else {
			matchingItems.slice(0, 7).forEach((item) => {
				const result = document.createElement("a");
				result.className = "search-result";
				result.href = item.destination;
				result.setAttribute("role", "listitem");

				const title = document.createElement("strong");
				title.textContent = item.title;
				const description = document.createElement("span");
				description.textContent = item.description;

				result.append(title, description);
				searchResults.append(result);
			});
		}

		searchResults.hidden = false;
		searchInput.setAttribute("aria-expanded", "true");
	};

	searchInput.addEventListener("input", updateResults);

	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();
		updateResults();

		if (matchingItems.length === 1) {
			window.location.href = matchingItems[0].destination;
		} else {
			searchResults.querySelector(".search-result")?.focus();
		}
	});

	document.addEventListener("click", (event) => {
		if (!searchForm.contains(event.target)) {
			closeResults();
		}
	});

	searchInput.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeResults();
		}
	});
}
