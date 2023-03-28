const { geTEntriesByEmail, getAllEntries, updateEntry, createEntries } = require('../models/entries')

// GET ALL ENTRIES
const getEntries = async (req, res) => {
    try {
        const data = await getAllEntries();
        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'Error al obtener las entradas'
        });
    }
}

// GET ENTRIES BY EMAIL
const getEntryByEmail = async (req, res) => {
    const email = req.body.email;
    try {
        const data = await geTEntriesByEmail(email);
        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'Error al obtener las entradas por email'
        });
    }
}

// CREATE ENTRY
const createEntry = async (req, res) => {
    const email = req.body.email;
    try {
        const data = await createEntries(email);
        res.status(201).json({
            ok: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'Error al crear una entrada'
        });
    }
}

// UPDATE ENTRY
const updateEntries = async (req, res) => {
    const { id } = req.params;
    const entry = req.body;
    try {
        const updatedEntry = await updateEntry(id, entry);
        res.status(200).json({
            ok: true,
            data: updatedEntry
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'Error al actualizar la entrada'
        });
    }
}

// DELETE ENTRY
const deleteEntry = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteEntry(id);
        res.status(204).json({
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'Error al eliminar la entrada'
        });
    }
}

module.exports = {
    getEntries,
    getEntryByEmail,
    createEntry,
    updateEntries,
    deleteEntry
};
