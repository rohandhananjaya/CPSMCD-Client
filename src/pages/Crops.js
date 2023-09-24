import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    TextField, Button, Typography, Container, CircularProgress,
    Card, TableCell, TableRow, TableBody,
    Table, TableContainer, IconButton, TablePagination,
    Paper, Grid, TableHead, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem
} from '@mui/material';
import Chart from "react-apexcharts";
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
    { id: 'costOfSeed', label: 'Cost of seed(1g)', alignRight: true },
    { id: 'timeToGrow', label: 'Time to Grow (Days)', alignRight: true },
    { id: 'nextTarget', label: 'Next Target', alignRight: false },
    { id: 'month', label: 'Target Month', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CropAdd() {
    const [cropData, setCropData] = useState(initialCropData);
    const [isLoading, setIsLoading] = useState(false);
    const crops = useSelector(state => state.crops);
    const user = useSelector(state => state.auth);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [officerDialogOpen, setOfficerDialogOpen] = useState(false);
    const [farmerDialogOpen, setFarmerDialogOpen] = useState(false);
    const [farmerTarget, setFarmerTarget] = useState(0);
    const [chartData, setChartData] = useState([]);

    const [selStatic, setselStatic] = useState([]);


    const [menuData, setMenuData] = useState({
        crop_id: '',
        crop_name: '',
        year: new Date().getFullYear(),
        month: months[0],
        target: 0,
        minPrice: 0,
        maxPrice: 0,
        statistics: []
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCrops());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCropData({ ...cropData, [name]: value });
    };

    const handleAddCrop = async () => {
        setIsLoading(true);
        try {
            await dispatch(createCrop(cropData));
            setCropData(initialCropData);
            dispatch(getCrops());
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleOpenMenu = (cropId, cropName) => {
        setMenuData((prevData) => ({
            ...prevData,
            crop_id: cropId,
            crop_name: cropName
        }));

        const foundCrop = crops.crops.find(crop => crop._id === cropId);
        setselStatic(foundCrop.statistics);

        if (user.user.type === "Officer") {
            if (foundCrop) {
                const newChartData = foundCrop.statistics.map(statistic => ({
                    x: `${statistic.year}/${statistic.month}`,
                    y: statistic.quantity
                }));

                setChartData(newChartData);
            }

            setOfficerDialogOpen(true);
        } else if (user.user.type === "Farmer" && foundCrop) {
            const newChartData = foundCrop.statistics.map(statistic => ({
                x: `${statistic.year}/${statistic.month}`,
                y: statistic.quantity
            }));

            setChartData(newChartData);
            setFarmerDialogOpen(true);
        }
    };

    const onDialogClick = async () => {
        const foundCrop = crops.crops.find(crop => crop._id === menuData.crop_id);

        if (foundCrop) {
            const updatedStatistics = [...foundCrop.statistics, {
                year: menuData.year,
                month: months.indexOf(menuData.month) + 1,
                quantity: menuData.target,
                min_price: menuData.minPrice,
                max_price: menuData.maxPrice,
                cropstatus: "Progress",
            }];

            const bindData = {
                id: menuData.crop_id,
                cropData: { statistics: updatedStatistics }
            };

            try {
                await dispatch(updateCrop(bindData));
                window.location.reload();
            } catch (error) {
                console.error('Error:', error);
            }
        }

        setOfficerDialogOpen(false);
    };

    const onfarmerDialogClick = async () => {
        
    }

    // Helper function to get the color based on crop status
    const getColorBasedOnStatus = (crpstate) => {
        if (crpstate.length === 0) {
            return 'info';
        }

        const cropStatus = crpstate[crpstate.length - 1].cropstatus;

        switch (cropStatus) {
            case 'Progress':
                return 'success';
            case 'Complete':
                return 'warning';
            default:
                return 'info';
        }
    };

    // Helper function to get the status label
    const getStatusLabel = (crpstate) => {
        if (crpstate.length > 0) {
            return (crpstate[crpstate.length - 1].cropstatus);
        }

        return 'N/A';
    };



    const handleFarmerTargetChange = (e) => {
        const targetValue = parseInt(e.target.value, 10);
        const foundCrop = crops.crops.find(crop => crop._id === menuData.crop_id);
        if (foundCrop.statistics.length > 0) {
            if (targetValue <= foundCrop.statistics[foundCrop.statistics.length - 1].quantity) {
                setFarmerTarget(targetValue);
            } else if (e.target.value === '') {
                setFarmerTarget(e.target.value);
            }
        } else {
            setFarmerTarget(0);
        }
    };

    const handleNextStatsValue = () => {
        const foundCrop = crops.crops.find(crop => crop._id === menuData.crop_id);
        if (foundCrop) {
            if (foundCrop.statistics.length > 0) {
                const cropQuantity = foundCrop.statistics[foundCrop.statistics.length - 1].quantity;
                return cropQuantity;
            }
        }
        return 'N/A';// crops.crops.find(crop => crop._id === menuData.crop_id).statistics[crops.crops.find(crop => crop._id === menuData.crop_id).statistics.length - 1].quantity;
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
                </Paper>
            )}
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
                                    <TableCell>{crop.statistics.length > 0 ? `${crop.statistics[crop.statistics.length - 1].quantity} Kg` : 'N/A'}</TableCell>
                                    <TableCell>
                                        {crop.statistics.length > 0
                                            ? `${crop.statistics[crop.statistics.length - 1].year} - ${months[crop.statistics[crop.statistics.length - 1].month - 1]}`
                                            : 'N/A'}
                                    </TableCell>

                                    <TableCell>
                                        <Label color={getColorBasedOnStatus(crop.statistics)}>{getStatusLabel(crop.statistics)}</Label>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="large" color="inherit" onClick={() => handleOpenMenu(crop._id, crop.name)}>
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
            <Dialog open={officerDialogOpen} onClose={() => setOfficerDialogOpen(false)}>
                <DialogTitle>Crop Analytics</DialogTitle>
                <DialogContent>
                    <h4><i>Crop Name : {menuData.crop_name}</i></h4>
                    <Chart
                        options={{
                            chart: {
                                id: "basic-bar"
                            },
                            xaxis: {
                                categories: chartData.map(dataPoint => dataPoint.x)
                            }
                        }}
                        series={[
                            {
                                name: menuData.crop_name,
                                data: chartData.map(dataPoint => dataPoint.y)
                            }
                        ]}
                        type="bar"
                        width="500"
                    />
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
                    <Button onClick={() => setOfficerDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setOfficerDialogOpen(false);
                            onDialogClick();
                        }}
                        color="primary"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={farmerDialogOpen} onClose={() => setFarmerDialogOpen(false)}>
                <DialogTitle>Crop Analytics</DialogTitle>
                <DialogContent>
                    <h4><i>Crop Name : {menuData.crop_name}</i></h4>
                    <Chart
                        options={{
                            chart: {
                                id: "basic-bar"
                            },
                            xaxis: {
                                categories: chartData.map(dataPoint => dataPoint.x)
                            }
                        }}
                        series={[
                            {
                                name: menuData.crop_name,
                                data: chartData.map(dataPoint => dataPoint.y)
                            }
                        ]}
                        type="bar"
                        width="500"
                    />
                    <Typography variant="h5">
                        Next Estimation (in KG): {handleNextStatsValue()}
                    </Typography>
                    <Typography variant='h6'>
                        Status: <Label color={getColorBasedOnStatus(selStatic)}>{getStatusLabel(selStatic)}</Label>
                    </Typography>
                    <TextField
                        fullWidth
                        label="My Target (in KG)"
                        value={farmerTarget}
                        onChange={handleFarmerTargetChange}
                        disabled={selStatic.length === 0 || (getStatusLabel(selStatic) === 'Complete')}
                        sx={{ mb: 2, mt: 3 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFarmerDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setFarmerDialogOpen(false);
                            onfarmerDialogClick();
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
