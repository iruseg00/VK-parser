const Posts = require("../db/models/Posts");

class PostsService 
{
    
  create(body) {
    return Posts.findOrCreate({
      where: {
        link: body.link
      },
      defaults: {
        type: body.type ,
        topic: body.topic ,
        description: body.text ,
        timeUTC: body.timeUTC ,
        site: body.site ,
        linksPhoto: body.linksPhoto ,
        link: body.link ,
      }
    });
  }
}

module.exports = new PostsService();