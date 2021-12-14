const Profesionales = require("../models/professional.models");
// const { findByIdAndDelete } = require("../models/professional.models");
const controller = {};

controller.getProfesionales = async (_req, res) => {
  const profesionales = await Profesionales.find({}).sort({ likes: 1 });

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
  const { datos_personales, info_profesional, info_lugar_trabajo } = req.body;

  try {
    const profesionales = new Profesionales({
      datos_personales,
      info_profesional,
      info_lugar_trabajo,
    });
    await profesionales.save();

    res.json({
      msg: "persona agregada",
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
  const { datos_personales, contact_info, info_lugar_trabajo } = req.body;
  const update = {};

  if (datos_personales) {
    update.datos_personales = datos_personales;
  }

  if (contact_info) {
    update.info_profesional = contact_info;
  }

  if (info_lugar_trabajo) {
    update.info_lugar_trabajo = info_lugar_trabajo;
  }

  const execute_validation =
    update.datos_personales ||
    update.info_profesional ||
    update.info_lugar_trabajo;

  if (execute_validation) {
    try {
      await Profesionales.findByIdAndUpdate(id, update, {
        new: true,
      });
      return res.json({ msg: "Datos actualizados" });
    } catch (error) {
      return res.status(401).json({ msg: "Error al actualizar" });
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
      msg: "Se eliminó correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al eliminar" });
  }
};

controller.likes = async (req, res) => {
  const { id } = req.params;
  const { like } = req.body;

  const Profesional = await Profesionales.findById(id);

  const { likes } = req.body;

  if (like == false) {
    try {
      Profesional.info_profesional.likes -= 1;
      const { info_profesional } = Profesional;
      await Profesionales.findByIdAndUpdate(id, { info_profesional });
    } catch (error) {
      res.json({ msg: "Se restó un like" });
    }
  } else if (like == true) {
    try {
      Profesional.info_profesional.likes += 1;
      const { info_profesional } = Profesional;
      await Profesionales.findByIdAndUpdate(id, { info_profesional });
    } catch (error) {
      res.json({ msg: "Se sumó un like" });
    }
  }
};

module.exports = controller;
