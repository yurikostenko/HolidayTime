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
