const { getAuthByEmail, getAllAuthors, createAuthor, updateAuthor, deleteAuthor } = require("../models/author");

const getAuthors = async (req, res) => {
    let data;
    let { email } = req.query
    try {
        if (email) {
            data = await getAuthByEmail(email)
            if (data.length == 0) {
                return res.status(404).json({ ok: false, msg: "Email doesn't exist" })
            }
        } else {
            data = await getAllAuthors()
        }
        res.status(200).json({ ok: true, data })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error getting authors" })
    }

}
const createAuthors = async (req, res) => {
    let data;
    const body = req.body
    try {
        data = await createAuthor(body)
        if (!data.ok) { return res.status(500).json({ ok: false, msg: data.msg }) }
        else { res.status(200).json({ ok: true }) }

    } catch (error) {
        res.status(500).json({ ok: false, msg: "error creating entries" })
    }
}
const updateAuthors = async (req, res) => {
    const newBody = req.body
    let email = req.query.email
    try {
        const result = await updateAuthor(newBody, email)
        if (!result.ok) {
            res.status(404).json({ ok: false, msg: result.msg })
        } else { res.status(200).json({ ok: true, msg: result.msg }) }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error updating entries" })
    }
}
const deleteAuthors = async (req, res) => {
    let { email } = req.query
    try {
        const result = await deleteAuthor(email)
        if (!result.ok) {
            res.status(404).json({ ok: false, msg: result.msg })
        } else { res.status(200).json({ ok: true }) }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error deleting author" })
    }
}

module.exports = { getAuthors, createAuthors, updateAuthors, deleteAuthors }