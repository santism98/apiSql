const express=require('express');
const router= express.Router();
const {createEntry,deleteEntries,getEntryByEmail,updateEntries, getEntries}=require('../controllers/apiEntriesController')

//router.get('/:email', getEntryByEmail)
router.get('/entries', getEntries)
router.post('/', createEntry)
router.delete('/:id/:email', deleteEntries)
router.put('/:id/:email', updateEntries)



module.exports=router;

