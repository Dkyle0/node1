const chalk = require('chalk');
const Note = require('./models/Note');

async function writeFile(notes) {
	try {
		await Note.create(notes);
	} catch (error) {
		console.error(chalk.red('Error writing file:', error));
	}
}

async function addNote (title, owner) {
	const notes = await getNotes();

	const note = {
		title,
		owner,
	}

	notes.push(note);
	console.log(owner)
	await writeFile(notes);
	console.log(chalk.bgGreen('Note was added!'))
}

async function editNote (id, newTitle, owner) {
	if (id) {
		const result = await Note.updateOne({_id: id, owner}, {title: newTitle});

		if (result.matchedCount == 0) {
			throw new Error('No note to edit');
		}
		else {
			console.log(chalk.bgGreen('Note was updated!'));			
		}
	}
}

async function removeNote(id, owner) {

	await Note.deleteOne({_id : id, owner});
	console.log(chalk.bgRed('Note was removed!'))
}

async function getNotes () {
	try {
		const data = await Note.find();
		return data;
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
