const Profesionales = require("../models/professional.models");
// const { findByIdAndDelete } = require("../models/professional.models");
const controller = {};

controller.getProfesionales = async (_req, res) => {
  const profesionales = await Profesionales.find({ active: true });

  res.json(profesionales);
};

controller.getProfesional = async (req, res) => {
  const { id } = req.params;

  try {
    const profesionales = await Profesionales.findOne({ _id: id });
    res.json(profesionales);
  } catch (error) {
    res.json({
      msg: "Error al obtener profesional",
    });
  }
};

controller.createProfesional = async (req, res) => {
  const { personal_info, contact_info, academic_info, professional_info } =
    req.body;

  try {
    const profesionales = new Profesionales({
      personal_info,
      contact_info,
      academic_info,
      professional_info,
    });
    await profesionales.save();

    res.json({
      msg: "profesional agregado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "ocurrio un error al crear registro",
    });
  }
};

controller.updateProfesional = async (req, res) => {
  const { id } = req.params;
  const { personal_info, contact_info, academic_info, professional_info } =
    req.body;
  const update = {};

  if (personal_info) {
    update.personal_info = personal_info;
  }

  if (contact_info) {
    update.contact_info = contact_info;
  }

  if (academic_info) {
    update.academic_info = academic_info;
  }

  if (professional_info) {
    update.professional_info = professional_info;
  }

  const execute_validation =
    update.personal_info ||
    update.contact_info ||
    update.academic_info ||
    update.professional_info;

  if (execute_validation) {
    try {
      await Profesionales.findByIdAndUpdate(id, update, {
        new: true,
      });
      return res.json({ msg: "Datos de profesional actualizados" });
    } catch (error) {
      return res.status(401).json({ msg: "Error al actualizar profesional" });
    }
  } else {
    res.status(401).json({
      msg: "no se enviaron datos",
    });
  }
};

controller.deleteProfesional = async (req, res) => {
  const { id } = req.params;

  try {
    await Profesionales.findByIdAndDelete(id);

    res.json({
      msg: "el profesional se elimino del sistema",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error al eliminar profesional" });
  }
};

module.exports = controller;
