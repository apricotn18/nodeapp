var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var { Configuration, OpenAIApi } = require("openai");

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
  // var completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{role: "user", content: "おすすめの朝ごはん"}],
  // });

  res.render('index', {
    type: req.body.type || 'breakfast',
    // title: completion.data.choices[0].message.content,
  });
});

router.get('/', async(req, res, next) => {
  res.render('index', {
    type: 'breakfast',
    // title: completion.data.choices[0].message.content,
  });
});

module.exports = router;
