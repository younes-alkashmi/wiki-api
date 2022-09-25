const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model('Article', articleSchema);


app.get('/articles', (req,res)=>{
  Article.find((err,articles)=>{
    if(!err){
      res.send(articles);
    }else{
      res.send(err);
    }
  })
});

app.post('/articles', function(req,res){
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  });
  article.save(err=>{
    if (!err) res.send('Succefully added a new article.');
    else res.send(err);
  });
});

app.listen(3000, _=> console.log('Server started on port 3000. '));
