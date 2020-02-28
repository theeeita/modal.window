## Modal Pop-up window

Конструктор модальных pop-up окон. Учитывает ширину полосы прокрутки при ее скрытии и возвращении на место. Это *учебный* проект.

#### Создание:
```html

<link rel="stylesheet" href="path_to_css/modal_popup.css">
<script src="path_to_js/modal_popup.js"></script>

<script>
 const modalPopupWindow = ModalPopup(options); // Объект options описывает параметры окна.
</script>
```

#### Параметры (свойства объекта options):
  * **showOnStart**<br>
    Тип: `Boolean`<br>
    Описание: Определяет, показывать ли окно сразу после загрузки страницы.<br>
    Значение по умолчанию: `false`
  * **width**<br>
    Тип: `Number`<br>
    Описание: Задает общую ширину окна в `px`<br>
    Значение по умолчанию: `600`
  * **header**<br>
    Тип: `String`<br>
    Описание: Указывает текст в заголовке окна (тег `h4`)<br>
    Значение по умолчанию: `Untitled`
   * **content**<br>
    Тип: `String`<br>
    Описание: HTML-код, который должен содержать основное содержимое окна.<br>
    Значение по умолчанию: `<p>Nothing here</p>`
   * **delayBeforeClose**<br>
    Тип: `Number`<br>
    Описание: Определяет задержку в миллисекундах перед закрытием окна.<br>
    Значение по умолчанию: `200`
   * **buttons**<br>
    Тип: `Array`<br>
    Описание: Массив из объектов, каждый из которых описывает кнопку.<br>
    Значение по умолчанию: `[]`<br>
    Свойства объекта:
      * `String` **text** - Текст кнопки.
      * `String` **action** - Атрибут `data-action`, по умолчанию равен `costum`, позволяет указать дополнительные параметры для стандартных кнопок ( `accept` и `close`).
      * `String` **title** - Атрибут `title`.
      * `Function` **handler** - Обработчик, который сработает при нажатии на кнопку (для всех кнопок, кроме `close`).<br>
   * **scrollable**<br>
    Тип: `Object`<br>
    Описание: Определяет, может ли окно появиться при прокрутке страницы на определенное расстояние. Срабатывает один раз.<br>
    Значение по умолчанию: ` { appear: false, scrolled: 0 }`<br>
    Свойства объекта:
      * `Boolean` **appear** - Возможно ли появление при скролле.
      * `Number` **scrolled** - Расстояние в `px` на которое надо прокрутить страницу, чтобы открыть окно.<br>

#### Методы объекта окна:
  * **show** Метод, показывающий окно. Запрещает прокрутку страницы и взаимодействие со страницей.
  * **hide** Метод, закрывающий окно.
  * **setContent** Метод, позволяющий передать новое содержимое.
    * Агрумент: `String` **html** - HTML-код, который должен содержать новое содержимое окна.<br>
  * **destroy** Метод, удаляющий окно из DOM-дерева и все слушатели событий. 
