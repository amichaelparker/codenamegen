var axios = require('axios');
var cheerio = require('cheerio');
var express = require('express');
var router = express.Router();

var store = [], names = [];
var codeName;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { random: names[Math.floor(Math.random() * names.length)] });
});

function getPage(callback) {
  axios.get('https://en.wikipedia.org/wiki/List_of_Intel_codenames').then(response => {
    if (response.status == 200) {
      var $ = cheerio.load(response.data, {
        normalizeWhitespace: true
      });
    }
    callback($);
  }).catch(e => console.log(e))
}

function pushNames(page) {
  page('td', '.wikitable').each(function () {
    store.push(page(this).text());
  })
  
  store.filter(function (element, index) {
    if (index % 5 === 0)
      return names.push(element);
  })
  getCodeName();
}

function getCodeName() {
  codeName = names[Math.floor(Math.random() * names.length)];
}

getPage(pushNames);

module.exports = router;
