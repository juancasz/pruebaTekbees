const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
})

categoriaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports= mongoose.model('Categoria', categoriaSchema)