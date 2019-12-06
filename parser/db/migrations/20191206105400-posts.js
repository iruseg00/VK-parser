"use strict";

module.exports = 
{
    up: (queryInterface, Sequelize) => 
    {
        return queryInterface.createTable("Posts",
        {
            id: 
            {
              type: Sequelize.UUID,
              primaryKey: true,
              defaultValue: Sequelize.UUIDV4
            },
            type: 
            {
                type: Sequelize.STRING,
                allowNull: true
            },
            topic: 
            {
              type: Sequelize.TEXT,
              allowNull: true
            },
            description: 
            {
              type: Sequelize.TEXT,
              get: function() 
              {
                return JSON.parse(this.getDataValue('description'));
              }, 
              set: function(val) 
              {
                return this.setDataValue('description', JSON.stringify(val));
              },
              allowNull: false
            },
            linkPhoto: 
            {
                type: Sequelize.STRING,
                allowNull: true
            },
            link: 
            {
                type: Sequelize.STRING,
                allowNull: false
            },
            timeUTC: 
            {
                type: Sequelize.DATE,
                allowNull: true
            },
            site: 
            {
                type: Sequelize.STRING,
                allowNull: false
            },  
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },
    down: (queryInterface, Sequelize) => 
    {
        return queryInterface.dropTable("Posts");
    }
};