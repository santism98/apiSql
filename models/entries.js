const { Pool } = require('pg');
 
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'blog',
    password: 'admin'
});

const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`
            SELECT * 
            FROM entries
        `);
        result = data.rows;
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
    return result;
};

const geTEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`
            SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
            FROM entries AS e
            INNER JOIN authors AS a
            ON e.id_author=a.id_author
            WHERE a.email=$1
            ORDER BY e.title;
        `, [email]);
        result = data.rows;
        console.log(result);
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
    return result;
};

const createEntries = async (title, content, date, category, id_author) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`
            INSERT INTO entries (title, content, date, category, id_author)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [title, content, date, category, id_author]);
        result = data.rows;
        console.log(result);
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
    return result;
};

const updateEntry = async (id_entry, email, title) => { 
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`
            UPDATE entries
            SET title = $1
            WHERE id_entry = $2
            AND id_author = (
                SELECT id_author
                FROM authors
                WHERE email = $3
            )
            RETURNING *
        `, [title, id_entry, email]);
        result = data.rows;
        console.log(result);
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
    return result;
};

const deleteEntry=async (id)=>{
 

let client, result;
try {
    client=await pool.connect()
    const data=await client.query(`
    DELETE FROM entries
    WHERE id =$1 ; `[id])
result=data.rows;

console.log(data)
    
} catch (error) {
    
}finally{
    client.release()


}

return  { status: 200, message: 'La entrada se ha actualizado correctamente.' }, result;
}



module.exports={
    geTEntriesByEmail,
    getAllEntries,
    createEntries,
    updateEntry,
    deleteEntry
}