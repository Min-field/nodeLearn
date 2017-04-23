var express = require("express"), 
    superagent = require("superagent"),
    fs = require("fs"),
    cheerio = require("cheerio"); 

var app = express(); 
app.get("/", function(req, response){
    superagent.get('https://cnodejs.org/')               //获取到https://cnodejs.org/的html
        .end(function(err, sres){
                if(err){
                    return next(err); 
                }

                var $ = cheerio.load(sres.text)          //将html的text数据传给cheerio，并使用load加载，
                                                         //使之可以石油jquery的方式加载使用
                var res = []; 
                $('#topic_list .topic_title').each(function(index, ele){
                    var $ele = $(ele); 
                    res.push({
                        title: $ele.attr('title'), 
                        href: $ele.attr('href')
                    }); 
                });
                
                res = JSON.stringify(res, null, "\n");
                fs.writeFile("res.json", res, function(){
                    response.sendFile("./res.json");          //如何获取文件，这里有问题
                });

                 
        });
});

app.listen(3000, function(req, res){
    console.log("server in running in port 3000");
})