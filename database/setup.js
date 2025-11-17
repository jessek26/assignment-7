const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

// Initialize Sequelize
const db = new Sequelize({
    dialect: 'sqlite',
    storage: `database/${process.env.DB_NAME}` || 'database/music_library.db',
    logging: false 
});

// STEP 7: Create Track Model
const Track = db.define('Track', {
    trackId: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER 
    },
    releaseYear: {
        type: DataTypes.INTEGER
    }
});

//Create the Database and Tables
async function setupDatabase() {
    try {
        await db.authenticate();
        console.log('Connection to database established successfully.');

        // Creates the table (dropping it first if it exists)
        await db.sync({ force: true });
        console.log("Database and tables created successfully");

        await db.close();

    } catch(error) {
        console.error('Unable to connect to the database', error);
    }
}

// Export the model and db connection
module.exports = { db, Track };

if (require.main === module) {
    setupDatabase();
}