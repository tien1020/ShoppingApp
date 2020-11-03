const express = require('express')
const router = express.Router()
let notesStore = require('../app').notesStore

router.get('/add',async (req, res, next)=>{
    try {
        res.render('add_note', {
            isCreate: true,
            title: 'Add a Note',
            noteKey: await notesStore.count(),
            isAddNoteActive: 'active'

        })
    } catch(err) {
        next(err)
    }
})

router.post('/save', async (req, res, next) => {
    try {
        let note;
        if(req.body.saveMethod === 'create')
            note = await notesStore.create(req.body.noteKey, req.body.title, req.body.body)
        else
            note = await notesStore.update(req.body.noteKey, req.body.title, req.body.body)
        res.redirect('/notes/view?key='+ req.body.noteKey)
    } catch (err){
        next(err)
    }
})

router.get('/view', async(req, res, next) => {
    try {
        let note = await notesStore.read(req.query.key)
        res.render('view_note', {
            title: "View Note",
            noteTitle: note.title,
            noteKey: note.key,
            noteBody: note.body


        })
    } catch(err){
        next(err)
    }
})

router.get('/edit', async (req, res, next)=>{
    try {
        let note = await notesStore.read(req.query.key)
        res.render('edit_note', {
            isCreate: false,
            title: "Edit Note",
            noteTitle: note.title,
            noteKey: note.key,
            noteBody: note.body

        })
    } catch(err){
        next(err)
    }
})

router.get('/delete', async (req, res, next)=>{
    try{
        let note = await notesStore.read(req.query.key)
        res.render('delete_note', {
            title: "Delete note",
            noteTitle: note.title,
            noteKey: note.key,
            noteBody: note.body


        })

    }
    catch (err){
        next(err)
    }
})

router.get('/destroy', async function(req, res, next) {
    try{
        let note = await notesStore.destroy(req.query.key)
        res.redirect('/notes/viewList')
    }
    catch (err){
        next(err)
    }
})

router.get('/viewList', async function(req, res, next) {

    try {
        let keyList = await notesStore.keyList()
        let keyPromises = keyList.map(key => {
            return notesStore.read(key)
        })
        let allNotes = await Promise.all(keyPromises)
        res.render('view_list', {
            title: 'Notes List',
            noteList: extractNotesToLiteral(allNotes),
            isViewListActive: 'active'
        })
    } catch(err){
        next(err)
    }
})

function extractNotesToLiteral(allNotes) {
    return allNotes.map(note => {
        return {
            key: note.key,
            title: note.title,
        }
    })
}



module.exports = router;