const {  getEntriesByEmail, getAllEntries, createEntries, updateEntry, deleteEntry } = require("../models/entries");


const getEntries = async (req, res) => {
    let data;
    let { email } = req.query
    try {
        if (email) {
            data = await getEntriesByEmail(email)
            if (data.length == 0) {
                return res.status(404).json({ ok: false, msg: "no existe el email" })
            }
        } else {
            data = await getAllEntries()
        }
        res.status(200).json({ ok: true, data })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error al obtener entradas" })
    }
}


const createEntries = async (req, res) => {
    let data;
    const body = req.body
    try {
        data = await createEntries(body)
        console.log(data)
        res.status(200).json({ ok: true })

    } catch (error) {
        res.status(500).json({ ok: false, msg: "error al crear" })
    }
}


const updateEntries = async (req, res) => {
    const newBody = req.body
    let { title } = req.query
    try {
        const result = await updateEntry(newBody, title)
        if (!result.ok) {
            res.status(404).json({ ok: false, msg: result.msg })
        } else { res.status(200).json({ ok: true }) }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error al actualizar" })
    }

}


const deleteEntries = async (req, res) => {
    let { title } = req.query
    try {
        const result = await deleteEntry(title)
        if (!result.ok) {
            res.status(404).json({ ok: false, msg: result.msg })
        } else { res.status(200).json({ ok: true }) }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error al borrar" })
    }
}

module.exports = { getEntries, createEntries, updateEntries, deleteEntries }