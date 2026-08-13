"use strict";

window.addEventListener("load", load);

function load() {
  // 1. Вимикаємо автоматичне збереження позиції скролу браузером
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  // 2. Примусово скидаємо скрол у координати (0, 0)
  window.scrollTo(0, 0);

  /* Перевірка мобільного браузера */
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  /* Додавання класу touch для HTML, якщо браузер мобільний */
  function addTouchAttr() {
    // Додавання data-fls-touch для HTML, якщо браузер мобільний
    if (isMobile.any())
      document.documentElement.setAttribute("data-fls-touch", "");
  }
  // =========================================================
  // intersection observer
  const options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.1,
  };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const currentElement = entry.target;
      console.log("Is intersecting:", entry.isIntersecting, entry.target);
      if (entry.isIntersecting) {
        currentElement.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  const animateElements = document.querySelectorAll(
    ".header, .hero, .about__intro, .about__content, .header-projects, .body-projects, .gallery__header, .body-gallery__description, .item-gallery, .header-solutions, .picture-solutions__link, .header-collaboration__title, .collaboration__body, .info-founder__picture, .info-founder__content, .content-achievements__text, .stats-achievements__item, .team__title,.members-team, .article-blog, .header-insights__heading, .header-insights__carousel, .service-hero__content, .service-hero__picture, .offerings__header, .list-offerings__item, .header-advantages, .body-advantages, .testimonials__header, .content-testimonials__author, .content-testimonials__picture, .header-project__heading, .header-project__filter, .portfolio__gallery, .banner, .overview__details, .overview__view, .gallery-overview__first-block, .gallery-overview__second-block, .gallery-overview__item, .other-project__slider, .other-project__header, .contact__title, .body-contact__content, .body-contact__form, .responsive__picture, .responsive__hero",
  );
  animateElements.forEach((item) => {
    observer.observe(item);
  });

  // intersection observer 2
  const optionsSecond = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0,
  };
  const callbackSecond = (entries, observer) => {
    entries.forEach((entry) => {
      const currentElement = entry.target;
      console.log("Is intersecting:", entry.isIntersecting, entry.target);
      if (entry.isIntersecting) {
        currentElement.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  };

  const observerSecond = new IntersectionObserver(
    callbackSecond,
    optionsSecond,
  );
  const animatesElements = document.querySelectorAll(".portfolio__item");
  animatesElements.forEach((item) => {
    observerSecond.observe(item);
  });

  // ========================================================
  addTouchAttr();
  initStatistic();
  initProjectButton();
  initProjectPicture();
  moveImage();
  initSlider();
  projectSlider();
  // initSlider();
  // function initSlider() {
  //   const heroSlider = document.querySelector(".slider-hero");
  //   if (heroSlider) {
  //     const swiperHero = new Swiper(heroSlider, {
  //       spaceBetween: 24,
  //       centeredSlides: true,
  //       autoHeight: true,
  //       // loop:true,
  //       // autoplay: {
  //       //   delay: 2000,
  //       //   disableOnInteraction: false,
  //       // },
  //       pagination: {
  //         el: ".swiper-pagination",
  //         clickable: true,
  //       },
  //     });
  //   }
  // }
  function initStatistic() {
    const currentBlock = document.querySelector(".statistic-content");
    const mobileParent = document.querySelector(".about__title");
    const desktopParent = document.querySelector(".content-about");
    const desktopNextSibling = document.querySelector(".content-about__info");

    if (
      !currentBlock ||
      !mobileParent ||
      !desktopParent ||
      !desktopNextSibling
    ) {
      return;
    }
    const matchMedia = window.matchMedia(`(width <= 62em)`);
    matchMedia.addEventListener("change", function () {
      setStatistic();
    });
    setStatistic();

    function setStatistic() {
      if (matchMedia.matches) {
        mobileParent.insertAdjacentElement("afterend", currentBlock);
      } else {
        desktopParent.insertBefore(currentBlock, desktopNextSibling);
      }
    }
    setStatistic();
  }
  function initProjectButton() {
    const matchMedia = window.matchMedia(`(width <= 48em)`);
    //button header section
    const currentButton = document.querySelector(".header-projects__button");
    const desktopParent = document.querySelector(".header-projects");
    const mobileParent = document.querySelector(".gallery-projects");
    if (!currentButton || !mobileParent || !desktopParent) {
      return; // Якщо цих елементів немає на сторінці про нас — просто виходимо
    }
    // button gallery section
    const galleryBtn = document.querySelector(".body-gallery__button");
    const galleryParent = document.querySelector(".body-gallery__description");
    const galleryMobile = document.querySelector(".body-gallery");

    // button solutions section
    const solutionBtn = document.querySelector(".header-solutions__button");
    const solutionParent = document.querySelector(
      ".header-solutions__description",
    );
    const solutionMobile = document.querySelector(".solutions__body");

    matchMedia.addEventListener("change", function () {
      setButton(matchMedia.matches);
    });
    setButton();

    function setButton() {
      if (matchMedia.matches) {
        mobileParent.insertAdjacentElement("afterend", currentButton);
        galleryMobile.insertAdjacentElement("afterend", galleryBtn);
        solutionMobile.insertAdjacentElement("afterend", solutionBtn);
      } else {
        desktopParent.insertAdjacentElement("beforeend", currentButton);
        galleryParent.insertAdjacentElement("beforeend", galleryBtn);
        solutionParent.insertAdjacentElement("beforeend", solutionBtn);
      }
    }
    setButton();
  }
  function initProjectPicture() {
    const matchMedia = window.matchMedia(`(width <= 48em)`);
    const pictureElement = document.querySelector(".gallery-projects__picture");
    const pictureParent = document.querySelector(".gallery-projects");
    const pictureMobile = document.querySelector(".item-projects__text");

    if (!pictureElement || !pictureParent || !pictureMobile) {
      return;
    }

    matchMedia.addEventListener("change", function () {
      setPicture(matchMedia.matches);
    });
    setPicture();

    function setPicture() {
      if (matchMedia.matches) {
        pictureMobile.insertAdjacentElement("beforebegin", pictureElement);
      } else {
        pictureParent.insertAdjacentElement("afterbegin", pictureElement);
      }
    }
    setPicture();
  }

  function moveImage() {
    const matchMedia = window.matchMedia(`(width <58.75rem)`);
    const liEl = document.querySelectorAll(".list-offerings__item");
    liEl.forEach((li) => {
      const imageEl = li.querySelector(".content-item__picture");
      const imageMobileEl = li.querySelector(".item-offerings__inner");
      const imageParentEl = li.querySelector(".item-offerings__content");

      function setImage() {
        if (matchMedia.matches) {
          imageMobileEl.insertAdjacentElement("beforeend", imageEl);
        } else {
          imageParentEl.insertAdjacentElement("afterbegin", imageEl);
        }
      }
      matchMedia.addEventListener("change", function () {
        setImage(matchMedia.matches);
      });
      setImage();
    });
  }
  // клас для створення профілю працівника
  class WorkerProfile {
    constructor(dataWorkers) {
      this.dataWorkers = dataWorkers;
    }
    updateActiveProfile() {
      const avatar = document.querySelector(".members-team__avatar");
      if (avatar) avatar.src = this.dataWorkers.avatar;
      const workerName = document.querySelector(
        ".members-team__name .members-team__name-link",
      );
      if (workerName) workerName.innerText = this.dataWorkers.name;
      const workerPosition = document.querySelector(".members-team__position");
      if (workerPosition) workerPosition.innerText = this.dataWorkers.position;
      const workerIns = document.querySelector(".social__inst");
      if (workerIns) workerIns.href = this.dataWorkers.socials.instagram;
      const workerLink = document.querySelector(".social__linkedin");
      if (workerLink) workerLink.href = this.dataWorkers.socials.linkedin;
      const workerGmail = document.querySelector(".social__gmail");
      if (workerGmail) workerGmail.href = this.dataWorkers.socials.mail;
    }
    render() {
      this.updateActiveProfile();
    }
  }
  // клас для створення галареї працівників
  class TeamGallery {
    constructor(workersData) {
      this.workersData = workersData;
    }
    createImageElement(worker) {
      const buttonEl = document.createElement("button");
      buttonEl.dataset.id = worker.id;
      buttonEl.className = "gallery-team__item";
      const image = document.createElement("img");
      image.className = "gallery-team__img";
      image.src = worker.avatar;
      image.alt = worker.name;
      buttonEl.append(image);
      return buttonEl;
    }
    render() {
      const container = document.querySelector(".members-team__gallery");
      if (container) {
        container.innerHTML = "";
        this.workersData.forEach((worker) => {
          const card = this.createImageElement(worker);
          if (worker.id === 1) card.classList.add("active");
          container.append(card);
        });
        container.addEventListener("click", (event) => {
          const button = event.target.closest("button");
          if (button) {
            const activeEl = container.querySelector(".active");
            if (activeEl) {
              activeEl.classList.remove("active");
            }

            button.classList.add("active");
            const workerId = Number(button.dataset.id);
            const findWorker = this.workersData.find((w) => w.id === workerId);
            if (findWorker) {
              const newProfile = new WorkerProfile(findWorker);
              newProfile.render();
            }
          }
        });
      }
    }
  }
  // масив працівників
  const workers = [
    {
      id: 1,
      avatar: "images/team/Isabella_Clarke.jpg",
      name: "Isabella Clarke",
      position: "Project Manager",
      socials: {
        instagram: "https://...",
        linkedin: "https://...",
        mail: "mailto:...",
      },
    },
    {
      id: 2,
      avatar: "images/team/Emma_Hughes.jpg",
      name: "Emma Hughes",
      position: "Senior Architect",
      socials: {
        instagram: "https://...",
        linkedin: "https://...",
        mail: "mailto:...",
      },
    },
    {
      id: 3,
      avatar: "images/team/Lucas_Bennett.jpg",
      name: "Lucas Bennett",
      position: "Lead Interior Designer",
      socials: {
        instagram: "https://...",
        linkedin: "https://...",
        mail: "mailto:...",
      },
    },
    {
      id: 4,
      avatar: "images/team/Sofia_Turner.jpg",
      name: "Sophia Turner ",
      position: "Head of Sustainability",
      socials: {
        instagram: "https://...",
        linkedin: "https://...",
        mail: "mailto:...",
      },
    },
    {
      id: 5,
      avatar: "images/team/William_Hayes.jpg",
      name: "William Hayes",
      position: "Creative Director",
      socials: {
        instagram: "https://...",
        linkedin: "https://...",
        mail: "mailto:...",
      },
    },
    {
      id: 6,
      avatar: "images/team/Lilly_Paterson.jpg",
      name: "Lily Patterson",
      position: "Landscape Architect",
      socials: {
        instagram: "https://...",
        linkedin: "https://...",
        mail: "mailto:...",
      },
    },
    {
      id: 7,
      avatar: "images/team/Ethan_Moore.jpg",
      name: "Ethan Moore",
      position: "Principal Engineer",
      socials: {
        instagram: "https://...",
        linkedin: "https://...",
        mail: "mailto:...",
      },
    },
    {
      id: 8,
      avatar: "images/team/Olivia_Carter.jpg",
      name: "Olivia Carter",
      position: "Design Director",
      socials: {
        instagram: "https://...",
        linkedin: "https://...",
        mail: "mailto:...",
      },
    },
  ];
  const worker = new WorkerProfile(workers[0]);
  worker.render();

  const teamGallery = new TeamGallery(workers);
  teamGallery.render();
  // =====slider=================
  function initSlider() {
    const sliderContent = document.querySelector(".slider-advantages__content");
    const sliders = document.querySelectorAll(".slider-advantages__slide");

    const prevButton = document.querySelector(".navigation-slider__prev");
    const nextButton = document.querySelector(".navigation-slider__next");

    if (!sliderContent || !prevButton || !nextButton || sliders.length === 0)
      return;
    prevButton.addEventListener("click", (event) => {
      const sliderWidth = sliders[0].offsetWidth;
      const contentGap = getComputedStyle(sliderContent).gap;

      const gapValue = parseInt(contentGap);
      const scrollStep = sliderWidth + gapValue;

      sliderContent.scrollLeft -= scrollStep;
      console.log("scrollLeft", sliderContent.scrollLeft);
      console.log(sliderContent.scrollLeft);
    });
    nextButton.addEventListener("click", (event) => {
      const sliderWidth = sliders[0].offsetWidth;

      const contentGap = getComputedStyle(sliderContent).gap;

      const gapValue = parseInt(contentGap);
      const scrollStep = sliderWidth + gapValue;

      sliderContent.scrollLeft += scrollStep;
    });
    function updateButton() {
      if (sliderContent.scrollLeft <= 0) {
        prevButton.classList.add("start");
      } else {
        prevButton.classList.remove("start");
      }

      if (
        sliderContent.scrollLeft >=
        sliderContent.scrollWidth - sliderContent.clientWidth - 1
      ) {
        nextButton.classList.add("end");
      } else {
        nextButton.classList.remove("end");
      }
    }
    updateButton();
    sliderContent.addEventListener("scroll", (e) => {
      updateButton();
    });
  }
  // прослуховувач подій на документі

  document.addEventListener("click", documentAction);

  const headerElement = document.querySelector(".header");
  function documentAction(e) {
    const targetElement = e.target;
    if (targetElement.closest(".icon-menu")) {
      document.documentElement.toggleAttribute("data-menu-open");
    }

    // ------акордеон відкриття-----------------------
    if (targetElement.closest(".item-offerings__summary")) {
      e.preventDefault();
      const currentSummaryTitle = targetElement.closest(
        ".item-offerings__summary",
      );
      const parentSummaryEl = currentSummaryTitle.parentElement;
      const currentBodyEl = targetElement.closest(
        ".item-offerings__summary",
      ).nextElementSibling;
      if (!parentSummaryEl.open) {
        let detailsEl = document.querySelectorAll(".item-offerings__details");
        detailsEl.forEach((detail) => {
          if (detail !== parentSummaryEl && detail.open) {
            const bodyEl = detail.querySelector(".item-offerings__body");
            detail.classList.remove("item-offerings__details--open");
            const height = bodyEl.offsetHeight;
            bodyEl.style.cssText = `height: ${height}px; opacity:1`;
            bodyEl.offsetHeight;
            bodyEl.style.cssText = `height: 0; opacity: 0;`;

            setTimeout(() => {
              detail.open = false;
              bodyEl.style.cssText = ``;
            }, 500);
          }
        });

        parentSummaryEl.open = true;
        const currentBodyElHeight = currentBodyEl.offsetHeight;
        parentSummaryEl.classList.add("item-offerings__details--open");
        currentBodyEl.style.cssText = `height: 0; opacity: 0;`;
        currentBodyEl.offsetHeight;
        currentBodyEl.style.cssText = `height: ${currentBodyElHeight}px; opacity: 1;`;
      } else {
        const currentBodyElHeight = currentBodyEl.offsetHeight;
        parentSummaryEl.classList.remove("item-offerings__details--open");
        currentBodyEl.style.cssText = `height: ${currentBodyElHeight}px; opacity: 1;`;
        currentBodyEl.offsetHeight;
        currentBodyEl.style.cssText = `height: 0; opacity: 0;`;
        setTimeout(() => {
          parentSummaryEl.open = false;
          currentBodyEl.style.cssText = ``;
        }, 500);
      }
    }
  }
  // ======== calendar====================
  const monthContainer = document.querySelector(".month-carousel");
  const monthItems = document.querySelectorAll(".month-carousel__item");
  if (monthContainer) {
    monthContainer.addEventListener("click", (event) => {
      const itemMonth = event.target.closest(".month-carousel__item");
      if (itemMonth) {
        monthItems.forEach((item) => {
          item.classList.remove("active");
        });
        itemMonth.classList.add("active");
      }
    });
  }

  const yearsContainer = document.querySelector(".years-carousel");
  const yearsItems = document.querySelectorAll(".years-carousel__item");
  if (yearsContainer) {
    yearsContainer.addEventListener("click", (event) => {
      const yearItem = event.target.closest(".years-carousel__item");
      if (yearItem) {
        yearsItems.forEach((item) => {
          item.classList.remove("active");
        });
        yearItem.classList.add("active");
      }
    });
  }

  // =====project section================
  const listPortfolio = document.querySelector(".portfolio__list");
  const listItems = document.querySelectorAll(".portfolio__info");

  const portfolioGallery = document.querySelector(".portfolio__gallery");
  const galleryItems = document.querySelectorAll(".gallery-portfolio__picture");
  if (listPortfolio) {
    listPortfolio.addEventListener("click", (event) => {
      // event.preventDefault();
      const listItem = event.target.closest(".portfolio__info");
      if (listItem) {
        let listIndex = Array.from(listItems).indexOf(listItem);
        listItems.forEach((item) => {
          item.classList.remove("active");
        });
        listItems[listIndex].classList.add("active");

        galleryItems.forEach((item) => {
          item.classList.remove("active");
        });
        galleryItems[listIndex].classList.add("active");
      }
    });
  }

  const filterContainer = document.querySelector(".filter__years");
  const filterItems = document.querySelectorAll(".years-filter__item");
  if (filterContainer) {
    filterContainer.addEventListener("click", (event) => {
      const item = event.target.closest(".years-filter__item");
      if (item) {
        filterItems.forEach((item) => {
          item.classList.remove("active");
        });
        item.classList.add("active");
        item.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    });
  }

  // =======слайдер=========

  function projectSlider() {
    const projectContainer = document.querySelector(".other-project__slider");
    const projectSliderList = document.querySelector(".slider-project__list");
    const projectSliders = document.querySelectorAll(".slider-project__item");

    let activeSlider = 0;

    const prevBtn = document.querySelector(".navigator-slider__prev");
    const nextBtn = document.querySelector(".navigator-slider__next");

    if (!projectContainer || !projectSliders.length || !prevBtn || !nextBtn)
      return;
    function updateActiveSlider() {
      projectSliders.forEach((item, index) => {
        if (index === activeSlider) {
          item.classList.add("active");
          item.scrollIntoView({
            inline: "start",
            behavior: "smooth",
            block: "nearest",
          });
        } else {
          item.classList.remove("active");
        }
      });
      updateActiveSlidersButtons();
    }
    // updateActiveSlider();

    prevBtn.addEventListener("click", (event) => {
      if (activeSlider > 0) {
        activeSlider--;
      }
      updateActiveSlider();
    });
    nextBtn.addEventListener("click", (event) => {
      if (activeSlider < projectSliders.length - 1) {
        activeSlider++;
      }
      updateActiveSlider();
    });

    function updateActiveSlidersButtons() {
      if (projectSliderList.scrollLeft <= 0 || activeSlider === 0) {
        prevBtn.classList.add("start");
      } else {
        prevBtn.classList.remove("start");
      }

      if (
        projectSliderList.scrollLeft >=
          projectSliderList.scrollWidth - projectSliderList.clientWidth - 1 ||
        activeSlider === projectSliders.length - 1
      ) {
        nextBtn.classList.add("end");
      } else {
        nextBtn.classList.remove("end");
      }
    }
    updateActiveSlidersButtons();
    projectSliderList.addEventListener("scroll", (event) => {
      updateActiveSlidersButtons();
    });
  }

  document.querySelectorAll("[data-scroll-top]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  // ======= імітація відправки форми ===========

  function getAnswer() {
    const form = document.querySelector(".body-contact__form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        window.location.href = "indexThankYou.html" ;
      });
    }
  }
  getAnswer();
}
