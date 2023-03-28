const { Pool } = require('pg')
 
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'blog',
    password: 'admin'
})

//ACCEDER A LOS AUTORES POR EMAIL

const getAuthByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(`
        SELECT *
        FROM authors
        WHERE email=$1
        `, [email])
        result = data.rows;
    } catch (error) {
        console.error(error)
    } finally {
        client.release()
    }
    return result
}

//TRAER TODOS LOS AUTORES

const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(`
        SELECT *
        FROM authors
        `)
        result = data.rows;
    } catch (error) {
        console.error(error)
    } finally {
        client.release()
    }
    return result
}

//CREAR AUTOR

const createAuthor = async (name, surname, email, image) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(`
        INSERT INTO authors (name, surname, email, image)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [name, surname, email, image])
        result = data.rows;
    } catch (error) {
        console.error(error)
    } finally {
        client.release()
    }
    return result
}

//ELIMINAR AUTOR

const deleteAuthor = async (id) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(`
        DELETE FROM authors
        WHERE id_author = $1
        `, [id])
        result = data.rows;
    } catch (error) {
        console.error(error)
    } finally {
        client.release()
    }
    return result
}

//ACTUALIZAR AUTOR

const updateAuthor = async (id, name, surname, email, image) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(`
        UPDATE authors
        SET name = $2,
            surname = $3,
            email = $4,
            image = $5
        WHERE id_author = $1
        RETURNING *
        `, [id, name, surname, email, image])
        result = data.rows;
    } catch (error) {
        console.error(error)
    } finally {
        client.release()
    }
    return result
}

module.exports = {
    getAuthByEmail,
    getAllAuthors,
    createAuthor,
    deleteAuthor,
    updateAuthor
}
