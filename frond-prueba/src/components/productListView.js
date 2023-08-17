import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { TextField, Modal} from '@mui/material';
import { createProduct, updateProduct, deleteProduct } from '../services/api';

function ProductList() {
    const [productos, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productId, setProductId] = useState(0);

    const [isAddingProduct, setIsAddingProduct] = useState(false); // Estado para controlar la ventana flotante
    const [newProduct, setNewProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad_en_stock: 0
    });

    const openAddProductModal = () => {
        setIsAddingProduct(true);
        
    };
    
    const closeAddProductModal = () => {
        setIsAddingProduct(false);
        setNewProduct({
            nombre: '',
            descripcion: '',
            precio: 0,
            cantidad_en_stock: 0
        });
    };

    useEffect(() => {
        getProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.error(error));
    }, [productId]);

    // Función para manejar los cambios en el término de búsqueda
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = productos.filter(product => {
        if (!product.nombre) {
            return;
        }
        return product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const addProduct = () => {
        createProduct(newProduct)
            .then(response => {
                // Agregar el nuevo producto a la lista local de productos
                setProducts([...productos, response.data]);
                // Cerrar la ventana modal
                closeAddProductModal();
                // Restablecer los valores del nuevo producto
                setNewProduct({
                    nombre: '',
                    descripcion: '',
                    precio: 0,
                    cantidad_en_stock: 0
                });
                console.log("Aqui esta el producto");
                console.log(setProducts);
            })
            .catch(error => {
                console.error(error);
            });
            window.location.reload();
    };

    const handleSaveUpdate = () => {
        updateProduct(newProduct, productId)
            .then(response => {
                setProducts([...productos, response.data]);
                closeAddProductModal();
                setNewProduct({
                    nombre: '',
                    descripcion: '',
                    precio: 0,
                    cantidad_en_stock: 0
                });
                setProductId(0);
                console.log(setProducts);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleUpdate = ({id, nombre, descripcion, precio, cantidad_en_stock}) => {
        setProductId(id);
        setNewProduct({
            nombre,
            descripcion,
            precio,
            cantidad_en_stock
        });
        setIsAddingProduct(true);
    }

    const handleDelete = ({productId}) => {
        deleteProduct(productId)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
            window.location.reload();
    }

    return (
        <Container maxWidth="md">
            <h1 align="center">Tabla de Productos</h1>
            <TextField
                label="Buscar producto"
                variant="outlined"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={handleSearchTermChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            
                        </InputAdornment>
                    ),
                }}
                style={{ marginBottom: '20px' }}
            />

            <Button variant="contained" color="primary" onClick={openAddProductModal}>
                Agregar nuevo
            </Button>
            <br/>
            <TableContainer component={Paper}>    
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Cantidad en Stock</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Eliminar</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredProducts.map(product => (
                        <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.nombre}</TableCell>
                        <TableCell>{product.descripcion}</TableCell>
                        <TableCell>{product.precio}</TableCell>
                        <TableCell>{product.cantidad_en_stock}</TableCell>
                        <TableCell>
                        <Button variant="contained" color="primary" href="#contained-buttons"
                            onClick={() => handleUpdate({...product})}
                        >
                            Editar
                            </Button>
                        </TableCell>
                        <TableCell>
                        <Button variant="contained" color="secondary" href="#contained-buttons"
                            onClick={() => handleDelete({productId: product.id})}
                            
                        >
                            Eliminar 
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={isAddingProduct} onClose={closeAddProductModal}>
                <Container maxWidth="sm" sx={{ bgcolor: 'white', borderRadius: '10px', p: 3 }}>
                    <h2>Agregar Nuevo Producto</h2>
                    {/* Agregar campos de entrada para los detalles del nuevo producto */}
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={newProduct.nombre}
                        onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                        style={{ marginBottom: '10px' }}
                    />
                    
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={newProduct.descripcion}
                        onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
                        style={{ marginBottom: '10px' }}
                    />

                    <TextField
                        label="Precio"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={newProduct.precio}
                        onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
                        style={{ marginBottom: '10px' }}
                    />

                    <TextField
                        label="Cantidad"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={newProduct.cantidad_en_stock}
                        onChange={(e) => setNewProduct({ ...newProduct, cantidad_en_stock: e.target.value })}
                        style={{ marginBottom: '10px' }}
                    />
                    {/* Resto de los campos de entrada para otros detalles del producto */}

                    
                    { productId == 0 ?
                        <Button variant="contained" color="primary" onClick={addProduct}>
                            Agregar Producto
                        </Button>
                    :
                        <Button variant="contained" color="primary" onClick={handleSaveUpdate}>
                            Guardar Producto
                        </Button>
                     }

                </Container>
            </Modal>
        </Container>
    );
}

export default ProductList;
