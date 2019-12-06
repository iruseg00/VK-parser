const Sequelize = require("sequelize");
const Posts = require("../db/models/Posts");
const Op = Sequelize.Op;


class PostsService {
  
    getAll() {
      return Posts.findAll({});
    }
    
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
          link: body.link ,
          linkPhoto: body.linkPhoto ,
        }
      });
    }
  }
  
  module.exports = new PostsService();