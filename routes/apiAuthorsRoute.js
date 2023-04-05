const express = require('express');
const router = express.Router();
const {createAuthors,deleteAuthors,getAuthors,updateAuthors} = require('../controllers/apiAuthorsControllers');

// Rutas para los autores
router.get('/authors', getAuthors);
//router.get('/authors/:email', getAuthByEmail);
router.post('/authors', createAuthors);
router.put('/authors/:id', updateAuthors);
router.delete('/authors/:id', deleteAuthors);

module.exports = router;
