const menuToggle = document.querySelector(".menu-toggle");
const sideMenu = document.querySelector("#site-menu");
const menuBackdrop = document.querySelector(".menu-backdrop");

if (menuToggle && sideMenu && menuBackdrop) {
	const closeMenu = (restoreFocus = false) => {
		menuToggle.setAttribute("aria-expanded", "false");
		sideMenu.classList.remove("is-open");
		menuBackdrop.classList.remove("is-visible");
		document.body.classList.remove("menu-open");

		window.setTimeout(() => {
			if (menuToggle.getAttribute("aria-expanded") === "false") {
				sideMenu.hidden = true;
				menuBackdrop.hidden = true;
			}
		}, 220);

		if (restoreFocus) {
			menuToggle.focus();
		}
	};

	menuToggle.addEventListener("click", () => {
		if (menuToggle.getAttribute("aria-expanded") === "true") {
			closeMenu();
			return;
		}

		sideMenu.hidden = false;
		menuBackdrop.hidden = false;
		menuToggle.setAttribute("aria-expanded", "true");
		document.body.classList.add("menu-open");

		window.requestAnimationFrame(() => {
			sideMenu.classList.add("is-open");
			menuBackdrop.classList.add("is-visible");
		});
	});

	menuBackdrop.addEventListener("click", () => closeMenu(true));
	sideMenu.addEventListener("click", (event) => {
		if (event.target.closest("a")) {
			closeMenu();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
			closeMenu(true);
		}
	});
}
