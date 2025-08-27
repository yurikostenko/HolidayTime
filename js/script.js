
'use strict'

document.addEventListener(`DOMContentLoaded`, () => {
   const body = document.body

      // Меню-бургер
      ; (() => {
         const burger = document.querySelector(`.header__burger`)
         const menu = document.querySelector(`.header__menu`)
         if (!burger || !menu) return
         burger.addEventListener(`click`, () => {
            burger.classList.toggle(`active`)
            menu.classList.toggle(`active`)
            body.classList.toggle(`lock`)
         })
      })()

      // Слайдери
      ; (() => {
         if (typeof Swiper === `undefined`) return
         if (document.querySelector(`.mySwiper`)) {
            new Swiper(`.mySwiper`, {
               cssMode: true,
               navigation: { nextEl: `.swiper-button-next`, prevEl: `.swiper-button-prev` },
               pagination: { el: `.swiper-pagination` },
               mousewheel: true,
               keyboard: true,
            })
         }
         if (document.querySelector(`.slider-destinations`)) {
            new Swiper(`.slider-destinations`, {
               pagination: { el: `.swiper-pagination` },
               navigation: { nextEl: `.swiper-button-next`, prevEl: `.swiper-button-prev` },
            })
         }
      })()

      // Анімація блоку .feedback
      ; (() => {
         const section = document.querySelector(`.feedback`)
         if (!section) return
         const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
               if (entry.isIntersecting) entry.target.classList.add(`visible`)
            })
         })
         io.observe(section)
      })()

      // Випадаючий список у .choose + плавний скрол + підсвічування
      ; (() => {
         const choose = document.querySelector(`.choose`)
         if (!choose) return
         const title = choose.querySelector(`.choose__title`)
         const list = choose.querySelector(`.choose__list`)
         if (!title || !list) return

         title.addEventListener(`click`, e => {
            e.stopPropagation()
            choose.classList.toggle(`choose--open`)
            list.style.maxHeight = choose.classList.contains(`choose--open`) ? list.scrollHeight + `px` : null
         })

         document.addEventListener(`click`, () => {
            choose.classList.remove(`choose--open`)
            list.style.maxHeight = null
         })

         list.addEventListener(`click`, e => {
            const link = e.target.closest(`a`)
            if (!link) return

            const href = link.getAttribute(`href`) || ``
            // Працюємо лише з внутрішніми якорями типу #id
            if (!href.startsWith(`#`)) return

            e.preventDefault()
            choose.classList.remove(`choose--open`)
            list.style.maxHeight = null

            const targetId = href.slice(1)
            const targetBlock = document.getElementById(targetId)
            if (targetBlock) {
               targetBlock.scrollIntoView({
                  behavior: `smooth`,
                  block: `center`,
                  inline: `nearest`,
               })
               targetBlock.classList.add(`highlight`)
               setTimeout(() => targetBlock.classList.remove(`highlight`), 1500)
            }
         })
      })()

      // Стрілки вибору кількості
      ; (() => {
         const quantityBlocks = document.querySelectorAll(`.quantity`)
         if (!quantityBlocks.length) return

         const setBtnState = (btn, disabled) => {
            if (!btn) return

            // якщо це реальна кнопка — використовуємо властивість disabled
            if (`disabled` in btn) btn.disabled = disabled

            // синхронізуємо клас/атрибут/табіндекс — підходить для <button> і для <span>
            if (disabled) {
               btn.setAttribute(`aria-disabled`, `true`)
               btn.classList.add(`is-disabled`)
               if (btn.hasAttribute(`tabindex`)) btn.setAttribute(`data-prev-tabindex`, btn.getAttribute(`tabindex`))
               btn.setAttribute(`tabindex`, `-1`)
            } else {
               btn.removeAttribute(`aria-disabled`)
               btn.classList.remove(`is-disabled`)
               if (btn.hasAttribute(`data-prev-tabindex`)) {
                  btn.setAttribute(`tabindex`, btn.getAttribute(`data-prev-tabindex`))
                  btn.removeAttribute(`data-prev-tabindex`)
               } else {
                  btn.setAttribute(`tabindex`, `0`)
               }
            }
         }

         const onKeyActivate = e => {
            // Enter або Space -> імітуємо клік
            if (e.key === `Enter` || e.key === ` ` || e.key === `Spacebar` || e.code === `Space`) {
               e.preventDefault()
               e.target.click()
            }
         }

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

                  setBtnState(btnDown, value <= min)
                  setBtnState(btnUp, value >= max)
               }

               // клавіатурна підтримка для span
               btnUp.addEventListener(`keydown`, onKeyActivate)
               btnDown.addEventListener(`keydown`, onKeyActivate)

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

               // Заборона двозначних чисел
               input.addEventListener(`input`, () => {
                  let value = input.value.replace(/\D/g, ``)
                  if (value.length > 1) value = value[0]
                  input.value = value
                  updateButtons()
               })

               input.addEventListener(`blur`, () => {
                  if (!input.value) input.value = input.min || 0
                  updateButtons()
               })
            })
         })
      })()

      // Зірочки
      ; (() => {
         const stars = document.querySelectorAll(`.location__star`)
         if (!stars.length) return
         stars.forEach(star => {
            star.addEventListener(`click`, () => {
               star.classList.toggle(`active`)
            })
         })
      })()

      // Календар
      ; (() => {
         const dateInputs = document.querySelectorAll(`.date__input`)
         if (!dateInputs.length || typeof flatpickr === `undefined`) return
         flatpickr(`.date__input`, {
            dateFormat: `d.m.Y`,
            locale: `uk`,
            allowInput: true,
            position: `auto center`,
         })
      })()
})
