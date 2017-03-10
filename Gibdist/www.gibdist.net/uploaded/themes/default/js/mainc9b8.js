 /**
 *
 * Gibraltar Public Schools - default
 * @link http://gibdistnet.finalsite.com
 * Built By: Jordan Melendez
 * Project Manager: Lisa Catania
 * Designer: Kelly Wilson
 *
 */

/*!
 * global_vars is a file particular to your site
 * it contains base functions that are likely but not always used
 **/


jQuery(function($) {

    'use strict';

    var HOME = HOME || {};
    var SUBNAV = SUBNAV || {};
    var OFFCANVAS = OFFCANVAS || {};
    var UTIL = UTIL || {};

    var $body = $('body');
    var $navMain = $('.nav-main');
    var $navSub = $('.nav-sub');
    var $navMain_level1 = $('#fsHeader').find('.nav-main .fsNavLevel1');
    var sectionTitle = $navMain_level1.find('> li[class*="fsNavCurrentPage"] > a').text();
    var $navSub_title = $navSub.find('> header > .fsElementTitle');
    var bpMobile = 600;
    var bpTablet = 800;
    var isHome = $('.home').length;
    var notDraftMode = !$('.fsDraftMode').length; // if (isHome && notDraftMode)....
    var $heroVideo = $('.main-video');

    //check if browser supports placeholders for placeholder()
    $.support.placeholder = (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();

    // ================================
    // Random Image in Header
    // ================================

    var jsonMainSlides = $('.header-image .fsMediaCustomPlayer').attr('data-playlisturl');
    $.getJSON(jsonMainSlides, function(data) {
      //This below for loop will run 3 times, and thus show 3 images. Modify as needed.
      for (var i=0; i<1; i++) {
        //getRandomIndex will read the jSON for the data object, and return a random integer
        var randomIndex = getRandomIndex(data.objects);
        //append said random data.objects[] using unique number
        $('<article style="background-image: url(' + data.objects[randomIndex].full_path + ');"><img src="'+data.objects[randomIndex].full_path+'"></article>').appendTo('.fsMediaContainer');
        //take out the above element so it cannot be repeated
        data.objects.splice(randomIndex, 1);
      }
      function getRandomIndex(options) {
        return Math.floor(Math.random() * data.objects.length);
      }
    });

    // ================================
    // Sub Navigation
    // ================================

    SUBNAV = {

        init: function() {

            this.title();
            this.mobileNav();

        },

        // Create a section title based on the current page
        title: function() {
            if (sectionTitle.length !== 0) {
                $navSub_title.html(sectionTitle);
            }

            if ($navSub.find('nav .fsNavLevel1').length !== 0) {
                $navSub.removeClass('nav-sub-empty');
            } else {
                $navSub.addClass('nav-sub-empty');
            }

        },

        mobileNav: function() {
            // nav-sub - mobile toggle
            $navSub_title.click(function() {
                $(this).closest($navSub).toggleClass('active-nav');
            });

            // nav-sub remove click elsewhere
            $(document).on('click', function(event) {
                if (!$(event.target).closest($navSub).length) {
                    $navSub.removeClass('active-nav');
                }
            });

        }

    };

    SUBNAV.init();


    // ================================
    // Off Canvas Menu
    // ================================
    OFFCANVAS = {

        init: function() {
            this.clickHandler();
        },

        clickHandler: function() {
            // Toggle attribute of the body
            $('.drawer-trigger').click(function() {
                $body.toggleClass('drawer-is-active');
            });

            // Remove attribute on the bottom if anything other than
            // what is mentioned is clicked on
            $(document).on('click', function(event) {
                if (!$(event.target).closest('#fsMenu, .drawer-trigger').length) {
                    $body.removeClass('drawer-is-active');
                }
            });
        }

    };

    OFFCANVAS.init();


    // ================================
    // Home
    // ================================

    HOME = {


        init: function() {

            this.exampleFunction();

            //NOTE: this is commented out because it most likely will break (example only)
            //NOTE: this.slideshow();

        },

        exampleFunction: function() {

            console.log('// Home Page Init ' + isHome);
            // create functions like this, then call them in init
        },

        //NOTE: THIS IS AN EXAMPLE, NOT A REAL THING

        slideshow: function() {

            // src/plugins/fsMediaPull.js
            $('.universal-slideshow').mediaSlider({

                mediaTemplate: [
                    '<article class="universal-slide" style="background-image: url(347.mp4);">',
                    '</article>'
                ], // html markup

                callback: function() {
                    $('.universal-slideshow').find('.fsMediaCustomPlayer').slick();
                }

            });

        }

    };


    if (isHome) {

        HOME.init();

    }


    // ================================
    // Utility & milliseconds Functions
    // ================================

    UTIL = {

        respondSliders: function() {

            // ================================
            // Responsive Built-in sliders
            // ================================

            // the following takes care of the news/calendar slideshow option
            // and makes them responsive

            var targets = [
                '.fsNews.fsSlideshow',
                '.fsCalendar.fsSlideshow'
            ];


            var bp = [{

                breakpoint: bpTablet,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: bpMobile,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll:1,
                    dots: true
                }
            }];

            for (var i = 0; i < targets.length; i++) {
                $(targets[i] + ' .fsElementSlideshow')
                    .slick('slickSetOption', 'responsive', bp, true);
            }

        }

    };

    UTIL.respondSliders();

  // ================================
  // Search Slide Out (onclick)
  // ================================
  function slideOutSearch() {
    var open = $('.top-search .open-search');
    var form = $('.top-search');


    open.click(function(){
      form.toggleClass('top-search-expanded');
      open.toggleClass('open-search-hidden');
    });

    $('body').click(function(e){

      if(!$('.open-search').is(e.target)) {
        if(!$('.search-input').is(e.target)) {
          form.removeClass('top-search-expanded');
          open.removeClass('open-search-hidden');
        }
      }
    });
  }
  slideOutSearch();

  // ================================
  // Home Video
  // ================================

  function homeVideo() {
    $heroVideo.mediaSlider({

      mediaTemplate: [
        '<article class="universal-slide" style="background-image: url({videoPoster});">',
        '<video src="{videoSrc}" autoplay loop preload="auto" />',
        // '<div class="caption-wrapper">',
        //   '<div class="caption-desc">{captionDesc}</div>',
        // '</div>',
        '</article>'
      ], // html markup

      callback: function() {}

    });
  }

  homeVideo();

    //Custom mute button
    var video = $('.main-video').find('video');

    $('button.mute').addClass('audio_on');

    $('button.mute').on('click', function() {
      var video = $('.main-video').find('video');
      video.prop('muted', !video.prop('muted'));
      $(this).toggleClass('audio_off');
      $(this).toggleClass('audio_on');

    });
  // }

// ================================
// Odd vs Even List Items
// ================================

function oddList() {
  var districtNav = $('.district-nav').find('.fsNavLevel2');
  var mainNav = $('.nav-main').find('.fsNavLevel2');
  var distList = districtNav.find('li');
  var mainList = mainNav.find('li');

  if (distList.length % 2 !== 0) {
    districtNav.addClass('odd-list');
  }


}
oddList();

// ================================
// Move News Info
// ================================

  $('.fsNews .fsElementSlideshow .slick-track article').each(function(){
    var content = $("<div class='testimonial-content'></div>");
    $(this).append(content);
  });

  $('.fsNews .fsElementSlideshow .slick-track article').each(function(){
    var newsTitle = $(this).find('.fsTitle');
    var newsSummary = $(this).find('.fsSummary');
    var readMoreLink = $(this).find('.fsReadMoreLink');
    $(this).find('.testimonial-content').append(newsTitle, newsSummary, readMoreLink);
  });

// ================================
// Michigan School Widget
// ================================

function toggleWidget() {
  var open = $('.open-widget');
  var close = $('.close-widget');
  var widget = $('.mi-widget');
  var showWidget = $('mi-widget-show');
  var section1 = $('.section-one');

  widget.addClass('mi-widget-show');

  open.click(function(){
    widget.toggleClass('mi-widget-show');
  });

  close.click(function(){
    widget.removeClass('mi-widget-show');
  });
}

toggleWidget();

// ====================================
// Move Subnav on Resize (< 800px)
// ====================================

// $(window).resize(function(){
//   if($(this).width() < 800) {
//     $('#fsPageContent').prepend($('.nav-sub'));
//   } else {
//     $('#fsBannerRight .fsBanner').prepend($('.nav-sub'));
//   }
// });

// ====================================
// Move News Post Image Caption to Img
// ====================================

function imgCaption() {
  var caption = $('.home .fsNews .fsElementSlideshow .slick-track article').find('.fs_style_34');
  var newsImg = $('.home .fsNews .fsElementSlideshow .slick-track article').find('.fsThumbnail');
  var article = $('.home .fsNews .fsElementSlideshow .slick-track article');
  var slickTrack = $('.home .fsNews .fsElementSlideshow .slick-track');

  article.each(function(){
    if ($(this).has('.fs_style_34')) {
      $(this).find(newsImg).append($(this).find(caption));
    }
  });

} imgCaption();

// ====================================
// Quicklinks Nav Un-clickable
// ====================================
  $(document).ready(function(){
    var quicklinks = $('.quicklinks-nav .fsNavLevel1 > li > a');
    quicklinks.click(function(e){
      e.preventDefault();
    });
  });

// ====================================
// LightBox
// ====================================

  $(document).ready(function(){
    var stemBlock = $('.stem-block').find('a');
    stemBlock.attr('data-lity', '');
  });

// ====================================
// Stem Ed
// ====================================

  $(document).ready(function(){
    var stemBlock = $('.stem-block');
    var stemEd = $('.stem-ed');
    stemBlock.mouseenter(function(){
      stemEd.addClass('stem-ed-hidden');
    });
    stemBlock.mouseleave(function(){
      stemEd.removeClass('stem-ed-hidden');
    });
  });

  // ====================================
  // Meganav columns
  // ====================================

  $('#fsHeader .nav-main .fsNavLevel2').columns({
    columns: 2,
    addWrapper: true
  });

  //if only one column add class odd and expand width to 100%
  var columnedNavs = $('.nav-main').find('.col-wrap');

  columnedNavs.each(function() {
    var menus = $(this).find('ul');
      if (menus.length < 2) {
        menus.addClass('odd');
      }
  });




}); //jQuery


function backgroundImage(e){backgroundElement=e,$(backgroundElement).each(function(){var e=$(this).find("img").attr("src");$(this).css("background-image",'url("'+e+'")')})}function debounce(e,t,n){var o;return function(){var r=this,i=arguments,a=function(){o=null,n||e.apply(r,i)},l=n&&!o;clearTimeout(o),o=setTimeout(a,t),l&&e.apply(r,i)}}function placeholder(e,t){"use strict";var n,o,r=100,i=100;n=function a(){e.find("input.gsc-input").length?$.support.placeholder?e.find("input.gsc-input").attr("placeholder",t):e.find("input.gsc-input").attr("value",t):r>0&&(o=setTimeout(a,i),r-=1)},o=setTimeout(n,i)}function nano(e,t){return e.replace(/\{([\w\.]*)\}/g,function(e,n){for(var o=n.split("."),r=t[o.shift()],i=0,a=o.length;i<a;i++)r=r[o[i]];return"undefined"!=typeof r&&null!==r?r:""})}if($(".fsCalendar.fsGrid").length){$(".fsCalendar.fsGrid").addClass("smallCal");var eventview,scrollUp,onClickGridEvent=function(e){var t,n,o=$(e.target).closest(".fsCalendarDaybox");n=o.clone(),t=eventview.offset().top-16,$(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"),eventview.empty().append(n),o.addClass("selected"),$("html,body").animate({scrollTop:t},450)},onClickScrollUp=function(){var e=$(".fsCalendarMonthBrowser").offset().top-16;$("html,body").animate({scrollTop:e},450)},onAJAXSuccess=function(e,t,n,o){var r=$(o).hasClass("fsCalendar fsGrid");r&&initCalendar()},initCalendar=function(){eventview=$('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"),scrollUp=$('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview),scrollUp.on("click",onClickScrollUp),$(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"),$(".fsCalendarEventGrid").on("click",".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ",onClickGridEvent)};$(document).ajaxSuccess(onAJAXSuccess),initCalendar()}!function(e){"use strict";function t(t,n){var o=this;o.wrapper,o.numOfCol,o.menuTag,o.newCol,o.itemsPerColumn,o.element=e(t),o.defaults={columns:2,breakAt:0,itemsInColumn:!1,addWrapper:!1,wrapper:"<div class='col-wrap' />"},o.settings=e.extend({},o.defaults,n),o.init()}t.prototype={init:function(){var e=this;e.items=e.element.children(),e.classList=e.element.attr("class")?e.element.attr("class"):"",e.elementTag=e.element.prop("tagName").toLowerCase(),e.items.length<e.settings.breakAt||(e.columnPrep(),e.createColumns(),e.distributeItems())},columnPrep:function(){var t=this;t.element.addClass("menu-col column-1"),t.settings.addWrapper&&(t.wrapper=e(t.settings.wrapper),t.wrapper.insertBefore(t.element),t.element.appendTo(t.wrapper)),t.settings.itemsInColumn?t.itemsPerColumn=t.settings.columns:t.itemsPerColumn=Math.ceil(t.items.length/t.settings.columns),t.numOfCol=Math.ceil(t.items.length/t.itemsPerColumn)},createColumns:function(){for(var t=this,n=t.numOfCol;n>1;n--)t.newCol=e("<"+t.elementTag+">",{"class":t.classList+" menu-col column-"+n}),t.newCol.insertAfter(t.element)},distributeItems:function(){var t,n,o=this,r=1;e.each(o.items,function(i){i+1>o.itemsPerColumn&&(n=(i+1)%o.itemsPerColumn,(1==n||1==o.itemsPerColumn&&0==n)&&(r++,t=o.settings.addWrapper?o.wrapper.find(".column-"+r):o.element.siblings(".column-"+r)),e(this).appendTo(t))})}},e.fn.columns=function(e){this.each(function(){new t(this,e)})}}(jQuery),$.fn.mediaSlider=function(e){slideshowClass=this;var t,n,o=600,r=$(slideshowClass).find(".fsMediaCustomPlayer"),i=r.attr("data-playlisturl"),a=$.extend({mediaTemplate:""},e),l={slide:a.mediaTemplate.join("\n")};r.data("display_loaded",!1),$.getJSON(i,function(e){t=$(window).width()>o?"full":"mobile",$.each(e.objects,function(o,i){n="full"===t?e.objects[o].full_path:e.objects[o].mobile_path,r.append(nano(l.slide,{imgSrc:n,videoSrc:e.objects[o].hd_video_path,videoPoster:e.objects[o].display_path,captionTitle:e.objects[o].object_title,captionDesc:e.objects[o].object_description}))})}).done(function(){e.callback()}).fail(function(){r.append("<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>").css("textAlign","center")})},function(e,t){"function"==typeof define&&define.amd?define(["jquery"],function(n){return t(e,n)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=t(e,require("jquery")):e.lity=t(e,e.jQuery||e.Zepto)}("undefined"!=typeof window?window:this,function(e,t){"use strict";function n(e){var t=P();return U&&e.length?(e.one(U,t.resolve),setTimeout(t.resolve,500)):t.resolve(),t.promise()}function o(e,n,o){if(1===arguments.length)return t.extend({},e);if("string"==typeof n){if("undefined"==typeof o)return"undefined"==typeof e[n]?null:e[n];e[n]=o}else t.extend(e,n);return this}function r(e){for(var t,n=decodeURI(e.split("#")[0]).split("&"),o={},r=0,i=n.length;r<i;r++)n[r]&&(t=n[r].split("="),o[t[0]]=t[1]);return o}function i(e,n){return e+(e.indexOf("?")>-1?"&":"?")+t.param(n)}function a(e,t){var n=e.indexOf("#");return-1===n?t:(n>0&&(e=e.substr(n)),t+e)}function l(e){return t('<span class="lity-error"/>').append(e)}function s(e,n){var o=n.opener()&&n.opener().data("lity-desc")||"Image with no description",r=t('<img src="'+e+'" alt="'+o+'"/>'),i=P(),a=function(){i.reject(l("Failed loading image"))};return r.on("load",function(){return 0===this.naturalWidth?a():void i.resolve(r)}).on("error",a),i.promise()}function c(e,n){var o,r,i;try{o=t(e)}catch(a){return!1}return!!o.length&&(r=t('<i style="display:none !important"/>'),i=o.hasClass("lity-hide"),n.element().one("lity:remove",function(){r.before(o).remove(),i&&!o.closest(".lity-content").length&&o.addClass("lity-hide")}),o.removeClass("lity-hide").after(r))}function u(e){var n=B.exec(e);return!!n&&m(a(e,i("https://www.youtube"+(n[2]||"")+".com/embed/"+n[4],t.extend({autoplay:1},r(n[5]||"")))))}function d(e){var n=z.exec(e);return!!n&&m(a(e,i("https://player.vimeo.com/video/"+n[3],t.extend({autoplay:1},r(n[4]||"")))))}function f(e){var n=F.exec(e);return!!n&&(0!==e.indexOf("http")&&(e="https:"+e),m(a(e,i("https://www.facebook.com/plugins/video.php?href="+e,t.extend({autoplay:1},r(n[4]||""))))))}function p(e){var t=L.exec(e);return!!t&&m(a(e,i("https://www.google."+t[3]+"/maps?"+t[6],{output:t[6].indexOf("layer=c")>0?"svembed":"embed"})))}function m(e){return'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="'+e+'"/></div>'}function h(){return j.documentElement.clientHeight?j.documentElement.clientHeight:Math.round(k.height())}function v(e){var t=w();t&&(27===e.keyCode&&t.close(),9===e.keyCode&&y(e,t))}function y(e,t){var n=t.element().find(N),o=n.index(j.activeElement);e.shiftKey&&o<=0?(n.get(n.length-1).focus(),e.preventDefault()):e.shiftKey||o!==n.length-1||(n.get(0).focus(),e.preventDefault())}function g(){t.each(S,function(e,t){t.resize()})}function b(e){1===S.unshift(e)&&($.addClass("lity-active"),k.on({resize:g,keydown:v})),t("body > *").not(e.element()).addClass("lity-hidden").each(function(){var e=t(this);void 0===e.data(M)&&e.data(M,e.attr(D)||null)}).attr(D,"true")}function C(e){var n;e.element().attr(D,"true"),1===S.length&&($.removeClass("lity-active"),k.off({resize:g,keydown:v})),S=t.grep(S,function(t){return e!==t}),n=S.length?S[0].element():t(".lity-hidden"),n.removeClass("lity-hidden").each(function(){var e=t(this),n=e.data(M);n?e.attr(D,n):e.removeAttr(D),e.removeData(M)})}function w(){return 0===S.length?null:S[0]}function x(e,n,o,r){var i,a="inline",l=t.extend({},o);return r&&l[r]?(i=l[r](e,n),a=r):(t.each(["inline","iframe"],function(e,t){delete l[t],l[t]=o[t]}),t.each(l,function(t,o){return!o||(!(!o.test||o.test(e,n))||(i=o(e,n),!1!==i?(a=t,!1):void 0))})),{handler:a,content:i||""}}function E(e,r,i,a){function l(e){u=t(e).css("max-height",h()+"px"),c.find(".lity-loader").each(function(){var e=t(this);n(e).always(function(){e.remove()})}),c.removeClass("lity-loading").find(".lity-content").empty().append(u),f=!0,u.trigger("lity:ready",[d])}var s,c,u,d=this,f=!1,p=!1;r=t.extend({},O,r),c=t(r.template),d.element=function(){return c},d.opener=function(){return i},d.options=t.proxy(o,d,r),d.handlers=t.proxy(o,d,r.handlers),d.resize=function(){f&&!p&&u.css("max-height",h()+"px").trigger("lity:resize",[d])},d.close=function(){if(f&&!p){p=!0,C(d);var e=P();return a&&(j.activeElement===c[0]||t.contains(c[0],j.activeElement))&&a.focus(),u.trigger("lity:close",[d]),c.removeClass("lity-opened").addClass("lity-closed"),n(u.add(c)).always(function(){u.trigger("lity:remove",[d]),c.remove(),c=void 0,e.resolve()}),e.promise()}},s=x(e,d,r.handlers,r.handler),c.attr(D,"false").addClass("lity-loading lity-opened lity-"+s.handler).appendTo("body").focus().on("click","[data-lity-close]",function(e){t(e.target).is("[data-lity-close]")&&d.close()}).trigger("lity:open",[d]),b(d),t.when(s.content).always(l)}function T(e,n,o){e.preventDefault?(e.preventDefault(),o=t(this),e=o.data("lity-target")||o.attr("href")||o.attr("src")):o=t(o);var r=new E(e,t.extend({},o.data("lity-options")||o.data("lity"),n),o,j.activeElement);if(!e.preventDefault)return r}var j=e.document,k=t(e),P=t.Deferred,$=t("html"),S=[],D="aria-hidden",M="lity-"+D,N='a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',O={handler:null,handlers:{image:s,inline:c,youtube:u,vimeo:d,googlemaps:p,facebookvideo:f,iframe:m},template:'<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'},A=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,B=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,z=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,L=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,F=/(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,U=function(){var e=j.createElement("div"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in t)if(void 0!==e.style[n])return t[n];return!1}();return s.test=function(e){return A.test(e)},T.version="2.2.1",T.options=t.proxy(o,T,O),T.handlers=t.proxy(o,T,O.handlers),T.current=w,t(j).on("click.lity","[data-lity]",T),T}),window.Modernizr=function(e,t,n){function o(e){g.cssText=e}function r(e,t){return typeof e===t}function i(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var o in e){var r=e[o];if(!i(r,"-")&&g[r]!==n)return"pfx"!=t||r}return!1}function l(e,t,o){for(var i in e){var a=t[e[i]];if(a!==n)return o===!1?e[i]:r(a,"function")?a.bind(o||t):a}return!1}function s(e,t,n){var o=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+x.join(o+" ")+o).split(" ");return r(t,"string")||r(t,"undefined")?a(i,t):(i=(e+" "+E.join(o+" ")+o).split(" "),l(i,t,n))}var c,u,d,f="2.8.3",p={},m=!0,h=t.documentElement,v="modernizr",y=t.createElement(v),g=y.style,b={}.toString,C=" -webkit- -moz- -o- -ms- ".split(" "),w="Webkit Moz O ms",x=w.split(" "),E=w.toLowerCase().split(" "),T={svg:"http://www.w3.org/2000/svg"},j={},k=[],P=k.slice,$=function(e,n,o,r){var i,a,l,s,c=t.createElement("div"),u=t.body,d=u||t.createElement("body");if(parseInt(o,10))for(;o--;)l=t.createElement("div"),l.id=r?r[o]:v+(o+1),c.appendChild(l);return i=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),c.id=v,(u?c:d).innerHTML+=i,d.appendChild(c),u||(d.style.background="",d.style.overflow="hidden",s=h.style.overflow,h.style.overflow="hidden",h.appendChild(d)),a=n(c,e),u?c.parentNode.removeChild(c):(d.parentNode.removeChild(d),h.style.overflow=s),!!a},S=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var o;return $("@media "+t+" { #"+v+" { position: absolute; } }",function(t){o="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),o},D={}.hasOwnProperty;d=r(D,"undefined")||r(D.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(e,t){return D.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=P.call(arguments,1),o=function(){if(this instanceof o){var r=function(){};r.prototype=t.prototype;var i=new r,a=t.apply(i,n.concat(P.call(arguments)));return Object(a)===a?a:i}return t.apply(e,n.concat(P.call(arguments)))};return o}),j.flexbox=function(){return s("flexWrap")},j.flexboxlegacy=function(){return s("boxDirection")},j.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:$(["@media (",C.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},j.cssanimations=function(){return s("animationName")},j.csscolumns=function(){return s("columnCount")},j.csstransforms=function(){return!!s("transform")},j.csstransforms3d=function(){var e=!!s("perspective");return e&&"webkitPerspective"in h.style&&$("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},j.csstransitions=function(){return s("transition")},j.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(o){}return n},j.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(o){}return n},j.svg=function(){return!!t.createElementNS&&!!t.createElementNS(T.svg,"svg").createSVGRect},j.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==T.svg},j.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(b.call(t.createElementNS(T.svg,"clipPath")))};for(var M in j)d(j,M)&&(u=M.toLowerCase(),p[u]=j[M](),k.push((p[u]?"":"no-")+u));return p.addTest=function(e,t){if("object"==typeof e)for(var o in e)d(e,o)&&p.addTest(o,e[o]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof m&&m&&(h.className+=" "+(t?"":"no-")+e),p[e]=t}return p},o(""),y=c=null,function(e,t){function n(e,t){var n=e.createElement("p"),o=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",o.insertBefore(n.lastChild,o.firstChild)}function o(){var e=g.elements;return"string"==typeof e?e.split(" "):e}function r(e){var t=y[e[h]];return t||(t={},v++,e[h]=v,y[v]=t),t}function i(e,n,o){if(n||(n=t),u)return n.createElement(e);o||(o=r(n));var i;return i=o.cache[e]?o.cache[e].cloneNode():m.test(e)?(o.cache[e]=o.createElem(e)).cloneNode():o.createElem(e),!i.canHaveChildren||p.test(e)||i.tagUrn?i:o.frag.appendChild(i)}function a(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||r(e);for(var i=n.frag.cloneNode(),a=0,l=o(),s=l.length;a<s;a++)i.createElement(l[a]);return i}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return g.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+o().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(g,t.frag)}function s(e){e||(e=t);var o=r(e);return g.shivCSS&&!c&&!o.hasCSS&&(o.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||l(e,o),e}var c,u,d="3.7.0",f=e.html5||{},p=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,m=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,u=!0}}();var g={elements:f.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:d,shivCSS:f.shivCSS!==!1,supportsUnknownElements:u,shivMethods:f.shivMethods!==!1,type:"default",shivDocument:s,createElement:i,createDocumentFragment:a};e.html5=g,s(t)}(this,t),p._version=f,p._prefixes=C,p._domPrefixes=E,p._cssomPrefixes=x,p.mq=S,p.testProp=function(e){return a([e])},p.testAllProps=s,p.testStyles=$,h.className=h.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(m?" js "+k.join(" "):""),p}(this,this.document),function(e,t,n){function o(e){return"[object Function]"==v.call(e)}function r(e){return"string"==typeof e}function i(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function l(){var e=y.shift();g=1,e?e.t?m(function(){("c"==e.t?f.injectCss:f.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),l()):g=0}function s(e,n,o,r,i,s,c){function u(t){if(!p&&a(d.readyState)&&(b.r=p=1,!g&&l(),d.onload=d.onreadystatechange=null,t)){"img"!=e&&m(function(){w.removeChild(d)},50);for(var o in k[n])k[n].hasOwnProperty(o)&&k[n][o].onload()}}var c=c||f.errorTimeout,d=t.createElement(e),p=0,v=0,b={t:o,s:n,e:i,a:s,x:c};1===k[n]&&(v=1,k[n]=[]),"object"==e?d.data=n:(d.src=n,d.type=e),d.width=d.height="0",d.onerror=d.onload=d.onreadystatechange=function(){u.call(this,v)},y.splice(r,0,b),"img"!=e&&(v||2===k[n]?(w.insertBefore(d,C?null:h),m(u,c)):k[n].push(d))}function c(e,t,n,o,i){return g=0,t=t||"j",r(e)?s("c"==t?E:x,e,t,this.i++,n,o,i):(y.splice(this.i++,0,e),1==y.length&&l()),this}function u(){var e=f;return e.loader={load:c,i:0},e}var d,f,p=t.documentElement,m=e.setTimeout,h=t.getElementsByTagName("script")[0],v={}.toString,y=[],g=0,b="MozAppearance"in p.style,C=b&&!!t.createRange().compareNode,w=C?p:h.parentNode,p=e.opera&&"[object Opera]"==v.call(e.opera),p=!!t.attachEvent&&!p,x=b?"object":p?"script":"img",E=p?"script":x,T=Array.isArray||function(e){return"[object Array]"==v.call(e)},j=[],k={},P={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};f=function(e){function t(e){var t,n,o,e=e.split("!"),r=j.length,i=e.pop(),a=e.length,i={url:i,origUrl:i,prefixes:e};for(n=0;n<a;n++)o=e[n].split("="),(t=P[o.shift()])&&(i=t(i,o));for(n=0;n<r;n++)i=j[n](i);return i}function a(e,r,i,a,l){var s=t(e),c=s.autoCallback;s.url.split(".").pop().split("?").shift(),s.bypass||(r&&(r=o(r)?r:r[e]||r[a]||r[e.split("index.html").pop().split("?")[0]]),s.instead?s.instead(e,r,i,a,l):(k[s.url]?s.noexec=!0:k[s.url]=1,i.load(s.url,s.forceCSS||!s.forceJS&&"css"==s.url.split(".").pop().split("?").shift()?"c":n,s.noexec,s.attrs,s.timeout),(o(r)||o(c))&&i.load(function(){u(),r&&r(s.origUrl,l,a),c&&c(s.origUrl,l,a),k[s.url]=2})))}function l(e,t){function n(e,n){if(e){if(r(e))n||(d=function(){var e=[].slice.call(arguments);f.apply(this,e),p()}),a(e,d,t,0,c);else if(Object(e)===e)for(s in l=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(s)&&(!n&&!--l&&(o(d)?d=function(){var e=[].slice.call(arguments);f.apply(this,e),p()}:d[s]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(f[s])),a(e[s],d,t,s,c))}else!n&&p()}var l,s,c=!!e.test,u=e.load||e.both,d=e.callback||i,f=d,p=e.complete||i;n(c?e.yep:e.nope,!!u),u&&n(u)}var s,c,d=this.yepnope.loader;if(r(e))a(e,0,d,0);else if(T(e))for(s=0;s<e.length;s++)c=e[s],r(c)?a(c,0,d,0):T(c)?f(c):Object(c)===c&&l(c,d);else Object(e)===e&&l(e,d)},f.addPrefix=function(e,t){P[e]=t},f.addFilter=function(e){j.push(e)},f.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",d=function(){t.removeEventListener("DOMContentLoaded",d,0),t.readyState="complete"},0)),e.yepnope=u(),e.yepnope.executeStack=l,e.yepnope.injectJs=function(e,n,o,r,s,c){var u,d,p=t.createElement("script"),r=r||f.errorTimeout;p.src=e;for(d in o)p.setAttribute(d,o[d]);n=c?l:n||i,p.onreadystatechange=p.onload=function(){!u&&a(p.readyState)&&(u=1,n(),p.onload=p.onreadystatechange=null)},m(function(){u||(u=1,n(1))},r),s?p.onload():h.parentNode.insertBefore(p,h)},e.yepnope.injectCss=function(e,n,o,r,a,s){var c,r=t.createElement("link"),n=s?l:n||i;r.href=e,r.rel="stylesheet",r.type="text/css";for(c in o)r.setAttribute(c,o[c]);a||(h.parentNode.insertBefore(r,h),m(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},jQuery(function(e){e("body.portal:not(.fsComposeMode)").length&&(e(".portal-hero").insertBefore("#fsPageBodyWrapper"),e(".portal-sub-nav").clone().addClass("portal-sub-mobile").insertBefore("#fsPageBodyWrapper"),e(".portal-sub-mobile").prepend('<div class="sub-trigger">More Pages</div>'),e(".sub-trigger").click(function(){e(this).parent().toggleClass("active")}),backgroundImage(e(".portal-news a.fsThumbnail")),backgroundImage(e(".portal-directory .fsPhoto")),e(".portal-cal footer .fsElementFooterContent").appendTo(".portal-cal > .fsElementContent > .fsListItems"),e(".portal-student-announcements").prependTo("#fsPageBody"),e(".portal-photos").insertAfter("#fsPageBodyWrapper"))}),$.fn.randomize=function(e){var t=e?$(this).find(e):$(this).children(),n=t.parent();return n.each(function(){$(this).children(e).sort(function(){return Math.round(Math.random())-.5}).detach().appendTo(this)}),this},function(e){var t=e({});e.subscribe=function(){t.on.apply(t,arguments)},e.unsubscribe=function(){t.off.apply(t,arguments)},e.publish=function(){t.trigger.apply(t,arguments)}}(jQuery);