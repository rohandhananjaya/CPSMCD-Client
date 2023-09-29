import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Container, Stack, Typography, TextField, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import PRODUCTS from '../_mock/products';

export default function MyProductsPage() {
    // Existing states
    const [openFilter, setOpenFilter] = useState(false);
    const [products, setProducts] = useState(PRODUCTS);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productDescription, setProductDescription] = useState('');

    // State to manage dialog visibility
    const [openDialog, setOpenDialog] = useState(false);

    // Existing handlers
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleAddProduct = (event) => {
        event.preventDefault();
        if (productName && productPrice && productQty) {
            setProducts([...products, {
                id: products.length + 1,
                name: productName,
                price: productPrice,
                qty: productQty,
                description: productDescription
            }]);
            // Clear the inputs after adding
            setProductName('');
            setProductPrice('');
            setProductQty('');
            setProductDescription('');
        }
    };

    // Handlers for the dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Helmet>
                <title>My Products | CPSMCD</title>
            </Helmet>

            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    My Products
                </Typography>

                {/* Button to open the dialog */}
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    Add New Product
                </Button>

                {/* Dialog for New Product Form */}
                <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleAddProduct} >
                            <Stack spacing={3}>

                                {/* Product Name */}
                                <TextField
                                    fullWidth
                                    label="Product Name"
                                    variant="outlined"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required
                                    sx={{ background: '#ffffff', borderRadius: '5px' }}
                                />

                                {/* Product Price */}
                                <TextField
                                    fullWidth
                                    label="Product Price"
                                    variant="outlined"
                                    type="number"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    required
                                    sx={{ background: '#ffffff', borderRadius: '5px' }}
                                />

                                {/* Product Quantity */}
                                <TextField
                                    fullWidth
                                    label="Product Quantity"
                                    variant="outlined"
                                    type="number"
                                    value={productQty}
                                    onChange={(e) => setProductQty(e.target.value)}
                                    required
                                    sx={{ background: '#ffffff', borderRadius: '5px' }}
                                />

                                {/* Product Description */}
                                <TextField
                                    fullWidth
                                    label="Product Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    sx={{ background: '#ffffff', borderRadius: '5px' }}
                                />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ mt: 2, py: 1.5, px: 3 }}
                                >
                                    Add Product
                                </Button>

                            </Stack>
                        </form>

                    </DialogContent>
                </Dialog>

                <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <ProductFilterSidebar
                            openFilter={openFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                        />
                        <ProductSort />
                    </Stack>
                </Stack>

                <ProductList products={products} />
                <ProductCartWidget />
            </Container>
        </>
    );
}
