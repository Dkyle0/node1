const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const NOTES_PATH = path.join(__dirname, 'db.json');

async function addNote (title) {
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString()
	}

	notes.push(note);

	await fs.writeFile(NOTES_PATH, JSON.stringify(notes))
	console.log(chalk.bgGreen('Note was added!'))
}

async function removeNote (id) {
	const notes = await getNotes();
	const filtredNotes = notes.filter((note) => note.id !== String(id));

	await fs.writeFile(NOTES_PATH, JSON.stringify(filtredNotes))
	console.log(chalk.bgRed('Note was removed!'))
}

async function getNotes () {
	const notes = await fs.readFile(NOTES_PATH, {encoding: 'utf-8'});
	const parseNotes = JSON.parse(notes);

	return Array.isArray(parseNotes) ? parseNotes : [];
}

async function printNotes() {
	const notes = await getNotes();

	console.log(chalk.bgBlue('Here is the list of notes'))
	notes.forEach(note => {
		let pretty = note.title.length < 20 ? (' '.repeat(20 - note.title.length)) + '|' : ' |';
		console.log('Title:', chalk.blue(note.title), pretty, 'ID:', chalk.red(note.id));
	})
}

module.exports = {
	addNote, printNotes, removeNote
}