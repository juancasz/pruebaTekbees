import React,{ useState,useEffect,forwardRef } from 'react'
import Card from './Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Autocomplete from '@material-ui/lab/Autocomplete'
import MaterialTable from "material-table"
import AddBoxIcon from '@material-ui/icons/AddBox'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn'

const ListaProductos = ({productos,categorias}) => {
    //FILTROS
    const[categoria,setCategoria] = useState(null)
    const[producto,setProducto] = useState("")

    //INFO TABLA
    const[productosTabla,setProductosTabla] = useState(productos)

    useEffect(() => {
        let productosTabla = productos
        if(categoria){
            productosTabla = productosTabla.filter(producto => producto.categoria === categoria.id)
        }
        if(producto){
            productosTabla = productosTabla.filter(prod => prod.nombre.toLowerCase().includes(producto.toLowerCase()))
        }
        setProductosTabla(productosTabla)
    },[producto,categoria,productos])

    const columns = [
        { title: "Nombre", field: "nombre"},
        { title: "descripcion", field: "descripcion"},
        { title: "Precio", field: "precio",render: (rowData) => '$'+rowData.precio},
        { title: "Código de barras", field: "barCode"},
        { title: "Cantidad Disponible", field: "cantidad"},
        { title: "Agregar al carrito", field: "", render: (rowData) =>{
            return(
                <Grid container spacing={1}>
                    <Grid item md={3}></Grid>
                    <Grid item md={3}>
                        <TextField 
                            defaultValue={0}
                            //value={}
                            //onChange={(event)=> setFormData({...formData,orderNumber:Number(event.target.value)})}
                            type="number" 
                            id={rowData.id} 
                            label="Cantidad" 
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                inputProps: { 
                                    max: 10, min: 0 
                                }
                            }}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <IconButton size='medium'>
                            <AddBoxIcon fontSize='large' style={{ color: 'red' }}/>
                        </IconButton>
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
            )
        }}
    ]

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    return(
        <React.Fragment>
            <Card>
                <Grid container spacing={1}>
                    <Grid item md={2}></Grid>
                    <Grid item md={4}>
                        <Autocomplete
                            value={categoria}
                            options={categorias}
                            onChange = {(event,value) => setCategoria(value)}
                            getOptionLabel={option => option?option.nombre:""}
                            id="categoria"
                            renderInput={(params) => <TextField {...params} required label="Filtrar por Categoría" fullWidth/>}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField 
                            value={producto}
                            key={1}
                            onChange={(event)=> setProducto(event.target.value)}
                            id="producto" 
                            label="Buscar Producto" 
                            fullWidth
                        />
                    </Grid> 
                    <Grid item md={2}></Grid>
                </Grid>
                <MaterialTable
                    columns={columns}
                    data={productosTabla}
                    icons={tableIcons}
                    components={{
                        Container: props => <Paper {...props} elevation={0}/>,
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        toolbar: false,
                        pageSize: 10
                    }} 
                    localization={{
                        body:{
                            emptyDataSourceMessage: 'No hay productos disponibles'
                        },
                        pagination:{
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'productos'
                        }
                    }}
                />
            </Card>
        </React.Fragment>
    )
}

export default ListaProductos