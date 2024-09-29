const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to the database"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

// Define the Person schema
const personSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [String],
});

// Create the Person model
const Person = mongoose.model("Person", personSchema);

// Create and Save a Person
const createAndSavePerson = async () => {
	try {
		const person = new Person({
			name: "John Doe",
			age: 25,
			favoriteFoods: ["Pizza", "Pasta"],
		});

		const savedPerson = await person.save();
		console.log("Person saved:", savedPerson); // This should log the saved document with an _id
	} catch (err) {
		console.error("Error saving person:", err);
	}
};

// Call the function to create and save a person
createAndSavePerson();

// Create Many People
const createManyPeople = async (peopleArray) => {
	try {
		const people = await Person.create(peopleArray);
		console.log("People created:", people);
	} catch (err) {
		console.error("Error creating people:", err);
	}
};

// Call the function to create multiple people
createManyPeople([
	{ name: "Alice", age: 30, favoriteFoods: ["Sushi"] },
	{ name: "Bob", age: 20, favoriteFoods: ["Burgers"] },
	{ name: "Charlie", age: 35, favoriteFoods: ["Steak", "Salad"] },
]);

// Find people by name
const findPeopleByName = async (name) => {
	try {
		const people = await Person.find({ name });
		console.log("People found:", people);
	} catch (err) {
		console.error("Error finding people:", err);
	}
};

// Call the function to find people by name
findPeopleByName("John Doe");

// Find one person by favorite food
const findOneByFavoriteFood = async (food) => {
	try {
		const person = await Person.findOne({ favoriteFoods: food });
		console.log("Person found by favorite food:", person);
	} catch (err) {
		console.error("Error finding person:", err);
	}
};

// Call the function to find one person by favorite food
findOneByFavoriteFood("Pizza");

// Find a person by _id
const findPersonById = async (personId) => {
	try {
		const person = await Person.findById(personId);
		console.log("Person found by ID:", person);
	} catch (err) {
		console.error("Error finding person by ID:", err);
	}
};

// Call the function with a valid ObjectId from MongoDB
findPersonById("66f9cb688f5d2f6d9dca9138");

// Find, edit, and save a person
const findEditThenSave = async (personId) => {
	try {
		const person = await Person.findById(personId);
		person.favoriteFoods.push("hamburger"); // Add new food
		const updatedPerson = await person.save(); // Save updated person
		console.log("Updated person:", updatedPerson);
	} catch (err) {
		console.error("Error editing person:", err);
	}
};

// Call the function with a valid ObjectId
findEditThenSave("66f9cc01afb8bf71c6be95f0");

// Update a person's age
const findAndUpdatePerson = async (personName) => {
	try {
		const updatedPerson = await Person.findOneAndUpdate(
			{ name: personName },
			{ age: 20 },
			{ new: true } // Return the updated document
		);
		console.log("Updated person:", updatedPerson);
	} catch (err) {
		console.error("Error updating person:", err);
	}
};

// Call the function to update a person's age
findAndUpdatePerson("John Doe");

// Delete a person by ID
const deletePersonById = async (personId) => {
	try {
		const deletedPerson = await Person.findByIdAndDelete(personId);
		console.log("Deleted person:", deletedPerson);
	} catch (err) {
		console.error("Error deleting person:", err);
	}
};

// Call the function with a valid ObjectId
deletePersonById("66f9cd0b0251c90f2083ff04");

// Delete all people named Mary
const deleteManyPeople = async (name) => {
	try {
		const result = await Person.deleteMany({ name });
		console.log("Deleted people:", result);
	} catch (err) {
		console.error("Error deleting people:", err);
	}
};

// Call the function to delete many people
deleteManyPeople("Mary");

// Chain query helpers
const queryChain = async () => {
	try {
		const result = await Person.find({ favoriteFoods: "burritos" })
			.sort({ name: 1 }) // Sort by name
			.limit(2) // Limit to 2 results
			.select("-age") // Exclude age field
			.exec();

		console.log("Query result:", result);
	} catch (err) {
		console.error("Error with query chain:", err);
	}
};

// Call the query chain
queryChain();
