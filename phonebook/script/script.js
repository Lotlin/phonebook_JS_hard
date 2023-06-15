'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

const mainButtons = [
  {
    className: 'btn btn-primary mr-3',
    type: 'button',
    text: 'Добавить',
  },
  {
    className: 'btn btn-danger',
    type: 'button',
    text: 'Удалить',
  },
];

const formButtons = [
  {
    className: 'btn btn-primary mr-3',
    type: 'submit',
    text: 'Добавить',
  },
  {
    className: 'btn btn-danger',
    type: 'reset',
    text: 'Отмена',
  },
];

{
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonGroup = pararmsArr => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = pararmsArr.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
        <th>Редактировать</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя</label>
        <input class="form-input" name="name" id="name" type="text">
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия</label>
        <input class="form-input" name="surname" id="surname" type="text">
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон</label>
        <input class="form-input" name="phone" id="phone" type="number">
      </div>
    `);

    const buttonGroup = createButtonGroup(formButtons);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDEl = document.createElement('td');
    tdDEl.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDEl.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    tdName.classList.add('name');

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    tdSurname.classList.add('surname');

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn');
    buttonEdit.classList.add('btn-primary');
    buttonEdit.textContent = 'Редактировать';
    tdEdit.append(buttonEdit);

    tr.append(tdDEl, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    return footer;
  };

  const createCopyright = title => {
    const copyright = document.createElement('p');
    copyright.textContent = `Все права защищены \u00A9${title}`;

    return copyright;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonGroup(mainButtons);
    const table = createTable();
    const form = createForm();

    const footer = createFooter();
    const copyright = createCopyright(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);
    footer.footerContainer.append(copyright);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });

      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);
    const {list, logo, btnAdd, formOverlay, form} = phoneBook;

    // функционал

    const allRow = renderContacts(list, data);

    hoverRow(allRow, logo);

    const objEvent = {
      handleEvent() {
        formOverlay.classList.add('is-visible');
      },
    };

    btnAdd.addEventListener('click', objEvent);

    form.addEventListener('click', event => {
      event.stopPropagation();
    });

    formOverlay.addEventListener('click', () => {
      formOverlay.classList.remove('is-visible');
    });

    const delElem = (elems) => {
      elems.forEach(elem => {
        elem.classList.add('delete');
      });
    };

    list.addEventListener('click', e => {
      const target = e.target;
      const contacts = list.querySelectorAll('.contact');
      let sorted = '';

      if (target.closest('.name')) {
        delElem(contacts);
        sorted = data.sort((a, b) => a.name > b.name ? 1 : -1);
      }

      if (target.closest('.surname')) {
        delElem(contacts);
        sorted = data.sort((a, b) => a.surname > b.surname ? 1 : -1);
      }

      renderContacts(list, sorted);
    });
  };

  window.phoneBookInit = init;
}
