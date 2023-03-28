const authorModel = require('../models/authors');
const entryModel = require('../models/entries'); //lo necesito para el delete

const getAuthorByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const author = await authorModel.getAuthByEmail(email);
    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorModel.getAllAuthors();
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


const createAuthor = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const result = await authorModel.createAuthor(name, surname, email, password);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateAuthor = async (req, res) => {
    try {
      const { id_author } = req.params;
      const { name, surname, email, password } = req.body;
      const result = await authorModel.updateAuthor(id_author, name, surname, email, password);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  const deleteAuthor = async (req, res) => {
    let client;
    try {
      const { id_author } = req.params;
      client = await authorModel.pool.connect();
      await client.query('BEGIN');
      await authorModel.deleteAuthor(client, id_author);
      await entryModel.deleteEntriesByAuthor(client, id_author);
      await client.query('COMMIT');
      res.json({ status: 200, message: 'El autor y sus publicaciones se han eliminado correctamente.' });
    } catch (error) {
      console.error(error);
      await client.query('ROLLBACK');
      res.status(500).json({ error: 'Server error' });
    } finally {
      client.release();
    }
  };


  module.exports ={
    createAuthor,
    getAllAuthors,
    getAuthorByEmail,
    deleteAuthor,
    updateAuthor
  }

