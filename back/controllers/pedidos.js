const pedidoRouter = require('express').Router()
const Pedido = require('../models/pedido')

pedidoRouter.get('/', async(req,res,next) => {
    try{
        const pedidos = await Pedido.find({})
        return res.json(pedidos.map(pedido => pedido.toJSON()))
    }catch(error){
        next(error)
    }
})

pedidoRouter.get('/:id', async(req,res,next) => {
    try{
        const pedido = await Pedido.findById(req.params.id)
        if(pedido){
            return res.json(pedido.toJSON())
        }
        return res.status(404).end()
    }catch(error){
        next(error)
    }
})

pedidoRouter.post('/', async(req,res,next) => {
    const body = req.body
    const pedido = new Pedido({
        productos: body.productos,
    })

    if(pedido.productos === undefined){
        return res.status(400).json({error:"Falta Información"})
    }
    
    try{
        const savedPedido = await pedido.save()
        return res.status(201).json(savedPedido.toJSON())
    }catch(error){
        next(error)
    }
})

pedidoRouter.put('/:id', async(req,res,next) => {
    try{
        const body = req.body
        const pedido = {
            productos: body.productos
        }
        const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id,pedido,{new: true})
        if(updatedPedido){
            return res.status(200).json(updatedPedido.toJSON())
        }
        return res.status(404).end()
    }catch(error){
        next(error)
    }
})

pedidoRouter.delete('/:id', async(req,res,next) => {
    try{
        await Pedido.findByIdAndRemove(req.params.id)
        return res.status(204).end()
    }catch(error){
        next(error)
    }
})

module.exports=pedidoRouter