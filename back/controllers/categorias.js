const categoriaRouter = require('express').Router()
const Categoria = require('../models/categoria')

categoriaRouter.get('/', async(req,res,next) => {
    try{
        const categorias = await Categoria.find({})
        return res.json(categorias.map(categoria => categoria.toJSON()))
    }catch(error){
        next(error)
    }
})

categoriaRouter.get('/:id', async(req,res,next) => {
    try{
        const categoria = await Categoria.findById(req.params.id)
        if(categoria){
            return res.json(categoria.toJSON())
        }
        return res.status(404).end()
    }catch(error){
        next(error)
    }
})

categoriaRouter.post('/', async(req,res,next) => {
    const body = req.body
    const categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion
    })

    if(categoria.nombre === undefined || categoria.descripcion === undefined){
        return res.status(400).json({error:"Falta Información"})
    }
    
    try{
        const savedCategoria = await categoria.save()
        return res.status(201).json(savedCategoria.toJSON())
    }catch(error){
        next(error)
    }
})

categoriaRouter.put('/:id', async(req,res,next) => {
    try{
        const body = req.body
        const categoria = {
            nombre: body.nombre,
            descripcion: body.descripcion
        }
        const updatedCategoria = await Categoria.findByIdAndUpdate(req.params.id,categoria,{new: true})
        if(updatedCategoria){
            return res.status(200).json(updatedCategoria.toJSON())
        }
        return res.status(404).end()
    }catch(error){
        next(error)
    }
})

categoriaRouter.delete('/:id', async(req,res,next) => {
    try{
        await Categoria.findByIdAndRemove(req.params.id)
        return res.status(204).end()
    }catch(error){
        next(error)
    }
})

module.exports=categoriaRouter