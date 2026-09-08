"use strict";
window.addEventListener("load", load);

function load() {
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) {
    document.documentElement.setAttribute("data-touch", "");
  }

  const header = document.querySelector(".header");

  if (header) {
    // scroll header
    window.addEventListener("scroll", () => {
      console.log("Window scrolling...", window.scrollY);
      console.log("111");

      if (window.scrollY > 50) {
        header.classList.add("header--scroll-state");
      } else {
        header.classList.remove("header--scroll-state");
      }
    });
  }

  // відриття бургер меню
  const burgerIcon = document.querySelector(".header__icon");

  if (burgerIcon) {
    burgerIcon.addEventListener("click", () => {
      const isOpen = header.classList.toggle("open");
      burgerIcon.ariaExpanded = isOpen;
      // if (header.classList.contains("open")) {
      //   burgerIcon.ariaExpanded ="true"
      // }else{
      //   burgerIcon.ariaExpanded ="false"
      // }

      // Забороняє скролити сторінку, поки відкрите мобільне меню
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
  }

  // =====перемикання навігації у контейнері cosmetic====
  const navigatorContainers = document.querySelectorAll(
    ".cosmetic__navigation",
  );
  if (navigatorContainers.length) {
    navigatorContainers.forEach((container) => {
      container.addEventListener("click", (event) => {
        event.preventDefault();
        const navigatorLinks = document.querySelectorAll(".cosmetic__link");
        navigatorLinks.forEach((link) => {
          link.classList.remove("cosmetic__link--active");
        });
        const targetEl = event.target;
        const activeLink = targetEl.closest(".cosmetic__link");
        if (activeLink) {
          activeLink.classList.add("cosmetic__link--active");
        }
      });
    });
  }

  // =========слайдер на сторінці product-page==========

  const paginationContainer = document.querySelector(
    ".content-gallery__navigation",
  );
  const sliderBlock = document.querySelector(".content-gallery__slider");
  const slidersEls = document.querySelectorAll(".content-gallery__slide");

  if (paginationContainer && sliderBlock && slidersEls.length > 0) {
    const track = document.createElement("div");
    track.classList.add("navigation-gallery__track");
    paginationContainer.append(track);

    function getSliderStep() {
      return slidersEls[0].offsetWidth + 18;
    }
    slidersEls.forEach((slide, index) => {
      const btnPagination = document.createElement("button");
      btnPagination.classList.add("navigation-gallery__button");
      if (index === 0) {
        btnPagination.classList.add("navigation-gallery__button--active");
        slide.classList.add("active");
      }
      btnPagination.addEventListener("click", () => {
        // console.log("click");
        const slideWidth = getSliderStep();
        sliderBlock.scrollTo({
          left: index * slideWidth,
          behavior: "smooth",
        });
      });
      track.append(btnPagination);
    });

    const buttonsPagination = track.querySelectorAll(
      ".navigation-gallery__button",
    );
    console.log(buttonsPagination);

    sliderBlock.addEventListener("scroll", () => {
      const slideWidth = getSliderStep();
      const activeIndex = Math.round(sliderBlock.scrollLeft / slideWidth);
      buttonsPagination.forEach((btn, index) => {
        if (index === activeIndex) {
          btn.classList.add("navigation-gallery__button--active");
          slidersEls[index].classList.add("active");
        } else {
          btn.classList.remove("navigation-gallery__button--active");
          slidersEls[index].classList.remove("active");
        }
      });
      const buttonStep = 18;
      // індекс зсуву
      let shiftIndex = 0;
      if (activeIndex >= 1) {
        shiftIndex = activeIndex - 1;
      }
      //  Обмежуємо зсув, щоб активна кнопка завжди залишалася у "віконці" з 3-х кнопок
      const maxShiftIndex = buttonsPagination.length - 3;
      if (shiftIndex > maxShiftIndex) {
        shiftIndex = maxShiftIndex;
      }
      if (shiftIndex < 0) {
        shiftIndex = 0;
      }

      track.style.transform = `translateX(-${shiftIndex * buttonStep}px)`;
    });
  }
  //================== Intersection observer
  const options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.1,
  };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const currentElement = entry.target;
      if (entry.isIntersecting) {
        currentElement.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  const animateElements = document.querySelectorAll(".header, .hero, .about-us, .about, .cosmetics, .blogs, .footer, .blog, .face, .body, .hair, .cosmetic, .contacts, .banner, .combs, .hairbrushes-types, .breadcrumbs, .product, .gallery");
  animateElements.forEach((item) => {
    observer.observe(item);
  });
}
