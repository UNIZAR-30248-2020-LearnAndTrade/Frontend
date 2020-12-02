const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('/app/dist/learn-trade'));
app.get('/*',function(req,res){
  res.sendFile(path.join('/app/dist/LearnTrade/index.html'));
});

app.listen(process.env.PORT || 8080);
