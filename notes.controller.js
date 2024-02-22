const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const NOTES_PATH = path.join(__dirname, 'db.json');


async function writeFile(notes) {
	try {
		await fs.writeFile(NOTES_PATH, JSON.stringify(notes));
	} catch (error) {
		console.error(chalk.red('Error writing file:', error));
	}
}

async function addNote (title) {
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString()
	}

	notes.push(note);

	await writeFile(notes);
	console.log(chalk.bgGreen('Note was added!'))
}

async function editNote (id, title) {
	if (id) {
		const notes = await getNotes();
		notes.forEach((note) => {
			if (note.id === String(id)) {
				note.title = title;
			}
		})
	
		await await writeFile(notes);
		console.log(chalk.bgGreen('Note was updated!'))			
	}
}

async function removeNote (id) {
	const notes = await getNotes();
	const filtredNotes = notes.filter((note) => note.id !== String(id));

	await writeFile(filtredNotes);
	console.log(chalk.bgRed('Note was removed!'))
}

async function getNotes () {
	try {
		const data = await fs.readFile(NOTES_PATH, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}

	return [];
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
	addNote, removeNote, getNotes, editNote
}
