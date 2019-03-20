import anime from 'animejs';
import ScrollMagic from 'scrollmagic';
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

// Icon Animation
$('.dp-icon').each(function() {
  $(this).html(
    $(this)
      .text()
      .replace(/(.)/g, "<span class='icon-character'>$&</span>")
  );
});

// Header Animation
$('.art-possible-container .heading-2').each(function() {
  const wordArray = $(this)
    .text()
    .split(' ');
  const wordSpan = [];
  $.each(wordArray, (index, word) => {
    if (word === ' ') {
      wordSpan.push(`<span class="heading-word">${word}</span>`);
    } else {
      wordSpan.push(`<span class='heading-word'>${word}&#160;</span>`);
    }
  });

  // empty heading content and add span for custom animation
  $(this).empty();

  $.each(wordSpan, (index, span) => {
    $(this).append(span);
  });
});


// Body Animation
$('.art-possible-container .body-text-1').each(function() {
  const wordArray = $(this)
    .text()
    .split(' ');
  const wordSpan = [];
  $.each(wordArray, (index, word) => {
      wordSpan.push(`<span class='text-phase'>${word}&#160;</span>`);
  });

  // empty body content and add span for custom animation
  $(this).empty();

  $.each(wordSpan, (index, span) => {
    $(this).append(span);
  });
});

// Anime.js custom animation 'easeInOut'
const animation = anime
  .timeline({ loop: false }) 
  .add({
    targets: '.dp-icon .icon-character',
    translateY: [70, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 1000,
    delay: (el, i) => {
      return 150 * i;
    }
  })
  .add(
    {
      targets: '.heading-word',
      translateY: [90, 0],
      opacity: [0, 1],
      easing: 'easeInOutSine',
      duration: 1000,
      delay: (el, i) => {
        return 30 * i + 5;
      }
    },
    '-=800'
  ).add(
    {
      targets: '.text-phase',
      translateY: [60, 0],
      opacity: [0, 1],
      easing: 'easeInOutSine',
      duration: 900,
      delay: (el, i) => {
        return 20 * i + 5;
      }
    },
    '-=800'
  );

// Controller tells browser to use scroll bar to trigger animation
// Init ScrollMagic
const controller = new ScrollMagic.Controller();

// Triggers on 'top of div'
const blurbScene1 = new ScrollMagic.Scene({
  triggerElement: '.art-possible-container',
  duration: 0,
  triggerHook: 0.9
})
  .addTo(controller)
  .on('progress', event => {
    animation.play();
  });

// Triggers on 'bottom of div'
const blurbScene2 = new ScrollMagic.Scene({
  triggerElement: '.upward-trigger-element',
  duration: 0,
  triggerHook: 0
})
  .addTo(controller)
  .on('progress', event => {
    animation.play();
  });


