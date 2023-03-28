const express = require('express');
const router = express.Router();
const {createAuthor,deleteAuthor,getAllAuthors,getAuthorByEmail,updateAuthor} = require('../controllers/apiAuthorsControllers');

// Rutas para los autores
router.get('/authors', getAllAuthors);
router.get('/authors/:email', getAuthorByEmail);
router.post('/authors', createAuthor);
router.put('/authors/:id', updateAuthor);
router.delete('/authors/:id', deleteAuthor);

module.exports = router;
