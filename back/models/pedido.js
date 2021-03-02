const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto'
  },
  cantidad: {type: Number, required: true},
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const pedidoSchema = new mongoose.Schema({
    productos: [
    ]
})

pedidoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
module.exports= mongoose.model('Pedido', pedidoSchema)