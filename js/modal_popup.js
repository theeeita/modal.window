"use strict";

function ModalPopup(options) {

	const {
		showOnStart = false,
		width = 500,
		header = "Untitled",
		content = "<p>Nothing here</p>",
		delayBeforeClose = 200,
		buttons = [ ],
		scrollable = {
			appear: false,
			scrolled: 0,
		},
	} = options || {};

	// Переменные для работы с шириной вертикальной полосы прокрутки (если она есть), используются в методах api.show и api.hide
	let isDesroyed = false,
			bodyPartialWidth = document.body.offsetWidth,
			bodyInstantPaddingRight = parseInt(getComputedStyle(document.body).paddingRight),
			bodyFullWidth = null,
			scrollBarWidth = 0;

	const $wrapper = _createModalElement();
	$wrapper.addEventListener("click", _eventClickHandler);

	const api = {
		show() {
			if(!isDesroyed) {

				let allWindows = document.querySelectorAll(".modal-popup_wrapper");
				if(allWindows.length > 1) for(let item of allWindows) if(item.classList.contains("active")) return;

				$wrapper.classList.add("active");
				document.body.style.overflowY = "hidden";
	
				bodyFullWidth = document.body.offsetWidth;
	
				// Если есть полоса прокрутки, то когда она исчезает, добавить ее ширину к padding-right у body
				if(bodyFullWidth !== bodyPartialWidth) {
					scrollBarWidth = bodyFullWidth - bodyPartialWidth;
					document.body.style.paddingRight = `${bodyInstantPaddingRight + scrollBarWidth}px`;
				}
			}
		},
		hide() {
			if(!isDesroyed) {
				setTimeout(() => {
					$wrapper.classList.remove("active");
					document.body.style.overflowY = "";
		
					if(bodyFullWidth !== bodyPartialWidth) document.body.style.paddingRight = `${bodyInstantPaddingRight}px`;
				}, delayBeforeClose);
			}
		},
		destroy() {
			if(!isDesroyed) {
				// Удаление слушатетей событий со всех кнопок, если они есть.
				if($wrapper.querySelector(".popup-window_buttons")) {
					let buttonElements = $wrapper.querySelector(".popup-window_buttons").children;
					for(let i = 0; i < buttonElements.length; i++) buttonElements[i].removeEventListener("click", buttons[i].handler);
				}
				
				if(scrollable.appear) document.removeEventListener("scroll", _appearOnScroll);

				$wrapper.removeEventListener("click", _eventClickHandler);
				$wrapper.remove();
				isDesroyed = true;
			}
		},
		setContent(html) {
			if(!isDesroyed) {
				const $content = $wrapper.querySelector(".popup-window_content");
				$content.innerHTML = html;
			}
		}
	};

	if(scrollable.appear) {
		document.addEventListener("scroll", _appearOnScroll);
	}

	if(showOnStart) api.show();

	return api;

	/**
	 * @description Создает корневой элемент модального окна и возвращает его.
	 */
	function _createModalElement() {
		const wrapper = document.createElement("div");
		wrapper.className = "modal-popup_wrapper";
		wrapper.innerHTML = `<div class="modal-popup_overlay"><div class="modal-popup_window" style="width: ${width}px;"><button class="close-icon" data-action="close" title="Закрыть окно"></button><div class="popup-window_header"><h4>${header}</h4></div><div class="popup-window_content">${content}</div></div></div>`;

		if(buttons.length !== 0) {
			const buttonsContainer = document.createElement("div");
			buttonsContainer.className = "popup-window_buttons";

			for(let btnProps of buttons) {
				let button = document.createElement("button");
				button.title = btnProps.title;
				button.dataset.action = (btnProps.action) ? btnProps.action : "costum";

				if(button.dataset.action === "costum") button.addEventListener("click", btnProps.handler);

				button.textContent = btnProps.text;
				buttonsContainer.append(button);
			}

			wrapper.querySelector(".modal-popup_window").append(buttonsContainer);
		}

		document.body.append(wrapper);
		return wrapper;
	}

	/**
	 * @description Вызывает соответствующий обработчик у элемента, по которому произошел клик, если у него есть data-action
	 * и он не равен "costum".
	 * @param {Object} event Объект события.
	 */
	function _eventClickHandler(event) {
		let action = event.target.dataset.action;
		if(!action || action === "costum") return;
		switch(action) {
			case "close":
				api.hide();
				break;
			case "accept":
				let acceptIndex = buttons.findIndex(item => item["action"] === "accept");
				if(acceptIndex !== -1) buttons[acceptIndex].handler();
				break;
		}
	}

	/**
	 * @description Показывает созданныое окно при прокрутке на указанное расстояние один раз.
	 */
	function _appearOnScroll() {
		if(this.documentElement.scrollTop >= scrollable.scrolled) {
			api.show();
			document.removeEventListener("scroll", _appearOnScroll);
		}
	}
}