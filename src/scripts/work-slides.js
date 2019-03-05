// import ScrollMagic from 'scrollmagic';
// import { mobileBreakpoint } from './constants';
// // import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

// $(document).ready(function() {

//   /* Helper function to determine whether current viewport width is above or below the global mobile breakpoint */
//   function isNotMobile() {
//     return $(window).outerWidth() > mobileBreakpoint;
//   }

//   /* Desktop (not-mobile) constants and utility methods */
//   const $workPanel = $('#work');
//   const $workCardSubcontainer = $('.slide-wrap');

//   function getDesignCardsScrollTop() {
//     return $workPanel.offset().top;
//   }

//   function getDevCardsScrollTop() {
//     /* the calculation below aligns the top of the first left-hand dev card with the top of the "Development Capabilities" button
//        (i.e., the same scroll position where the ScrollMagic scene activates the "Development Capabilities" button) */
//     return $workPanel.offset().top + $workCardSubcontainer.height() + 156 - getDevButtonOffset();
//   }

//   function getDevButtonOffset() {
//     return $('.work-main-text-col').outerHeight() - ($('#button-work-1').outerHeight() + 60);
//   }
//   /* End desktop (not-mobile) constants and utility methods */

//   /* Mobile utility methods */
//   function getFirstDevCardIndex() {
//     return 0; // should equal the 0-based index of the first dev card in the list. if the cards ever change, this number may need to be updated.
//   }
//   /* End mobile utility methods */
  
//   /* Core DOM manipulation methods - all screen sizes */
//   function selectCapabilityGroup(type) {
//     if (type !== 'design' && type !== 'development') {
//       return;
//     }

//     let goToIndex = (type === 'development') ? getFirstDevCardIndex() : 0;
//     $slickContainer
//       .slick('slickGoTo', goToIndex)
//       .promise()
//       .then( highlightSelectedButton(type) );

//   }

//   function highlightSelectedButton(type) {
//     if (type !== 'design' && type !== 'development') {
//       return;
//     }
//     $('#button-work-1').removeClass('active');
//     $('#button-work-2').removeClass('active');
//     $('#button-work-3').removeClass('active');
//     $('#button-work-1').blur();
//     $('#button-work-2').blur();
//     $('#button-work-3').blur();
//     $(`#button-${type}-capabilities`).addClass('active');
//   }
//   /* End core DOM manipulation methods */

//   /* Click event handlers on buttons - all screen sizes */
//   $('#button-design-capabilities').on('click', function(event) {
//     selectCapabilityGroup('design');
//   });

//   $('#button-development-capabilities').on('click', function() {
//     selectCapabilityGroup('development');
//   });
//   /* End click event handlers */

//   /* ScrollMagic */
//   const capabilitiesController = new ScrollMagic.Controller();

//   // ScrollMagic scene controlling initial animation of text, buttons, & cards
//   const initialAnimationScene = new ScrollMagic.Scene({
//     triggerElement: '.slide-wrap', //may need to be one element deeper
//     duration: 0,
//     triggerHook: 0.65
//   }).addTo(capabilitiesController)
//     .on('progress', event => {
//       capabilitiesSection.animateSection();
//     }
//   );

//   let capabilitiesSection = {
//     animateMainText: function() {
//       $('.work-section .work-main-text-col .main-text-item').addClass('fade-in-elem');
//     },
//     animateTiles: function() {
//       $('.slide-wrap .card').addClass('first-animation');
//     },
//     animateSection: function() {
//       this.animateMainText();
//       this.animateTiles();
//     }
//   };

//   /* 
//      getTriggerHook function, to be used with ScrollMagic buttonSelectionScene (below).
//      triggerHook must be a number between 0 and 1 representing a ratio of the vertical position of the trigger to the height of the viewport.
//      the calculations below set the triggerHook to be level with the top of the "Development Capabilities" button 
//   */
//   function getTriggerHook() {
//     return getDevButtonOffset() / $(window).outerHeight();
//   }

//   // ScrollMagic scene to toggle button states (i.e., which button appears to be active) based on scroll position  - Desktop (not-mobile) only
//   const designCardContainerHeight = $workCardSubcontainer.outerHeight();
//   const buttonSelectionScene = new ScrollMagic.Scene({
//     triggerElement: '.slide-wrap',
//     offset: -40,    // this aligns the "start" of the scene with the top of the first right-hand card in the .capabilities-design-card-container
//     duration: designCardContainerHeight + 100,    // this aligns the "end" of the scene with the top of the first left-hand card in the .capabilities-dev-card-container
//     triggerHook: getTriggerHook()
//   }).addTo(capabilitiesController)
//     .on('enter', function() {
//       if (isNotMobile()) {
//         highlightSelectedButton('design');
//       }
//     }
//   ).on('leave', function(event) {
//       // highlight Dev button only if we've left the design cards subsection by scrolling down into the dev cards subsection
//       if (isNotMobile() && event.state && event.state === 'AFTER') {
//         highlightSelectedButton('development');
//       }
//       // if we've exited the design cards subsection by scrolling up (i.e., above the Capabilities panel itself), nothing changes
//     }
//   );

//   // Reset triggerHook dynamically when the scene "shifts", for example, when the window is resized
//   buttonSelectionScene.on('shift', function(event) {
//     buttonSelectionScene.triggerHook(getTriggerHook());
//   });
//   /* End ScrollMagic */


//   /* Slick Slider - Mobile only */
//   const $slickContainer = $('.slide-wrap'); 
//   $slickContainer.slick({
//     arrows: false,            // no arrow buttons rendered, making swiping the only navigation option
//     centerMode: true,         // ensures the slider always "lands" with {slidesToShow} slide(s) centered in the viewport
//     infinite: false,
//     slidesToShow: 1,          // other slides may be partially visible but only 1 is guaranteed to be in full view whenever the slider "lands"
//     slidesToScroll: 1,        
//     swipeToSlide: true,       // allows user the option to "scrub" through visible cards, regardless of the slidesToScroll setting 
//     variableWidth: true,      // allows slides to maintain fixed width by preventing slick from setting slide width dynamically
//   });

//   // Highlight active button based on current slide (mobile only)
//   $slickContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
//     const cardType = (nextSlide < getFirstDevCardIndex()) ? 'design' : 'development';
//     highlightSelectedButton(cardType);
//   });
  
// });