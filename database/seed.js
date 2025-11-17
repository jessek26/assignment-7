const { db, Track } = require('./setup');

// Sample data (I made this because I couldn't find the provided data)
const sampleTracks = [
    {
        songTitle: "Billie Jean",
        artistName: "Michael Jackson",
        albumName: "Thriller",
        genre: "Pop",
        duration: 294,
        releaseYear: 1982
    },
    {
        songTitle: "Smells Like Teen Spirit",
        artistName: "Nirvana",
        albumName: "Nevermind",
        genre: "Grunge",
        duration: 301,
        releaseYear: 1991
    },
    {
        songTitle: "Bohemian Rhapsody",
        artistName: "Queen",
        albumName: "A Night at the Opera",
        genre: "Rock",
        duration: 355,
        releaseYear: 1975
    },
    {
        songTitle: "Hotel California",
        artistName: "Eagles",
        albumName: "Hotel California",
        genre: "Rock",
        duration: 390,
        releaseYear: 1976
    }
];

async function seedDatabase() {
    try {
        await db.authenticate();
        console.log('Connected to database for seeding.');

        // Insert data w/ bulkCreate
        await Track.bulkCreate(sampleTracks);
        console.log('Sample tracks inserted successfully.');

        const allTracks = await Track.findAll();
        console.log('Tracks in database:', allTracks.length);

        await db.close();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();