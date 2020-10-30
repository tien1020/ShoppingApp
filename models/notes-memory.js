let Note = require('./notes').Note
let AbstractNotesStore = require('./notes').AbstractNotesStore

let notes = [];
exports.InMemoryNotesStore = class InMemoryNotesStore extends AbstractNotesStore {
    async close(){ }

    async update(key, title, body) {
        notes[key].title = title
        notes[key].body = body
        return notes[key]

    }

    async create(key, title, body){
        notes[key] = new Note(key, title, body)
        return notes[key]
    }

    async read(key){
        if (notes[key])
            return notes[key]
        else
            throw new Error(`Note ${key} does not exist`)
    }

    async destroy(key) {
        if (notes[key])
            delete notes[key]
        else
            throw new Error(`Note ${key} does not exist`)
    }

    async keyList() {
        return Object.keys(notes)
    }

    async count(){
        return notes.length
    }
}