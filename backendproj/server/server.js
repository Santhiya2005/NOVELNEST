
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/NovelNest', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors()); 

const bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	genre: String,
	description: String,
	price: Number,
	image: String,
});

const Book = mongoose.model('Book', bookSchema);

const seedDatabase = async () => {
	try {
		await Book.deleteMany(); 

		const books = [
			{ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 20, image: 'https://m.media-amazon.com/images/I/51okr6oj6-L.jpg' },
			{ title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 15, image: 'https://m.media-amazon.com/images/I/519fpO5ELjL._SY445_SX342_.jpg' },
			{ title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 255, image: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781839644740/george-orwell-visions-of-dystopia-9781839644740_lg.jpg' },
			{ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 220, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5KXeQ6a9QqJ9KKpbfjj7sCbhsBIcqIl9JCdzfA2-iog&s' },
			{ title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 1115, image: 'https://m.media-amazon.com/images/I/41JjGbElwVL.jpg' },
			{ title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 125, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbni5JcioPpoLbHI3YlRJJfSEisrTw4Vga84mwOIKPNQ&s'},
		
		];
		
		await Book.insertMany(books);
		console.log('Database seeded successfully');
	} catch (error) {
		console.error('Error seeding database:', error);
	}
};


seedDatabase();


app.get('/api/books', async (req, res) => {
	try {
		
		const allBooks = await Book.find();

		
		res.json(allBooks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

