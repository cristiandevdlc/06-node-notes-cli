const fs = require('node:fs');
const path = require('node:path');

const file = path.join(__dirname, 'notes.json');
const read = () => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
const write = notes => fs.writeFileSync(file, JSON.stringify(notes, null, 2));
const [command, ...args] = process.argv.slice(2);
const notes = read();

if (command === 'add') {
  const text = args.join(' ').trim();
  if (!text) throw new Error('Escribe el contenido de la nota');
  notes.push({id: Date.now(), text, createdAt: new Date().toISOString()});
  write(notes);
  console.log('Nota guardada');
} else if (command === 'list' || command === 'search') {
  const query = command === 'search' ? args.join(' ').toLowerCase() : '';
  notes.filter(note => note.text.toLowerCase().includes(query))
    .forEach(note => console.log(`[${note.id}] ${note.text}`));
} else {
  console.log('Uso: node notes.js add "texto" | list | search palabra');
}
