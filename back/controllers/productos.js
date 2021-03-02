const productoRouter = require('express').Router()
const Producto = require('../models/producto')

productoRouter.get('/', async(req,res,next) => {
    try{
        const productos = await Producto.find({})
        return res.json(productos.map(producto => producto.toJSON()))
    }catch(error){
        next(error)
    }
})

productoRouter.get('/:id', async(req,res,next) => {
    try{
        const producto = await Producto.findById(req.params.id)
        if(producto){
            return res.json(producto.toJSON())
        }
        return res.status(404).end()
    }catch(error){
        next(error)
    }
})

productoRouter.post('/', async(req,res,next) => {
    const body = req.body
    const producto = new Producto({
        barCode: body.barCode,
        precio: body.precio,
        cantidad: body.cantidad,
        nombre: body.nombre,
        descripcion: body.descripcion,
        categoria: body.categoria
    })

    if(Object.keys(producto).some(producto => producto === undefined)){
        return res.status(400).json({error:"Falta Información"})
    }
    
    try{
        const savedProducto = await producto.save()
        return res.status(201).json(savedProducto.toJSON())
    }catch(error){
        next(error)
    }
})

productoRouter.put('/:id', async(req,res,next) => {
    try{
        const body = req.body
        const producto = {
            barCode: body.barCode,
            precio: body.precio,
            cantidad: body.cantidad,
            nombre: body.nombre,
            descripcion: body.descripcion,
            categoria: body.categoria
        }
        const updatedProducto = await Producto.findByIdAndUpdate(req.params.id,producto,{new: true})
        if(updatedProducto){
            return res.status(200).json(updatedProducto.toJSON())
        }
        return res.status(404).end()
    }catch(error){
        next(error)
    }
})

productoRouter.delete('/:id', async(req,res,next) => {
    try{
        await Producto.findByIdAndRemove(req.params.id)
        return res.status(204).end()
    }catch(error){
        next(error)
    }
})

module.exports=productoRouter