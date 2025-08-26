// Сучасний (Строгий) режим

"use strict"

document.addEventListener('DOMContentLoaded', () => {
   // Меню-бургер
   const burger = document.querySelector('.header__burger')
   const menu = document.querySelector('.header__menu')
   const body = document.body

   if (burger && menu) {
      burger.addEventListener('click', () => {
         burger.classList.toggle('active')
         menu.classList.toggle('active')
         body.classList.toggle('lock')
      })
   }

   // Слайдери (перевірка наявності контейнерів)
   if (document.querySelector('.mySwiper')) {
      new Swiper('.mySwiper', {
         cssMode: true,
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
         pagination: {
            el: '.swiper-pagination',
         },
         mousewheel: true,
         keyboard: true,
      })
   }

   if (document.querySelector('.slider-destinations')) {
      new Swiper('.slider-destinations', {
         pagination: {
            el: '.swiper-pagination',
         },
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
      })
   }

   // Анімація блоку .feedback
   const feedbackSection = document.querySelector('.feedback')
   if (feedbackSection) {
      const observerFeedback = new IntersectionObserver(entries => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               entry.target.classList.add('visible')
            }
         })
      })
      observerFeedback.observe(feedbackSection)
   }

   // Випадаючий список у .choose
   const choose = document.querySelector('.choose')
   if (choose) {
      const title = choose.querySelector('.choose__title')
      const list = choose.querySelector('.choose__list')

      if (title && list) {
         title.addEventListener('click', e => {
            e.stopPropagation()
            choose.classList.toggle('choose--open')
            list.style.maxHeight = choose.classList.contains('choose--open')
               ? list.scrollHeight + 'px'
               : null
         })

         document.addEventListener('click', () => {
            choose.classList.remove('choose--open')
            list.style.maxHeight = null
         })

         list.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
               choose.classList.remove('choose--open')
               list.style.maxHeight = null
            }
         })
      }
   }

   // Стрілки вибору кількості
   const quantityBlocks = document.querySelectorAll(`.quantity`)
   if (!quantityBlocks.length) return

   quantityBlocks.forEach(block => {
      const wrappers = block.querySelectorAll(`.quantity__wrapper`)
      if (!wrappers.length) return

      wrappers.forEach(wrapper => {
         const input = wrapper.querySelector(`.quantity__input`)
         const btnUp = wrapper.querySelector(`.quantity__btn--up`)
         const btnDown = wrapper.querySelector(`.quantity__btn--down`)

         if (!input || !btnUp || !btnDown) return

         const updateButtons = () => {
            const value = parseInt(input.value) || 0
            const min = parseInt(input.min) || 0
            const max = parseInt(input.max) || Infinity

            btnDown.disabled = value <= min
            btnUp.disabled = value >= max
         }

         updateButtons()

         btnUp.addEventListener(`click`, () => {
            let currentValue = parseInt(input.value) || 0
            const maxValue = parseInt(input.max) || Infinity
            if (currentValue < maxValue) {
               input.value = currentValue + 1
               updateButtons()
            }
         })

         btnDown.addEventListener(`click`, () => {
            let currentValue = parseInt(input.value) || 0
            const minValue = parseInt(input.min) || 0
            if (currentValue > minValue) {
               input.value = currentValue - 1
               updateButtons()
            }
         })

         // Заборона введення двозначних чисел
         input.addEventListener(`input`, () => {
            let value = input.value.replace(/\D/g, ``)
            if (value.length > 1) {
               value = value[0]
            }
            input.value = value
            updateButtons()
         })

         input.addEventListener(`blur`, () => {
            if (!input.value) {
               input.value = input.min || 0
            }
            updateButtons()
         })
      })
   })

   // Зірочки
   const stars = document.querySelectorAll('.location__star')
   if (stars.length) {
      stars.forEach(star => {
         star.addEventListener('click', () => {
            star.classList.toggle('active')
         })
      })
   }

   // Календар
   if (document.querySelector('.date__input')) {
      flatpickr('.date__input', {
         dateFormat: 'd.m.Y',
         locale: 'uk',
         allowInput: true,
         position: "auto center"
      })
   }
})
