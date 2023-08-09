var express = require('express');
var router = express.Router();
var { Configuration, OpenAIApi } = require("openai");

var configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
var openai = new OpenAIApi(configuration);

router.get('/', async(req, res, next) => {
  var completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "おすすめの朝ごはん"}],
  });

  res.render('index', {
    title: completion.data.choices[0].message.content,
  });
});

module.exports = router;
