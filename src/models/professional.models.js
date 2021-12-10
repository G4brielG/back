const { model, Schema } = require("mongoose");

const Profesionales = new Schema({
  datos_personales: {
    nombre_completo: {
      type: String,
      require: true,
    },
    fecha_nacimiento: {
      type: Date,
      require: true,
    },
    dni: {
      type: String,
      require: true,
      unique: true,
    },
    sexo: {
      type: String,
      require: true,
    },
    telefono: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    es_profesional: {
      type: Boolean,
      require: true,
    },
  },

  info_profesional: {
    certificaciones: {
      type: Array,
    },
    img_certif: {
      type: Array,
    },
    rubros: {
      type: Array,
    },
  },

  info_lugar_trabajo: {
    dias_atencion: {
      type: String,
    },
    horario_atencion: {
      type: String,
    },
    direccion: {
      type: String,
    },
    marcador: {
      latitud: {
        type: String,
      },
      longitud: {
        type: String,
      },
    },
  },
});

module.exports = model("Profesionales", Profesionales);
