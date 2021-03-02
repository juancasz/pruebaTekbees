const baseUrl = '/api/productos'

const getProductos = async () => {
    const productos = await fetch(baseUrl).then(res => res.json())
    return productos
}

const getProducto = async(id) => {
    const producto = await fetch(`${baseUrl}/${id}`).then(res => res.json())
    return producto
}

const updateProducto = async(id,updatedProduct) => {
    const producto = await fetch(`${baseUrl}/${id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
    }).then(res => res.json())
    return producto
}

const productoService = {
    getProductos,
    getProducto,
    updateProducto
}

export default productoService