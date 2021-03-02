const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    barCode: {type: Number, required: true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    precio: {type: Number, required: true},
    cantidad: {type: Number, min: 0,required: true},
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
})

productoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports= mongoose.model('Producto', productoSchema)