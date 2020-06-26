const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random',(req,res) => {
  const q = getRandomElement(quotes);
  res.send({
    quote: q
  });
});


app.get('/api/quotes',(req,res) => {
  const queries = req.query.person;
  if (queries !== undefined){
    let quotesArr = quotes.filter(q => (
       q.person === queries
    ));
    res.send({
      quotes: quotesArr
    });
  }
  else{
    res.send({
      quotes: quotes
    });
  }
})

app.post('/api/quotes',(req,res) => {
  const newQ = {
    quote: req.query.quote,
    person: req.query.person
  }
  if (newQ.quote && newQ.person){
    quotes.push(newQ);
    res.send({quote: newQ});
  }
  else{
    res.status(400).send();
  }
});



app.listen(PORT, () => {
  console.log('Started listening on server.');
})