const baseUrl = '/api/categorias'

const getCategorias = async () => {
    const categorias = await fetch(baseUrl).then(res => res.json())
    return categorias
}

const categoriaService = {
    getCategorias
}

export default categoriaService