'use strict';

// let allhorns = [];

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
