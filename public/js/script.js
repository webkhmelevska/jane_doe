!(function (e) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "undefined" != typeof exports
    ? (module.exports = e(require("jquery")))
    : e(jQuery);
})(function (e) {
  "use strict";
  var t,
    i = window.Slick || {};
  (t = 0),
    ((i = function (i, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: e(i),
        appendDots: e(i),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (t, i) {
          return e('<button type="button" />').text(i + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        e.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = e(i)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = e(i).data("slick") || {}),
        (n.options = e.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = e.proxy(n.autoPlay, n)),
        (n.autoPlayClear = e.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = e.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = e.proxy(n.changeSlide, n)),
        (n.clickHandler = e.proxy(n.clickHandler, n)),
        (n.selectHandler = e.proxy(n.selectHandler, n)),
        (n.setPosition = e.proxy(n.setPosition, n)),
        (n.swipeHandler = e.proxy(n.swipeHandler, n)),
        (n.dragHandler = e.proxy(n.dragHandler, n)),
        (n.keyHandler = e.proxy(n.keyHandler, n)),
        (n.instanceUid = t++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    }).prototype.activateADA = function () {
      this.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
    (i.prototype.addSlide = i.prototype.slickAdd =
      function (t, i, o) {
        var s = this;
        if ("boolean" == typeof i) (o = i), (i = null);
        else if (i < 0 || i >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof i
            ? 0 === i && 0 === s.$slides.length
              ? e(t).appendTo(s.$slideTrack)
              : o
              ? e(t).insertBefore(s.$slides.eq(i))
              : e(t).insertAfter(s.$slides.eq(i))
            : !0 === o
            ? e(t).prependTo(s.$slideTrack)
            : e(t).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (t, i) {
            e(i).attr("data-slick-index", t);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (i.prototype.animateHeight = function () {
      var e = this;
      if (
        1 === e.options.slidesToShow &&
        !0 === e.options.adaptiveHeight &&
        !1 === e.options.vertical
      ) {
        var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
        e.$list.animate({ height: t }, e.options.speed);
      }
    }),
    (i.prototype.animateSlide = function (t, i) {
      var o = {},
        s = this;
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (t = -t),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: t },
                s.options.speed,
                s.options.easing,
                i
              )
            : s.$slideTrack.animate(
                { top: t },
                s.options.speed,
                s.options.easing,
                i
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            e({ animStart: s.currentLeft }).animate(
              { animStart: t },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (e) {
                  (e = Math.ceil(e)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = "translate(" + e + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + e + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  i && i.call();
                },
              }
            ))
          : (s.applyTransition(),
            (t = Math.ceil(t)),
            !1 === s.options.vertical
              ? (o[s.animType] = "translate3d(" + t + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + t + "px, 0px)"),
            s.$slideTrack.css(o),
            i &&
              setTimeout(function () {
                s.disableTransition(), i.call();
              }, s.options.speed));
    }),
    (i.prototype.getNavTarget = function () {
      var t = this.options.asNavFor;
      return t && null !== t && (t = e(t).not(this.$slider)), t;
    }),
    (i.prototype.asNavFor = function (t) {
      var i = this.getNavTarget();
      null !== i &&
        "object" == typeof i &&
        i.each(function () {
          var i = e(this).slick("getSlick");
          i.unslicked || i.slideHandler(t, !0);
        });
    }),
    (i.prototype.applyTransition = function (e) {
      var t = this,
        i = {};
      !1 === t.options.fade
        ? (i[t.transitionType] =
            t.transformType + " " + t.options.speed + "ms " + t.options.cssEase)
        : (i[t.transitionType] =
            "opacity " + t.options.speed + "ms " + t.options.cssEase),
        !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i);
    }),
    (i.prototype.autoPlay = function () {
      var e = this;
      e.autoPlayClear(),
        e.slideCount > e.options.slidesToShow &&
          (e.autoPlayTimer = setInterval(
            e.autoPlayIterator,
            e.options.autoplaySpeed
          ));
    }),
    (i.prototype.autoPlayClear = function () {
      this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    }),
    (i.prototype.autoPlayIterator = function () {
      var e = this,
        t = e.currentSlide + e.options.slidesToScroll;
      e.paused ||
        e.interrupted ||
        e.focussed ||
        (!1 === e.options.infinite &&
          (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1
            ? (e.direction = 0)
            : 0 === e.direction &&
              ((t = e.currentSlide - e.options.slidesToScroll),
              e.currentSlide - 1 == 0 && (e.direction = 1))),
        e.slideHandler(t));
    }),
    (i.prototype.buildArrows = function () {
      var t = this;
      !0 === t.options.arrows &&
        ((t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow")),
        (t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow")),
        t.slideCount > t.options.slidesToShow
          ? (t.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            t.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            t.htmlExpr.test(t.options.prevArrow) &&
              t.$prevArrow.prependTo(t.options.appendArrows),
            t.htmlExpr.test(t.options.nextArrow) &&
              t.$nextArrow.appendTo(t.options.appendArrows),
            !0 !== t.options.infinite &&
              t.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : t.$prevArrow
              .add(t.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (i.prototype.buildDots = function () {
      var t,
        i,
        o = this;
      if (!0 === o.options.dots && o.slideCount > o.options.slidesToShow) {
        for (
          o.$slider.addClass("slick-dotted"),
            i = e("<ul />").addClass(o.options.dotsClass),
            t = 0;
          t <= o.getDotCount();
          t += 1
        )
          i.append(e("<li />").append(o.options.customPaging.call(this, o, t)));
        (o.$dots = i.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (i.prototype.buildOut = function () {
      var t = this;
      (t.$slides = t.$slider
        .children(t.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (t.slideCount = t.$slides.length),
        t.$slides.each(function (t, i) {
          e(i)
            .attr("data-slick-index", t)
            .data("originalStyling", e(i).attr("style") || "");
        }),
        t.$slider.addClass("slick-slider"),
        (t.$slideTrack =
          0 === t.slideCount
            ? e('<div class="slick-track"/>').appendTo(t.$slider)
            : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        t.$slideTrack.css("opacity", 0),
        (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) ||
          (t.options.slidesToScroll = 1),
        e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
        t.setupInfinite(),
        t.buildArrows(),
        t.buildDots(),
        t.updateDots(),
        t.setSlideClasses(
          "number" == typeof t.currentSlide ? t.currentSlide : 0
        ),
        !0 === t.options.draggable && t.$list.addClass("draggable");
    }),
    (i.prototype.buildRows = function () {
      var e,
        t,
        i,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 0)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            e = 0;
          e < s;
          e++
        ) {
          var a = document.createElement("div");
          for (t = 0; t < l.options.rows; t++) {
            var d = document.createElement("div");
            for (i = 0; i < l.options.slidesPerRow; i++) {
              var c = e * r + (t * l.options.slidesPerRow + i);
              n.get(c) && d.appendChild(n.get(c));
            }
            a.appendChild(d);
          }
          o.appendChild(a);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (i.prototype.checkResponsive = function (t, i) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        a = r.$slider.width(),
        d = window.innerWidth || e(window).width();
      if (
        ("window" === r.respondTo
          ? (n = d)
          : "slider" === r.respondTo
          ? (n = a)
          : "min" === r.respondTo && (n = Math.min(d, a)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        for (o in ((s = null), r.breakpoints))
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || i) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = e.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === t && (r.currentSlide = r.options.initialSlide),
                  r.refresh(t)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = e.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === t && (r.currentSlide = r.options.initialSlide),
                  r.refresh(t)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === t && (r.currentSlide = r.options.initialSlide),
            r.refresh(t),
            (l = s)),
          t || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (i.prototype.changeSlide = function (t, i) {
      var o,
        s,
        n = this,
        r = e(t.currentTarget);
      switch (
        (r.is("a") && t.preventDefault(),
        r.is("li") || (r = r.closest("li")),
        (o =
          n.slideCount % n.options.slidesToScroll != 0
            ? 0
            : (n.slideCount - n.currentSlide) % n.options.slidesToScroll),
        t.data.message)
      ) {
        case "previous":
          (s = 0 === o ? n.options.slidesToScroll : n.options.slidesToShow - o),
            n.slideCount > n.options.slidesToShow &&
              n.slideHandler(n.currentSlide - s, !1, i);
          break;
        case "next":
          (s = 0 === o ? n.options.slidesToScroll : o),
            n.slideCount > n.options.slidesToShow &&
              n.slideHandler(n.currentSlide + s, !1, i);
          break;
        case "index":
          var l =
            0 === t.data.index
              ? 0
              : t.data.index || r.index() * n.options.slidesToScroll;
          n.slideHandler(n.checkNavigable(l), !1, i),
            r.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (i.prototype.checkNavigable = function (e) {
      var t, i;
      if (((i = 0), e > (t = this.getNavigableIndexes())[t.length - 1]))
        e = t[t.length - 1];
      else
        for (var o in t) {
          if (e < t[o]) {
            e = i;
            break;
          }
          i = t[o];
        }
      return e;
    }),
    (i.prototype.cleanUpEvents = function () {
      var t = this;
      t.options.dots &&
        null !== t.$dots &&
        (e("li", t.$dots)
          .off("click.slick", t.changeSlide)
          .off("mouseenter.slick", e.proxy(t.interrupt, t, !0))
          .off("mouseleave.slick", e.proxy(t.interrupt, t, !1)),
        !0 === t.options.accessibility &&
          t.$dots.off("keydown.slick", t.keyHandler)),
        t.$slider.off("focus.slick blur.slick"),
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
          t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide),
          !0 === t.options.accessibility &&
            (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler),
            t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))),
        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
        t.$list.off("click.slick", t.clickHandler),
        e(document).off(t.visibilityChange, t.visibility),
        t.cleanUpSlideEvents(),
        !0 === t.options.accessibility &&
          t.$list.off("keydown.slick", t.keyHandler),
        !0 === t.options.focusOnSelect &&
          e(t.$slideTrack).children().off("click.slick", t.selectHandler),
        e(window).off(
          "orientationchange.slick.slick-" + t.instanceUid,
          t.orientationChange
        ),
        e(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
        e("[draggable!=true]", t.$slideTrack).off(
          "dragstart",
          t.preventDefault
        ),
        e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
    }),
    (i.prototype.cleanUpSlideEvents = function () {
      var t = this;
      t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
        t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1));
    }),
    (i.prototype.cleanUpRows = function () {
      var e,
        t = this;
      t.options.rows > 0 &&
        ((e = t.$slides.children().children()).removeAttr("style"),
        t.$slider.empty().append(e));
    }),
    (i.prototype.clickHandler = function (e) {
      !1 === this.shouldClick &&
        (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
    }),
    (i.prototype.destroy = function (t) {
      var i = this;
      i.autoPlayClear(),
        (i.touchObject = {}),
        i.cleanUpEvents(),
        e(".slick-cloned", i.$slider).detach(),
        i.$dots && i.$dots.remove(),
        i.$prevArrow &&
          i.$prevArrow.length &&
          (i.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
        i.$nextArrow &&
          i.$nextArrow.length &&
          (i.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
        i.$slides &&
          (i.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              e(this).attr("style", e(this).data("originalStyling"));
            }),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slideTrack.detach(),
          i.$list.detach(),
          i.$slider.append(i.$slides)),
        i.cleanUpRows(),
        i.$slider.removeClass("slick-slider"),
        i.$slider.removeClass("slick-initialized"),
        i.$slider.removeClass("slick-dotted"),
        (i.unslicked = !0),
        t || i.$slider.trigger("destroy", [i]);
    }),
    (i.prototype.disableTransition = function (e) {
      var t = this,
        i = {};
      (i[t.transitionType] = ""),
        !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i);
    }),
    (i.prototype.fadeSlide = function (e, t) {
      var i = this;
      !1 === i.cssTransitions
        ? (i.$slides.eq(e).css({ zIndex: i.options.zIndex }),
          i.$slides
            .eq(e)
            .animate({ opacity: 1 }, i.options.speed, i.options.easing, t))
        : (i.applyTransition(e),
          i.$slides.eq(e).css({ opacity: 1, zIndex: i.options.zIndex }),
          t &&
            setTimeout(function () {
              i.disableTransition(e), t.call();
            }, i.options.speed));
    }),
    (i.prototype.fadeSlideOut = function (e) {
      var t = this;
      !1 === t.cssTransitions
        ? t.$slides
            .eq(e)
            .animate(
              { opacity: 0, zIndex: t.options.zIndex - 2 },
              t.options.speed,
              t.options.easing
            )
        : (t.applyTransition(e),
          t.$slides.eq(e).css({ opacity: 0, zIndex: t.options.zIndex - 2 }));
    }),
    (i.prototype.filterSlides = i.prototype.slickFilter =
      function (e) {
        var t = this;
        null !== e &&
          ((t.$slidesCache = t.$slides),
          t.unload(),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slidesCache.filter(e).appendTo(t.$slideTrack),
          t.reinit());
      }),
    (i.prototype.focusHandler = function () {
      var t = this;
      t.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick", "*", function (i) {
          var o = e(this);
          setTimeout(function () {
            t.options.pauseOnFocus &&
              o.is(":focus") &&
              ((t.focussed = !0), t.autoPlay());
          }, 0);
        })
        .on("blur.slick", "*", function (i) {
          e(this), t.options.pauseOnFocus && ((t.focussed = !1), t.autoPlay());
        });
    }),
    (i.prototype.getCurrent = i.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (i.prototype.getDotCount = function () {
      var e = this,
        t = 0,
        i = 0,
        o = 0;
      if (!0 === e.options.infinite)
        if (e.slideCount <= e.options.slidesToShow) ++o;
        else
          for (; t < e.slideCount; )
            ++o,
              (t = i + e.options.slidesToScroll),
              (i +=
                e.options.slidesToScroll <= e.options.slidesToShow
                  ? e.options.slidesToScroll
                  : e.options.slidesToShow);
      else if (!0 === e.options.centerMode) o = e.slideCount;
      else if (e.options.asNavFor)
        for (; t < e.slideCount; )
          ++o,
            (t = i + e.options.slidesToScroll),
            (i +=
              e.options.slidesToScroll <= e.options.slidesToShow
                ? e.options.slidesToScroll
                : e.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll
          );
      return o - 1;
    }),
    (i.prototype.getLeft = function (e) {
      var t,
        i,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (i = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = i * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              e + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (e > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (e - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (e - n.slideCount)) * i * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * i * -1))))
          : e + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (e + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (e + n.options.slidesToShow - n.slideCount) * i)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (t =
          !1 === n.options.vertical
            ? e * n.slideWidth * -1 + n.slideOffset
            : e * i * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(e)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(e + n.options.slidesToShow)),
          (t =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(e)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(e + n.options.slidesToShow + 1)),
            (t =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (t += (n.$list.width() - o.outerWidth()) / 2))),
        t
      );
    }),
    (i.prototype.getOption = i.prototype.slickGetOption =
      function (e) {
        return this.options[e];
      }),
    (i.prototype.getNavigableIndexes = function () {
      var e,
        t = this,
        i = 0,
        o = 0,
        s = [];
      for (
        !1 === t.options.infinite
          ? (e = t.slideCount)
          : ((i = -1 * t.options.slidesToScroll),
            (o = -1 * t.options.slidesToScroll),
            (e = 2 * t.slideCount));
        i < e;

      )
        s.push(i),
          (i = o + t.options.slidesToScroll),
          (o +=
            t.options.slidesToScroll <= t.options.slidesToShow
              ? t.options.slidesToScroll
              : t.options.slidesToShow);
      return s;
    }),
    (i.prototype.getSlick = function () {
      return this;
    }),
    (i.prototype.getSlideCount = function () {
      var t,
        i,
        o,
        s = this;
      return (
        (o = !0 === s.options.centerMode ? Math.floor(s.$list.width() / 2) : 0),
        (i = -1 * s.swipeLeft + o),
        !0 === s.options.swipeToSlide
          ? (s.$slideTrack.find(".slick-slide").each(function (o, n) {
              var r, l;
              if (
                ((r = e(n).outerWidth()),
                (l = n.offsetLeft),
                !0 !== s.options.centerMode && (l += r / 2),
                i < l + r)
              )
                return (t = n), !1;
            }),
            Math.abs(e(t).attr("data-slick-index") - s.currentSlide) || 1)
          : s.options.slidesToScroll
      );
    }),
    (i.prototype.goTo = i.prototype.slickGoTo =
      function (e, t) {
        this.changeSlide({ data: { message: "index", index: parseInt(e) } }, t);
      }),
    (i.prototype.init = function (t) {
      var i = this;
      e(i.$slider).hasClass("slick-initialized") ||
        (e(i.$slider).addClass("slick-initialized"),
        i.buildRows(),
        i.buildOut(),
        i.setProps(),
        i.startLoad(),
        i.loadSlider(),
        i.initializeEvents(),
        i.updateArrows(),
        i.updateDots(),
        i.checkResponsive(!0),
        i.focusHandler()),
        t && i.$slider.trigger("init", [i]),
        !0 === i.options.accessibility && i.initADA(),
        i.options.autoplay && ((i.paused = !1), i.autoPlay());
    }),
    (i.prototype.initADA = function () {
      var t = this,
        i = Math.ceil(t.slideCount / t.options.slidesToShow),
        o = t.getNavigableIndexes().filter(function (e) {
          return e >= 0 && e < t.slideCount;
        });
      t.$slides
        .add(t.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== t.$dots &&
          (t.$slides
            .not(t.$slideTrack.find(".slick-cloned"))
            .each(function (i) {
              var s = o.indexOf(i);
              if (
                (e(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + t.instanceUid + i,
                  tabindex: -1,
                }),
                -1 !== s)
              ) {
                var n = "slick-slide-control" + t.instanceUid + s;
                e("#" + n).length && e(this).attr({ "aria-describedby": n });
              }
            }),
          t.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              e(this).attr({ role: "presentation" }),
                e(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + t.instanceUid + s,
                    "aria-controls": "slick-slide" + t.instanceUid + n,
                    "aria-label": s + 1 + " of " + i,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(t.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = t.currentSlide, n = s + t.options.slidesToShow; s < n; s++)
        t.options.focusOnChange
          ? t.$slides.eq(s).attr({ tabindex: "0" })
          : t.$slides.eq(s).removeAttr("tabindex");
      t.activateADA();
    }),
    (i.prototype.initArrowEvents = function () {
      var e = this;
      !0 === e.options.arrows &&
        e.slideCount > e.options.slidesToShow &&
        (e.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, e.changeSlide),
        e.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, e.changeSlide),
        !0 === e.options.accessibility &&
          (e.$prevArrow.on("keydown.slick", e.keyHandler),
          e.$nextArrow.on("keydown.slick", e.keyHandler)));
    }),
    (i.prototype.initDotEvents = function () {
      var t = this;
      !0 === t.options.dots &&
        t.slideCount > t.options.slidesToShow &&
        (e("li", t.$dots).on(
          "click.slick",
          { message: "index" },
          t.changeSlide
        ),
        !0 === t.options.accessibility &&
          t.$dots.on("keydown.slick", t.keyHandler)),
        !0 === t.options.dots &&
          !0 === t.options.pauseOnDotsHover &&
          t.slideCount > t.options.slidesToShow &&
          e("li", t.$dots)
            .on("mouseenter.slick", e.proxy(t.interrupt, t, !0))
            .on("mouseleave.slick", e.proxy(t.interrupt, t, !1));
    }),
    (i.prototype.initSlideEvents = function () {
      var t = this;
      t.options.pauseOnHover &&
        (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
        t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)));
    }),
    (i.prototype.initializeEvents = function () {
      var t = this;
      t.initArrowEvents(),
        t.initDotEvents(),
        t.initSlideEvents(),
        t.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          t.swipeHandler
        ),
        t.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          t.swipeHandler
        ),
        t.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          t.swipeHandler
        ),
        t.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          t.swipeHandler
        ),
        t.$list.on("click.slick", t.clickHandler),
        e(document).on(t.visibilityChange, e.proxy(t.visibility, t)),
        !0 === t.options.accessibility &&
          t.$list.on("keydown.slick", t.keyHandler),
        !0 === t.options.focusOnSelect &&
          e(t.$slideTrack).children().on("click.slick", t.selectHandler),
        e(window).on(
          "orientationchange.slick.slick-" + t.instanceUid,
          e.proxy(t.orientationChange, t)
        ),
        e(window).on(
          "resize.slick.slick-" + t.instanceUid,
          e.proxy(t.resize, t)
        ),
        e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault),
        e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
        e(t.setPosition);
    }),
    (i.prototype.initUI = function () {
      var e = this;
      !0 === e.options.arrows &&
        e.slideCount > e.options.slidesToShow &&
        (e.$prevArrow.show(), e.$nextArrow.show()),
        !0 === e.options.dots &&
          e.slideCount > e.options.slidesToShow &&
          e.$dots.show();
    }),
    (i.prototype.keyHandler = function (e) {
      var t = this;
      e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === e.keyCode && !0 === t.options.accessibility
          ? t.changeSlide({
              data: { message: !0 === t.options.rtl ? "next" : "previous" },
            })
          : 39 === e.keyCode &&
            !0 === t.options.accessibility &&
            t.changeSlide({
              data: { message: !0 === t.options.rtl ? "previous" : "next" },
            }));
    }),
    (i.prototype.lazyLoad = function () {
      function t(t) {
        e("img[data-lazy]", t).each(function () {
          var t = e(this),
            i = e(this).attr("data-lazy"),
            o = e(this).attr("data-srcset"),
            s = e(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
          (r.onload = function () {
            t.animate({ opacity: 0 }, 100, function () {
              o && (t.attr("srcset", o), s && t.attr("sizes", s)),
                t.attr("src", i).animate({ opacity: 1 }, 200, function () {
                  t.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, t, i]);
            });
          }),
            (r.onerror = function () {
              t
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, t, i]);
            }),
            (r.src = i);
        });
      }
      var i,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1)
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (i = n.$slider.find(".slick-slide").slice(o, s)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, a = n.$slider.find(".slick-slide"), d = 0;
          d < n.options.slidesToScroll;
          d++
        )
          r < 0 && (r = n.slideCount - 1),
            (i = (i = i.add(a.eq(r))).add(a.eq(l))),
            r--,
            l++;
      t(i),
        n.slideCount <= n.options.slidesToShow
          ? t(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? t(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            t(
              n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
            );
    }),
    (i.prototype.loadSlider = function () {
      var e = this;
      e.setPosition(),
        e.$slideTrack.css({ opacity: 1 }),
        e.$slider.removeClass("slick-loading"),
        e.initUI(),
        "progressive" === e.options.lazyLoad && e.progressiveLazyLoad();
    }),
    (i.prototype.next = i.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (i.prototype.orientationChange = function () {
      this.checkResponsive(), this.setPosition();
    }),
    (i.prototype.pause = i.prototype.slickPause =
      function () {
        this.autoPlayClear(), (this.paused = !0);
      }),
    (i.prototype.play = i.prototype.slickPlay =
      function () {
        var e = this;
        e.autoPlay(),
          (e.options.autoplay = !0),
          (e.paused = !1),
          (e.focussed = !1),
          (e.interrupted = !1);
      }),
    (i.prototype.postSlide = function (t) {
      var i = this;
      !i.unslicked &&
        (i.$slider.trigger("afterChange", [i, t]),
        (i.animating = !1),
        i.slideCount > i.options.slidesToShow && i.setPosition(),
        (i.swipeLeft = null),
        i.options.autoplay && i.autoPlay(),
        !0 === i.options.accessibility &&
          (i.initADA(), i.options.focusOnChange)) &&
        e(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus();
    }),
    (i.prototype.prev = i.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (i.prototype.preventDefault = function (e) {
      e.preventDefault();
    }),
    (i.prototype.progressiveLazyLoad = function (t) {
      t = t || 1;
      var i,
        o,
        s,
        n,
        r,
        l = this,
        a = e("img[data-lazy]", l.$slider);
      a.length
        ? ((i = a.first()),
          (o = i.attr("data-lazy")),
          (s = i.attr("data-srcset")),
          (n = i.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((r = document.createElement("img")).onload = function () {
            s && (i.attr("srcset", s), n && i.attr("sizes", n)),
              i
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, i, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            t < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(t + 1);
                }, 500)
              : (i
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, i, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (i.prototype.refresh = function (t) {
      var i,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (i = s.currentSlide),
        s.destroy(!0),
        e.extend(s, s.initials, { currentSlide: i }),
        s.init(),
        t || s.changeSlide({ data: { message: "index", index: i } }, !1);
    }),
    (i.prototype.registerBreakpoints = function () {
      var t,
        i,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === e.type(n) && n.length) {
        for (t in ((s.respondTo = s.options.respondTo || "window"), n))
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(t))) {
            for (i = n[t].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === i &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(i), (s.breakpointSettings[i] = n[t].settings);
          }
        s.breakpoints.sort(function (e, t) {
          return s.options.mobileFirst ? e - t : t - e;
        });
      }
    }),
    (i.prototype.reinit = function () {
      var t = this;
      (t.$slides = t.$slideTrack
        .children(t.options.slide)
        .addClass("slick-slide")),
        (t.slideCount = t.$slides.length),
        t.currentSlide >= t.slideCount &&
          0 !== t.currentSlide &&
          (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
        t.registerBreakpoints(),
        t.setProps(),
        t.setupInfinite(),
        t.buildArrows(),
        t.updateArrows(),
        t.initArrowEvents(),
        t.buildDots(),
        t.updateDots(),
        t.initDotEvents(),
        t.cleanUpSlideEvents(),
        t.initSlideEvents(),
        t.checkResponsive(!1, !0),
        !0 === t.options.focusOnSelect &&
          e(t.$slideTrack).children().on("click.slick", t.selectHandler),
        t.setSlideClasses(
          "number" == typeof t.currentSlide ? t.currentSlide : 0
        ),
        t.setPosition(),
        t.focusHandler(),
        (t.paused = !t.options.autoplay),
        t.autoPlay(),
        t.$slider.trigger("reInit", [t]);
    }),
    (i.prototype.resize = function () {
      var t = this;
      e(window).width() !== t.windowWidth &&
        (clearTimeout(t.windowDelay),
        (t.windowDelay = window.setTimeout(function () {
          (t.windowWidth = e(window).width()),
            t.checkResponsive(),
            t.unslicked || t.setPosition();
        }, 50)));
    }),
    (i.prototype.removeSlide = i.prototype.slickRemove =
      function (e, t, i) {
        var o = this;
        return (
          (e =
            "boolean" == typeof e
              ? !0 === (t = e)
                ? 0
                : o.slideCount - 1
              : !0 === t
              ? --e
              : e),
          !(o.slideCount < 1 || e < 0 || e > o.slideCount - 1) &&
            (o.unload(),
            !0 === i
              ? o.$slideTrack.children().remove()
              : o.$slideTrack.children(this.options.slide).eq(e).remove(),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            (o.$slidesCache = o.$slides),
            void o.reinit())
        );
      }),
    (i.prototype.setCSS = function (e) {
      var t,
        i,
        o = this,
        s = {};
      !0 === o.options.rtl && (e = -e),
        (t = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px"),
        (i = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px"),
        (s[o.positionProp] = e),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = "translate(" + t + ", " + i + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + t + ", " + i + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (i.prototype.setDimensions = function () {
      var e = this;
      !1 === e.options.vertical
        ? !0 === e.options.centerMode &&
          e.$list.css({ padding: "0px " + e.options.centerPadding })
        : (e.$list.height(
            e.$slides.first().outerHeight(!0) * e.options.slidesToShow
          ),
          !0 === e.options.centerMode &&
            e.$list.css({ padding: e.options.centerPadding + " 0px" })),
        (e.listWidth = e.$list.width()),
        (e.listHeight = e.$list.height()),
        !1 === e.options.vertical && !1 === e.options.variableWidth
          ? ((e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow)),
            e.$slideTrack.width(
              Math.ceil(
                e.slideWidth * e.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === e.options.variableWidth
          ? e.$slideTrack.width(5e3 * e.slideCount)
          : ((e.slideWidth = Math.ceil(e.listWidth)),
            e.$slideTrack.height(
              Math.ceil(
                e.$slides.first().outerHeight(!0) *
                  e.$slideTrack.children(".slick-slide").length
              )
            ));
      var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
      !1 === e.options.variableWidth &&
        e.$slideTrack.children(".slick-slide").width(e.slideWidth - t);
    }),
    (i.prototype.setFade = function () {
      var t,
        i = this;
      i.$slides.each(function (o, s) {
        (t = i.slideWidth * o * -1),
          !0 === i.options.rtl
            ? e(s).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0,
              })
            : e(s).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0,
              });
      }),
        i.$slides
          .eq(i.currentSlide)
          .css({ zIndex: i.options.zIndex - 1, opacity: 1 });
    }),
    (i.prototype.setHeight = function () {
      var e = this;
      if (
        1 === e.options.slidesToShow &&
        !0 === e.options.adaptiveHeight &&
        !1 === e.options.vertical
      ) {
        var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
        e.$list.css("height", t);
      }
    }),
    (i.prototype.setOption = i.prototype.slickSetOption =
      function () {
        var t,
          i,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === e.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === e.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === e.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          e.each(o, function (e, t) {
            r.options[e] = t;
          });
        else if ("responsive" === n)
          for (i in s)
            if ("array" !== e.type(r.options.responsive))
              r.options.responsive = [s[i]];
            else {
              for (t = r.options.responsive.length - 1; t >= 0; )
                r.options.responsive[t].breakpoint === s[i].breakpoint &&
                  r.options.responsive.splice(t, 1),
                  t--;
              r.options.responsive.push(s[i]);
            }
        l && (r.unload(), r.reinit());
      }),
    (i.prototype.setPosition = function () {
      var e = this;
      e.setDimensions(),
        e.setHeight(),
        !1 === e.options.fade
          ? e.setCSS(e.getLeft(e.currentSlide))
          : e.setFade(),
        e.$slider.trigger("setPosition", [e]);
    }),
    (i.prototype.setProps = function () {
      var e = this,
        t = document.body.style;
      (e.positionProp = !0 === e.options.vertical ? "top" : "left"),
        "top" === e.positionProp
          ? e.$slider.addClass("slick-vertical")
          : e.$slider.removeClass("slick-vertical"),
        (void 0 === t.WebkitTransition &&
          void 0 === t.MozTransition &&
          void 0 === t.msTransition) ||
          (!0 === e.options.useCSS && (e.cssTransitions = !0)),
        e.options.fade &&
          ("number" == typeof e.options.zIndex
            ? e.options.zIndex < 3 && (e.options.zIndex = 3)
            : (e.options.zIndex = e.defaults.zIndex)),
        void 0 !== t.OTransform &&
          ((e.animType = "OTransform"),
          (e.transformType = "-o-transform"),
          (e.transitionType = "OTransition"),
          void 0 === t.perspectiveProperty &&
            void 0 === t.webkitPerspective &&
            (e.animType = !1)),
        void 0 !== t.MozTransform &&
          ((e.animType = "MozTransform"),
          (e.transformType = "-moz-transform"),
          (e.transitionType = "MozTransition"),
          void 0 === t.perspectiveProperty &&
            void 0 === t.MozPerspective &&
            (e.animType = !1)),
        void 0 !== t.webkitTransform &&
          ((e.animType = "webkitTransform"),
          (e.transformType = "-webkit-transform"),
          (e.transitionType = "webkitTransition"),
          void 0 === t.perspectiveProperty &&
            void 0 === t.webkitPerspective &&
            (e.animType = !1)),
        void 0 !== t.msTransform &&
          ((e.animType = "msTransform"),
          (e.transformType = "-ms-transform"),
          (e.transitionType = "msTransition"),
          void 0 === t.msTransform && (e.animType = !1)),
        void 0 !== t.transform &&
          !1 !== e.animType &&
          ((e.animType = "transform"),
          (e.transformType = "transform"),
          (e.transitionType = "transition")),
        (e.transformsEnabled =
          e.options.useTransform && null !== e.animType && !1 !== e.animType);
    }),
    (i.prototype.setSlideClasses = function (e) {
      var t,
        i,
        o,
        s,
        n = this;
      if (
        ((i = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(e).addClass("slick-current"),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        (t = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (e >= t && e <= n.slideCount - 1 - t
              ? n.$slides
                  .slice(e - t + r, e + t + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + e),
                i
                  .slice(o - t + 1 + r, o + t + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === e
              ? i
                  .eq(i.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : e === n.slideCount - 1 &&
                i.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(e).addClass("slick-center");
      } else
        e >= 0 && e <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(e, e + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : i.length <= n.options.slidesToShow
          ? i.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + e : e),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - e < n.options.slidesToShow
              ? i
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : i
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (i.prototype.setupInfinite = function () {
      var t,
        i,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((i = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            t = s.slideCount;
          t > s.slideCount - o;
          t -= 1
        )
          (i = t - 1),
            e(s.$slides[i])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", i - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (t = 0; t < o + s.slideCount; t += 1)
          (i = t),
            e(s.$slides[i])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", i + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            e(this).attr("id", "");
          });
      }
    }),
    (i.prototype.interrupt = function (e) {
      e || this.autoPlay(), (this.interrupted = e);
    }),
    (i.prototype.selectHandler = function (t) {
      var i = this,
        o = e(t.target).is(".slick-slide")
          ? e(t.target)
          : e(t.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      return (
        s || (s = 0),
        i.slideCount <= i.options.slidesToShow
          ? void i.slideHandler(s, !1, !0)
          : void i.slideHandler(s)
      );
    }),
    (i.prototype.slideHandler = function (e, t, i) {
      var o,
        s,
        n,
        r,
        l,
        a = null,
        d = this;
      if (
        ((t = t || !1),
        !(
          (!0 === d.animating && !0 === d.options.waitForAnimate) ||
          (!0 === d.options.fade && d.currentSlide === e)
        ))
      )
        return (
          !1 === t && d.asNavFor(e),
          (o = e),
          (a = d.getLeft(o)),
          (r = d.getLeft(d.currentSlide)),
          (d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft),
          (!1 === d.options.infinite &&
            !1 === d.options.centerMode &&
            (e < 0 || e > d.getDotCount() * d.options.slidesToScroll)) ||
          (!1 === d.options.infinite &&
            !0 === d.options.centerMode &&
            (e < 0 || e > d.slideCount - d.options.slidesToScroll))
            ? void (
                !1 === d.options.fade &&
                ((o = d.currentSlide),
                !0 !== i && d.slideCount > d.options.slidesToShow
                  ? d.animateSlide(r, function () {
                      d.postSlide(o);
                    })
                  : d.postSlide(o))
              )
            : (d.options.autoplay && clearInterval(d.autoPlayTimer),
              (s =
                o < 0
                  ? d.slideCount % d.options.slidesToScroll != 0
                    ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                    : d.slideCount + o
                  : o >= d.slideCount
                  ? d.slideCount % d.options.slidesToScroll != 0
                    ? 0
                    : o - d.slideCount
                  : o),
              (d.animating = !0),
              d.$slider.trigger("beforeChange", [d, d.currentSlide, s]),
              (n = d.currentSlide),
              (d.currentSlide = s),
              d.setSlideClasses(d.currentSlide),
              d.options.asNavFor &&
                (l = (l = d.getNavTarget()).slick("getSlick")).slideCount <=
                  l.options.slidesToShow &&
                l.setSlideClasses(d.currentSlide),
              d.updateDots(),
              d.updateArrows(),
              !0 === d.options.fade
                ? (!0 !== i
                    ? (d.fadeSlideOut(n),
                      d.fadeSlide(s, function () {
                        d.postSlide(s);
                      }))
                    : d.postSlide(s),
                  void d.animateHeight())
                : void (!0 !== i && d.slideCount > d.options.slidesToShow
                    ? d.animateSlide(a, function () {
                        d.postSlide(s);
                      })
                    : d.postSlide(s)))
        );
    }),
    (i.prototype.startLoad = function () {
      var e = this;
      !0 === e.options.arrows &&
        e.slideCount > e.options.slidesToShow &&
        (e.$prevArrow.hide(), e.$nextArrow.hide()),
        !0 === e.options.dots &&
          e.slideCount > e.options.slidesToShow &&
          e.$dots.hide(),
        e.$slider.addClass("slick-loading");
    }),
    (i.prototype.swipeDirection = function () {
      var e,
        t,
        i,
        o,
        s = this;
      return (
        (e = s.touchObject.startX - s.touchObject.curX),
        (t = s.touchObject.startY - s.touchObject.curY),
        (i = Math.atan2(t, e)),
        (o = Math.round((180 * i) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        (o <= 45 && o >= 0) || (o <= 360 && o >= 315)
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? "right"
            : "left"
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (i.prototype.swipeEnd = function (e) {
      var t,
        i,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((i = o.swipeDirection())) {
          case "left":
          case "down":
            (t = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (t = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != i &&
          (o.slideHandler(t),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, i]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (i.prototype.swipeHandler = function (e) {
      var t = this;
      if (
        !(
          !1 === t.options.swipe ||
          ("ontouchend" in document && !1 === t.options.swipe) ||
          (!1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))
        )
      )
        switch (
          ((t.touchObject.fingerCount =
            e.originalEvent && void 0 !== e.originalEvent.touches
              ? e.originalEvent.touches.length
              : 1),
          (t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold),
          !0 === t.options.verticalSwiping &&
            (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold),
          e.data.action)
        ) {
          case "start":
            t.swipeStart(e);
            break;
          case "move":
            t.swipeMove(e);
            break;
          case "end":
            t.swipeEnd(e);
        }
    }),
    (i.prototype.swipeMove = function (e) {
      var t,
        i,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== e.originalEvent ? e.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((t = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : e.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : e.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (i = l.swipeDirection()),
              void 0 !== e.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), e.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && "right" === i) ||
                  (l.currentSlide >= l.getDotCount() && "left" === i)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = t + o * s)
                : (l.swipeLeft = t + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = t + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (i.prototype.swipeStart = function (e) {
      var t,
        i = this;
      return (
        (i.interrupted = !0),
        1 !== i.touchObject.fingerCount ||
        i.slideCount <= i.options.slidesToShow
          ? ((i.touchObject = {}), !1)
          : (void 0 !== e.originalEvent &&
              void 0 !== e.originalEvent.touches &&
              (t = e.originalEvent.touches[0]),
            (i.touchObject.startX = i.touchObject.curX =
              void 0 !== t ? t.pageX : e.clientX),
            (i.touchObject.startY = i.touchObject.curY =
              void 0 !== t ? t.pageY : e.clientY),
            void (i.dragging = !0))
      );
    }),
    (i.prototype.unfilterSlides = i.prototype.slickUnfilter =
      function () {
        var e = this;
        null !== e.$slidesCache &&
          (e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.appendTo(e.$slideTrack),
          e.reinit());
      }),
    (i.prototype.unload = function () {
      var t = this;
      e(".slick-cloned", t.$slider).remove(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.htmlExpr.test(t.options.prevArrow) &&
          t.$prevArrow.remove(),
        t.$nextArrow &&
          t.htmlExpr.test(t.options.nextArrow) &&
          t.$nextArrow.remove(),
        t.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (i.prototype.unslick = function (e) {
      var t = this;
      t.$slider.trigger("unslick", [t, e]), t.destroy();
    }),
    (i.prototype.updateArrows = function () {
      var e = this;
      Math.floor(e.options.slidesToShow / 2),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          !e.options.infinite &&
          (e.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          e.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === e.currentSlide
            ? (e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : ((e.currentSlide >= e.slideCount - e.options.slidesToShow &&
                !1 === e.options.centerMode) ||
                (e.currentSlide >= e.slideCount - 1 &&
                  !0 === e.options.centerMode)) &&
              (e.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (i.prototype.updateDots = function () {
      var e = this;
      null !== e.$dots &&
        (e.$dots.find("li").removeClass("slick-active").end(),
        e.$dots
          .find("li")
          .eq(Math.floor(e.currentSlide / e.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (i.prototype.visibility = function () {
      var e = this;
      e.options.autoplay &&
        (document[e.hidden] ? (e.interrupted = !0) : (e.interrupted = !1));
    }),
    (e.fn.slick = function () {
      var e,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (e = 0; e < r; e++)
        if (
          ("object" == typeof s || void 0 === s
            ? (o[e].slick = new i(o[e], s))
            : (t = o[e].slick[s].apply(o[e].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});
const settings = {
  autoplay: !1,
  speed: 1e3,
  autoplaySpeed: 1e3,
  slidesToShow: 1,
  slidesToScroll: 1,
  mobileFirst: !0,
  arrows: !1,
  prevArrow: "<div class='myarrow myarrow_prev'>Prev</div>",
  nextArrow: "<div class='myarrow myarrow_next'>Next</div>",
  appendDots: ".container_dots",
  dotsClass: "dots-box",
  dots: !1,
  focusOnSelect: !0,
  responsive: [
    { breakpoint: 500, settings: {} },
    { breakpoint: 600, settings: { arrows: !0 } },
    { breakpoint: 800, settings: { dots: !0, arrows: !0 } },
  ],
};
function validateEmail(e) {
  return e.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ? (console.log("Valid email address!"), !0)
    : (console.log("You have entered an invalid email address!"), !1);
}
$(".slider").slick(settings),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : (e.ssm = t());
  })(this, function () {
    "use strict";
    function e(e, t) {
      e.forEach(function (e) {
        return e(t);
      });
    }
    var t = function (e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      },
      i = (function () {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var o = t[i];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, i, o) {
          return i && e(t.prototype, i), o && e(t, o), t;
        };
      })(),
      o = [],
      s = function () {},
      n = (function () {
        function n(e) {
          if (
            (t(this, n),
            (this.id = e.id || Math.random().toString(36).substr(2, 9)),
            (this.query = e.query || "all"),
            (this.options = Object.assign(
              {},
              { onEnter: [], onLeave: [], onResize: [], onFirstRun: [] },
              e
            )),
            "function" == typeof this.options.onEnter &&
              (this.options.onEnter = [this.options.onEnter]),
            "function" == typeof this.options.onLeave &&
              (this.options.onLeave = [this.options.onLeave]),
            "function" == typeof this.options.onResize &&
              (this.options.onResize = [this.options.onResize]),
            "function" == typeof this.options.onFirstRun &&
              (this.options.onFirstRun = [this.options.onFirstRun]),
            !1 === this.testConfigOptions("once"))
          )
            return (this.valid = !1), !1;
          (this.valid = !0), (this.active = !1), this.init();
        }
        return (
          i(
            n,
            [
              {
                key: "init",
                value: function () {
                  var e = this;
                  (this.test = window.matchMedia(this.query)),
                    this.test.matches &&
                      this.testConfigOptions("match") &&
                      this.enterState(),
                    (this.listener = function (t) {
                      var i = !1;
                      t.matches
                        ? e.testConfigOptions("match") &&
                          (e.enterState(), (i = !0))
                        : (e.leaveState(), (i = !0)),
                        i && s();
                    }),
                    this.test.addListener(this.listener);
                },
              },
              {
                key: "enterState",
                value: function () {
                  e(this.options.onFirstRun, this.eventData("firstRun")),
                    e(this.options.onEnter, this.eventData("enter")),
                    (this.options.onFirstRun = []),
                    (this.active = !0);
                },
              },
              {
                key: "leaveState",
                value: function () {
                  e(this.options.onLeave, this.eventData("leave")),
                    (this.active = !1);
                },
              },
              {
                key: "resizeState",
                value: function () {
                  this.testConfigOptions("resize") &&
                    e(this.options.onResize, this.eventData("resize"));
                },
              },
              {
                key: "destroy",
                value: function () {
                  this.test.removeListener(this.listener);
                },
              },
              {
                key: "attachCallback",
                value: function (e, t, i) {
                  switch (e) {
                    case "enter":
                      this.options.onEnter.push(t);
                      break;
                    case "leave":
                      this.options.onLeave.push(t);
                      break;
                    case "resize":
                      this.options.onResize.push(t);
                  }
                  "enter" === e && i && this.active && t(this.eventData(e));
                },
              },
              {
                key: "testConfigOptions",
                value: function (e) {
                  var t = this,
                    i = !0;
                  return (
                    o.forEach(function (o) {
                      void 0 !== t.options[o.name] &&
                        o.when === e &&
                        !1 === o.test.bind(t)() &&
                        (i = !1);
                    }),
                    i
                  );
                },
              },
              {
                key: "eventData",
                value: function (e) {
                  return { eventType: e, state: this };
                },
              },
            ],
            [
              {
                key: "addConfigOption",
                value: function (e) {
                  o.push(e);
                },
              },
              {
                key: "getConfigOptions",
                value: function () {
                  return o;
                },
              },
              {
                key: "removeConfigOption",
                value: function (e) {
                  o.forEach(function (t, i) {
                    t.name === e && o.splice(i, 1);
                  });
                },
              },
              {
                key: "setStateChangeMethod",
                value: function (e) {
                  if ("function" != typeof e) throw new Error("Not a function");
                  s = e;
                },
              },
            ]
          ),
          n
        );
      })();
    return new ((function () {
      function e() {
        t(this, e),
          (this.states = []),
          (this.resizeTimer = null),
          (this.configOptions = []),
          window.addEventListener(
            "resize",
            (function (e) {
              var t = this,
                i = void 0;
              return function () {
                for (var o = arguments.length, s = Array(o), n = 0; n < o; n++)
                  s[n] = arguments[n];
                i && window.cancelAnimationFrame(i),
                  (i = window.requestAnimationFrame(function () {
                    (i = null), e.apply(t, s);
                  }));
              };
            })(this.resizeBrowser.bind(this)),
            !0
          );
      }
      return (
        i(e, [
          {
            key: "addState",
            value: function (e) {
              var t = new n(e);
              return t.valid && this.states.push(t), t;
            },
          },
          {
            key: "addStates",
            value: function (e) {
              var t = this;
              e.forEach(function (e) {
                return t.addState(e);
              });
            },
          },
          {
            key: "getState",
            value: function (e) {
              return (
                this.states.filter(function (t) {
                  return t.id === e;
                })[0] || !1
              );
            },
          },
          {
            key: "isActive",
            value: function (e) {
              return (this.getState(e) || {}).active || !1;
            },
          },
          {
            key: "getStates",
            value: function (e) {
              var t = this;
              return void 0 === e
                ? this.states
                : e.map(function (e) {
                    return t.getState(e);
                  });
            },
          },
          {
            key: "removeState",
            value: function (e) {
              var t = this;
              this.states.forEach(function (i, o) {
                i.id === e && (i.destroy(), t.states.splice(o, 1));
              });
            },
          },
          {
            key: "removeStates",
            value: function (e) {
              var t = this;
              e.forEach(function (e) {
                return t.removeState(e);
              });
            },
          },
          {
            key: "removeAllStates",
            value: function () {
              this.states.forEach(function (e) {
                return e.destroy();
              }),
                (this.states = []);
            },
          },
          {
            key: "addConfigOption",
            value: function (e) {
              var t = e.name,
                i = void 0 === t ? "" : t,
                o = e.test,
                s = void 0 === o ? null : o,
                r = e.when,
                l = void 0 === r ? "resize" : r;
              "" !== i &&
                null !== s &&
                n.addConfigOption({ name: i, test: s, when: l });
            },
          },
          {
            key: "removeConfigOption",
            value: function (e) {
              n.removeConfigOption(e);
            },
          },
          {
            key: "getConfigOptions",
            value: function (e) {
              var t = n.getConfigOptions();
              return "string" == typeof e
                ? t.filter(function (t) {
                    return t.name === e;
                  })
                : t;
            },
          },
          {
            key: "resizeBrowser",
            value: function () {
              var e, t;
              ((e = this.states),
              (t = "active"),
              e.filter(function (e) {
                return e[t] && !0 === e[t];
              })).forEach(function (e) {
                e.resizeState();
              });
            },
          },
          {
            key: "stateChange",
            value: function (e) {
              n.setStateChangeMethod(e);
            },
          },
        ]),
        e
      );
    })())();
  });
const btns = document.querySelectorAll(".package__btn-buy"),
  modal = document.querySelector(".modal"),
  modalTitle = modal.querySelector(".modal__title"),
  modalClose = modal.querySelector(".modal__close"),
  modalForm = modal.querySelector("form"),
  modalSubtitle = modal.querySelector(".modal__subtitle"),
  modalInputs = modal.querySelectorAll(".modal__input"),
  labels = modal.querySelectorAll(".modal__label"),
  sendMessage = { package: modalTitle.textContent };
function slowClose() {
  clearForm();
}
const orderPackage = async () => {
    labels.forEach((e) => {
      const t = e.querySelector("span"),
        i = e.querySelector("input");
      sendMessage[t.textContent] = i.value;
    });
    try {
      console.log(88887777);
      const e = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify(sendMessage),
          headers: { "Content-Type": "application/json" },
        }),
        t = await e.json();
      console.log("Sended:", JSON.stringify(t)),
        (modalSubtitle.textContent =
          "The request has been sent! Our managers will contact you soon :)"),
        (modalSubtitle.style.color = "#37b048"),
        setTimeout(slowClose, 5e3);
    } catch (e) {
      console.error("Error:", e);
    }
  },
  clearForm = () => {
    (modal.style.display = "none"),
      (modalSubtitle.textContent = "Buy package"),
      modalInputs.forEach((e) => {
        e.classList.remove("is-valid"), e.classList.remove("is-invalid");
      }),
      modalForm.reset();
  },
  sendForm = () => {
    btns.forEach((e) => {
      e.addEventListener("click", (t) => {
        (modal.style.display = "flex"),
          (modalTitle.textContent = e.dataset.content);
      });
    }),
      modalClose.addEventListener("click", () => {
        clearForm();
      });
  };
function handleSubmit(e) {
  e.preventDefault();
  const { target: t } = e;
  if ((console.log("tn:" + t.name), "emailform" !== t.name)) return;
  console.log(4444);
  let i = !0;
  [...t.elements].forEach((e) => {
    if (e.classList.contains("form-control")) {
      const t = e.value.trim();
      (t && validateEmail(t)) || (i && e.classList.add("is-invalid"), (i = !1));
    }
  }),
    i &&
      (t.classList.contains("modal__form")
        ? orderPackage()
        : alert("Sended successfully!"));
}
function handleKeyup({ target: e }) {
  if (e.classList.contains("form-control"))
    return validateEmail(e.value.trim())
      ? (e.classList.add("is-valid"),
        e.classList.remove("is-invalid"),
        void console.log("valid"))
      : (e.classList.add("is-invalid"),
        e.classList.remove("is-valid"),
        void console.log("is-invalid"));
}
sendForm(),
  document.addEventListener("submit", handleSubmit),
  document.addEventListener("keyup", handleKeyup);
const menuButton = $("#menu-button"),
  mobileMenuContainer = $("#mobile-menu-container");
function initMobile() {
  console.log("is-mobile");
}
function initTablet() {
  console.log("is-tablet");
}
function initDesktop() {
  console.log("is-desktop"), resetMobileMenu();
}
function handleMenu(e) {
  e.preventDefault(),
    $(this).toggleClass("active"),
    mobileMenuContainer.slideToggle();
}
function resetMobileMenu() {
  menuButton.removeClass("active"), mobileMenuContainer.hide();
}
ssm.addStates([
  {
    id: "mobile",
    query: "(max-width: 640px)",
    onEnter: function () {
      initMobile();
    },
  },
  {
    id: "tablet",
    query: "(min-width: 641px) and (max-width: 992px)",
    onEnter: function () {
      initTablet();
    },
  },
  {
    id: "desktop",
    query: "(min-width: 993px)",
    onEnter: function () {
      initDesktop();
    },
  },
]),
  $(document).on("click", "#menu-button", handleMenu);
const counters = document.querySelectorAll(".numbers__number");
let last_known_scroll_position = 0,
  ticking = !1;
function doSomething(e) {
  (elScroll = document.getElementById("scroll-top")),
    (elScroll.style.bottom = e > 5 ? "44px" : "-100px");
}
function onEntry(e) {
  e.forEach((e) => {
    if (e.isIntersecting) {
      if (e.target.classList.contains("numbers__number"))
        return void counters.forEach((e) => {
          e.innerText = 0;
          let t = 0;
          !(function i() {
            const o = parseInt(e.dataset.count);
            t < o
              ? (t++, (e.innerText = t), setTimeout(i, 10))
              : (e.innerText = o);
          })();
        });
      e.target.classList.add("element-show");
    } else {
      if (e.target.classList.contains("numbers__number"))
        return void counters.forEach((e) => {
          e.innerText = 0;
        });
      e.target.classList.remove("element-show");
    }
  });
}
window.addEventListener("scroll", function (e) {
  (last_known_scroll_position = window.scrollY),
    ticking ||
      (window.requestAnimationFrame(function () {
        doSomething(last_known_scroll_position), (ticking = !1);
      }),
      (ticking = !0));
}),
  $(function () {
    $(".scroll-top").click(function () {
      return $("html, body").animate({ scrollTop: 0 }, 100), !1;
    });
  });
let options = { threshold: [0.5] },
  observer = new IntersectionObserver(onEntry, options),
  elements = document.querySelectorAll(".el-animate");
for (let e of elements) observer.observe(e);
