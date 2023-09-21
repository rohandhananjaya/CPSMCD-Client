import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    TextField, Button, Typography, Container, CircularProgress,
    Card, Checkbox, Avatar, TableCell, TableRow, TableBody,
    Table, TableContainer, IconButton, TablePagination,
    Paper, Grid, TableHead, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem
} from '@mui/material';
import { sentenceCase } from 'change-case';
import Label from '../components/label';
import Iconify from '../components/iconify';
import { createCrop, getCrops, updateCrop } from '../features/crops/cropSlice';



const initialCropData = {
    name: '',
    costOfSeed: '',
    timeToGrow: '',
    year: '',
    month: '',
    quantity: '',
};

const TABLE_HEAD = [
    { id: 'name', label: 'Crop Name', alignRight: false },
    { id: 'costOfSeed', label: 'Cost (1g)', alignRight: false },
    { id: 'timeToGrow', label: 'Time to Grow (Days)', alignRight: false },
    { id: 'nextTarget', label: 'Next Target', alignRight: false },
    { id: 'month', label: 'Target Month', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
];


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



export default function CropAdd() {
    const [cropData, setCropData] = useState(initialCropData);
    const [isLoading, setIsLoading] = useState(false);
    const crops = useSelector(state => state.crops);
    const user = useSelector((state) => state.auth);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [status, setStatus] = useState('success');
    const [open, setOpen] = useState(false);

    const [menuData, setMenuData] = useState({
        crop_id: '',
        year: new Date().getFullYear(),
        month: '',
        target: '',
        minPrice: '',
        maxPrice: ''
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCrops());
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCropData({ ...cropData, [name]: value });
    };

    const handleAddCrop = async () => {
        setIsLoading(true);
        await dispatch(createCrop(cropData))
            .then(() => setCropData(initialCropData))
            .catch(error => console.error('Error:', error))
            .finally(() => {
                setIsLoading(false);
                dispatch(getCrops());
            });
    };

    const handleSelect = (name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleOpenMenu = (cropId) => {
        // use cropId here

        setMenuData((prevData) => ({
            ...prevData,
            crop_id: cropId
        }));
        setOpen(true);
    };

    const onDialogClick = () => {
        const cropData = {
            name: "Test food 0040",
            costOfSeed: 10,
            timeToGrow: 190
        };
        dispatch(updateCrop(cropData))
        dispatch(getCrops());
    }


    return (
        <Container maxWidth="lg">
            {user.user.type === "Officer" && (
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Add New Crop to list
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Crop Name"
                                    name="name"
                                    value={cropData.name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Cost of Seed"
                                    name="costOfSeed"
                                    value={cropData.costOfSeed}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Time to Grow"
                                    name="timeToGrow"
                                    value={cropData.timeToGrow}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleAddCrop} sx={{ mt: 2 }}>
                                Add Crop
                            </Button>
                        )}
                    </form>
                </Paper>)}
            <Card sx={{ padding: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                    List of Crops
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {TABLE_HEAD.map((header) => (
                                    <TableCell key={header.id}>{header.label}</TableCell>
                                ))}
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(crops.crops) && crops.crops.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((crop) => (
                                <TableRow hover key={crop._id} tabIndex={-1}>
                                    <TableCell>{crop.name}</TableCell>
                                    <TableCell>{crop.costOfSeed}</TableCell>
                                    <TableCell>{crop.timeToGrow}</TableCell>
                                    <TableCell>4000Kg</TableCell>
                                    <TableCell>2023 - December</TableCell>
                                    <TableCell>
                                        <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="large" color="inherit" onClick={() => handleOpenMenu(crop._id)}>
                                            <Iconify icon={'eva:more-vertical-fill'} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={crops.crops.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                />
            </Card>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Set Crop Analytic</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Year"
                        select
                        value={menuData.year}
                        onChange={e => setMenuData({ ...menuData, year: e.target.value })}
                        sx={{ mb: 2, mt: 2 }}
                    >

                        {[...Array(10)].map((_, i) => (
                            <MenuItem key={i} value={new Date().getFullYear() + i}>
                                {new Date().getFullYear() + i}
                            </MenuItem>
                        ))}

                    </TextField>
                    <TextField
                        fullWidth
                        label="Month"
                        select
                        value={menuData.month}
                        onChange={e => setMenuData({ ...menuData, month: e.target.value })}
                        sx={{ mb: 2 }}
                    >
                        {months.map(month => (
                            <MenuItem key={month} value={month}>
                                {month}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        label="Target (in KG)"
                        value={menuData.target}
                        onChange={e => setMenuData({ ...menuData, target: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Min Price"
                        value={menuData.minPrice}
                        onChange={e => setMenuData({ ...menuData, minPrice: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Max Price"
                        value={menuData.maxPrice}
                        onChange={e => setMenuData({ ...menuData, maxPrice: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            onDialogClick();
                        }}
                        color="primary"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}


