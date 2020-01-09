'use strict';
const keywordsArr = [];

function Horns(item) {
  this.url = item.image_url;
  this.title = item.title;
  this.desc = item.description;
  this.keyword = item.keyword;
  this.numhorns = item.horns;

  keywordsArr.push(this.keyword);
}

Horns.allHorns = [];

Horns.prototype.render = function() {
  $('main').append('<section class="copy"></section>');
  let $hornsCopy = $('section[class = "copy"]');
  let $hornsHTML = $('#photo-template').html();

  $hornsCopy.html($hornsHTML);
  $hornsCopy.find('h2').text(this.title);
  $hornsCopy.find('img').attr('src', this.url);
  $hornsCopy.find('p').text(this.desc);
  $hornsCopy.removeClass('copy');
  $hornsCopy.attr('class', this.title);

};

Horns.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horns.allHorns.push(new Horns(item));
      });
    })
    .then(Horns.loadHorns);
};
Horns.loadHorns = () => {
  Horns.allHorns.forEach(Horns => Horns.render());
};

$(() => Horns.readJson());

// Create a <select> element which contains unique <option> elements extracted dynamically from the JSON file, one for each keyword.
console.log(keywordsArr);
const optionsRender = (arr) => {
  arr.forEach((keySelect) => {
    $('select').append(`<option>${arr}</option>`);
  });
};
console.log('options function', $(() => optionsRender(keywordsArr)));

$(() => optionsRender(keywordsArr));
// let selectKey = () => {
// $('option').on('select', keywordsArr.forEach());

  // $('').show();
  // $('').hide();
// };

// $(() => selectKey());


// Use an event handler to respond when the user chooses an option from the select menu. Hide all of the images, then show those whose keyword matches the option chosen.


//selector.on(event, callback);