document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.catalog__tab')
  const contents = document.querySelectorAll('.catalog__content')

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function () {
      tabs.forEach((t) => t.classList.remove('catalog__tab_active'))
      this.classList.add('catalog__tab_active')

      contents.forEach((content) =>
        content.classList.remove('catalog__content_active')
      )
      contents[index].classList.add('catalog__content_active')
    })
  })

  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    controls: false,
    nav: false,
  })

  const prevButton = document.querySelector('.prev')
  const nextButton = document.querySelector('.next')

  if (prevButton) {
    prevButton.addEventListener('click', function () {
      slider.goTo('prev')
    })
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      slider.goTo('next')
    })
  }

  document.querySelectorAll('.catalog-item__link').forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault()

      const catalogItem = this.closest('.catalog-item')
      if (catalogItem) {
        catalogItem
          .querySelector('.catalog-item__content')
          .classList.toggle('catalog-item__content_active')
        catalogItem
          .querySelector('.catalog-item__list')
          .classList.toggle('catalog-item__list_active')
      }
    })
  })

  document.querySelectorAll('.catalog-item__back').forEach((backBtn) => {
    backBtn.addEventListener('click', function (event) {
      event.preventDefault()

      const catalogItem = this.closest('.catalog-item')
      if (catalogItem) {
        catalogItem
          .querySelector('.catalog-item__content')
          .classList.toggle('catalog-item__content_active')
        catalogItem
          .querySelector('.catalog-item__list')
          .classList.toggle('catalog-item__list_active')
      }
    })
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const modalButtons = document.querySelectorAll('[data-modal]') // Находим кнопки с data-modal
  const overlay = document.querySelector('.overlay') // Затемняющий фон
  const modals = document.querySelectorAll('.modal') // Все модалки
  const closeButtons = document.querySelectorAll('.modal__close') // Кнопки закрытия

  if (!modalButtons.length || !overlay || !modals.length) return // Проверяем, что всё найдено

  // Функция для открытия модального окна
  function openModal(modal) {
    overlay.classList.add('overlay_active')
    modal.classList.add('modal_active')
    document.body.style.overflow = 'hidden' // Блокируем прокрутку
  }

  // Функция для закрытия всех модалок
  function closeModal() {
    overlay.classList.remove('overlay_active')
    modals.forEach((modal) => modal.classList.remove('modal_active'))
    document.body.style.overflow = '' // Разблокируем прокрутку
  }

  // Открытие модалки по `data-modal`
  modalButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const modalId = this.getAttribute('data-modal')
      const modal = document.getElementById(modalId)
      if (modal) {
        openModal(modal)
      } else {
        console.error(`❌ Ошибка: модальное окно с id="${modalId}" не найдено.`)
      }
    })
  })

  // Закрытие модалки по кнопке "×"
  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal)
  })

  // Закрытие по клику на затемняющий фон
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeModal()
    }
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const miniButtons = document.querySelectorAll('.button_mini') // Кнопки "КУПИТЬ"
  const modalOrder = document.querySelector('#order') // Модальное окно "order"
  const overlay = document.querySelector('.overlay') // Затемняющий фон
  const closeButtons = document.querySelectorAll('.modal__close') // Кнопки закрытия

  if (!miniButtons.length || !modalOrder || !overlay) return // Проверяем, что элементы существуют

  // Функция для открытия модального окна
  function openModal(modal) {
    overlay.classList.add('overlay_active') // Добавляем активный класс
    modal.classList.add('modal_active')
    document.body.style.overflow = 'hidden' // Блокируем прокрутку
  }

  // Функция для закрытия всех модалок
  function closeModal() {
    overlay.classList.remove('overlay_active')
    modalOrder.classList.remove('modal_active')
    document.body.style.overflow = '' // Разблокируем прокрутку
  }

  // Обработчик клика на кнопки "КУПИТЬ"
  miniButtons.forEach((button) => {
    button.addEventListener('click', function () {
      openModal(modalOrder)
    })
  })

  // Обработчик клика на кнопки закрытия
  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal)
  })

  // Закрытие при клике на затемняющий фон
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeModal()
    }
  })
})

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.addEventListener('focus', function () {
      if (!input.value.startsWith('+41')) {
        input.value = '+41 '
      }
    })

    input.addEventListener('input', function (e) {
      let value = input.value.replace(/\D/g, '') // Убираем все не-цифры
      if (!value.startsWith('41')) {
        value = '41' // Начало всегда с 41
      }

      // Форматируем номер с пробелами
      let formattedValue = '+41'
      if (value.length > 2) {
        formattedValue += ' ' + value.substring(2, 5)
      }
      if (value.length > 5) {
        formattedValue += ' ' + value.substring(5, 8)
      }
      if (value.length > 8) {
        formattedValue += ' ' + value.substring(8, 10)
      }

      input.value = formattedValue
    })

    input.addEventListener('keydown', function (e) {
      if (
        input.selectionStart <= 4 &&
        (e.key === 'Backspace' || e.key === 'Delete')
      ) {
        e.preventDefault() // Запрещаем удалять `+41`
      }
    })
  })
})


document.addEventListener('DOMContentLoaded', function () {
  const pageUp = document.createElement('div');
  pageUp.classList.add('pageup');
  pageUp.innerHTML = '<img src="../icons/up.svg" alt="pageup">'; 
  document.body.appendChild(pageUp);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 1600) {
      pageUp.style.display = 'block';
    } else {
      pageUp.style.display = 'none';
    }
  });

  pageUp.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});


