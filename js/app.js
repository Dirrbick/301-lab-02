'use strict';

let keywordsArr = ['narwhal', 'rhino', 'unicorn', 'unilego', 'triceratops', 'markhor', 'mouflon', 'addax', 'chameleon', 'lizard', 'dragon'];

function Horns(item) {
  this.url = item.image_url;
  this.title = item.title;
  this.desc = item.description;
  this.keyword = item.keyword;
  this.numhorns = item.horns;
}

Horns.allHorns = [];

Horns.prototype.render = function() {
  $('main').append('<div class="copy"></div>');
  let $hornsCopy = $('div[class = "copy"]');
  let $hornsHTML = $('#photo-template').html();

  $hornsCopy.html($hornsHTML);
  console.log($hornsHTML);
  $hornsCopy.find('h2').text(this.title);
  $hornsCopy.find('img').attr('src', this.url);
  $hornsCopy.find('p').text(this.desc);
  $hornsCopy.removeClass('copy');
  $hornsCopy.attr('class', this.title);
  console.log('after find and text', $hornsHTML);
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

keywordsArr.forEach(function(keySelect) {
  let keyOption = keySelect;
  $('select').append(`<option>${keyOption}</option>`);
});

$(() => keywordsArr.forEach());

// Use an event handler to respond when the user chooses an option from the select menu. Hide all of the images, then show those whose keyword matches the option chosen.

