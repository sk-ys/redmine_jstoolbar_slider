(() => {
  if (typeof jsToolBar === "undefined") return;

  function shiftTabElements(
    sliderButton,
    direction,
    continuous = false,
    complete = null
  ) {
    const $tabElements = $(sliderButton)
      .closest("div.jstTabs")
      .find("ul > li.tab-elements")
      .eq(0);

    // Calculate the amount of shift
    const shift = continuous ? 50 : $tabElements.width() / 2;

    // Shift
    $tabElements.animate(
      {
        scrollLeft:
          $tabElements.scrollLeft() + shift * (direction === "left" ? -1 : 1),
      },
      {
        easing: continuous ? "linear" : "swing",
        queue: false,
        start: () => {
          if (continuous) {
            $(sliderButton).addClass("continuous");
          } else {
            $(sliderButton).removeClass("continuous");
          }
        },
        complete: () => {
          setTimeout(() => {
            if (
              continuous &&
              $(sliderButton).hasClass("continuous") &&
              $(sliderButton).is(":hover") &&
              (direction === "left"
                ? $tabElements.scrollLeft() > 0
                : Math.ceil($tabElements.scrollLeft() + $tabElements.width()) <
                  $tabElements[0].scrollWidth)
            ) {
              shiftTabElements(sliderButton, direction, continuous, complete);
            } else {
              $(sliderButton).removeClass("continuous");
            }
          });
          if (typeof complete === "function") complete();
        },
      }
    );
  }

  function changeSliderButtonsVisibility(sliderButtons) {
    const $sliderButtons = $(sliderButtons);
    const tabElements = $sliderButtons.closest("ul").find("li.tab-elements")[0];

    if ($(tabElements).find(".jstElements.hidden").length > 0) {
      $sliderButtons.hide();
      return;
    }

    function isOverFlow() {
      return (
        tabElements.offsetWidth <
        tabElements.scrollWidth - $sliderButtons.parent().width()
      );
    }

    $sliderButtons
      .toggle(isOverFlow())
      .toggleClass("at-the-left", $(tabElements).scrollLeft() === 0)
      .toggleClass(
        "at-the-right",
        Math.ceil($(tabElements).scrollLeft() + $(tabElements).width()) >=
          tabElements.scrollWidth
      );
  }

  function addSliderButtonsToJstoolbar(tabsBlock) {
    const $tabsBlock = $(tabsBlock);
    if ($tabsBlock.find(".slider-buttons").length > 0) return;

    let shiftEventId = null;
    const mouseOverActionDelay = 1000;

    function generateButton(direction) {
      return $("<button/>")
        .attr("type", "button")
        .addClass(`icon shift-${direction}`)
        .on("click", (e) => {
          clearTimeout(shiftEventId);
          shiftTabElements(e.target, direction, false, () => {
            changeSliderButtonsVisibility($sliderButtons);
          });
        })
        .on("mouseover", (e) => {
          clearTimeout(shiftEventId);
          shiftEventId = setTimeout(() => {
            shiftTabElements(e.target, direction, true, () => {
              changeSliderButtonsVisibility($sliderButtons);
            });
          }, mouseOverActionDelay);
        })
        .on("mouseout", () => {
          clearTimeout(shiftEventId);
        });
    }

    // Generate slider buttons
    const $sliderButtons = $("<div/>")
      .addClass("slider-buttons")
      .addClass("jstElements")
      .append(generateButton("left"))
      .append(generateButton("right"));

    // Append slider buttons to jsToolBar
    $tabsBlock.children("ul").append($("<li/>").append($sliderButtons));

    // Dynamically control the visibility of slider using ResizeObserver
    new ResizeObserver(() => {
      const $sliderButtons = $tabsBlock.find(".slider-buttons");
      changeSliderButtonsVisibility($sliderButtons);
    }).observe($tabsBlock.find("li.tab-elements")[0]);

    // Set event to tabs buttons
    $tabsBlock.find("a.tab-edit, a.tab-preview").on("click", () => {
      setTimeout(() => {
        changeSliderButtonsVisibility($sliderButtons);
      });
    });
  }

  // Trigger to initialize the jsToolBar Slider
  const initJstoolbarSlider = {
    type: "init_jstoolbar_slider",
  };

  // Add to toolbar
  jsToolBar.prototype.elements = {
    ...jsToolBar.prototype.elements,
    init_jstoolbar_slider: initJstoolbarSlider,
  };

  jsToolBar.prototype.init_jstoolbar_slider = function () {
    addSliderButtonsToJstoolbar(this.tabsBlock);
  };
})();
