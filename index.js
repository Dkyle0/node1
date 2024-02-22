const yargs = require('yargs');
const { addNote, printNotes, removeNote, editNote } = require('./notes.controller');
const pkg = require('./package.json');

yargs.version(pkg.version)

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
  	title : {
  		type: 'string',
  		discribe: 'Note title',
  		demandOption: true
  	}
  },
  handler({title}) {
    addNote(title)
  }
});


yargs.command({
  command: 'list',
  describe: 'Print all notes',
  async handler() {
  	printNotes();
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  async handler({id}) {
  	removeNote(id);
  }
});

yargs.command({
  command: 'edit',
  describe: 'Edit note by id',
  builder: {
    title : {
      type: 'string',
      discribe: 'Note title',
      demandOption: true
    },
      id: {
      type: 'string',
      discribe: 'Note id',
      demandOption: true
    }
  },
  handler({id, title}) {
    editNote(id, title)
  }
});



yargs.argv;