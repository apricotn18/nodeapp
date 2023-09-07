var express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var router = express.Router();
var { Configuration, OpenAIApi } = require("openai");

var typeOfMeal = {
  breakfast: '朝ごはん',
  lunch: '昼ごはん',
  dinner: '夜ごはん'
};
var defaultType = 'breakfast';

// dotenv
dotenv.config();

// bodyParser
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// openai
var configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
var openai = new OpenAIApi(configuration);

console.log('http://localhost:3000/');

router.post('/', async(req, res, next) => {
  var type = req.body.type || defaultType;
  var completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "おすすめの" + typeOfMeal[type]}],
  });
  res.render('index', {
    typeOfMeal,
    type,
    text: completion.data.choices[0].message.content,
  });
});

router.get('/', async(req, res, next) => {
  var type = defaultType;
  var completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "おすすめの" + typeOfMeal[type]}],
  });
  res.render('index', {
    typeOfMeal,
    type,
    text: completion.data.choices[0].message.content,
  });
});

module.exports = router;
