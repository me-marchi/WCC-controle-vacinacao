const Vaccine = require("../models/Vaccines.js");

const createVaccine = async (req, res) => {
    const { name, expected_date, vaccinated } = req.body
    try {
        const vaccine = await Vaccine.create({ name, expected_date, vaccinated });
        console.log(`Sua vacina ${vaccine.name} foi cadastrada`);
        res.status(201).send(vaccine);
    } catch (error) {
        console.log(error);
        messageError(res, error);
    };
};

const getAllVaccines = async (req, res) => {
    const { favorite = false } = req.query;
    try {
        const where = favorite ? { where: { favorite } }: {}
        const vaccine = await Vaccine.findAll(where);

        vaccine && vaccine.length > 0 ? res.status(200).send(vaccine) : res.status(204).send();
    } catch (error) {
        messageError(res, error);
    };
};

const getVaccine = async (req, res) => {
    const vaccineId = req.params.id
    try {
        const vaccine = await Vaccine.findOne({
            where: { id: vaccineId }
        });

        vaccine ? res.status(200).send(vaccine) : res.status(404).send({ message: `Vacina de ID ${vaccineId} não foi encontrada.` });
    } catch (error) {
        messageError(res, error);
    };
};

const updateVaccinated = async (req, res) => {
    const vaccineId = req.params.id;
    const vaccinated = req.body.vaccinated;
    try {
        const rowsUpdated = await Vaccine.update({ vaccinated }, { where: { id: vaccineId} });
        
        rowsUpdated && rowsUpdated > 0 ? res.status(200).send({message: `${rowsUpdated[0]} informação de vacina atualizada com sucesso` }) : res.status(404).send({ message: `Vacina com ID ${vaccineId} não encontrada para atualizar informação.` }); 
    } catch (error) {
        messageError(res, error);
    };
};

const deleteVaccine = async (req, res) => {
    const vaccineId = req.params.id;
    try {
        const rowsDeleted = await Vaccine.destroy({ where: { id: vaccineId } });
        
        rowsDeleted ? res.status(200).send({ message: `Vacina com ID ${vaccineId} deletada com sucesso` }) : res.status(404).send({ message: `Vacina com ID ${vaccineId} não encontrada para deletar` });
    } catch (error) {
        messageError(res, error);
    };
};

const messageError = (res, error) => {
    res.status(500).send({ message: error.message });
};

module.exports = {
    createVaccine,
    getAllVaccines,
    getVaccine,
    updateVaccinated,
    deleteVaccine
};