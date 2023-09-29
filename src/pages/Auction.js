import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    TextField, Button, Typography, Container, CircularProgress,
    Card, TableCell, TableRow, TableBody,
    Table, TableContainer, IconButton, TablePagination,
    Paper, Grid, TableHead, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Stack
} from '@mui/material';
import Label from '../components/label';
import { getUsers } from '../features/users/usersSlice';
import { getCrops } from '../features/crops/cropSlice';


const TABLE_HEAD = [
    { id: 'name', label: 'Crop Name', alignRight: false },
    { id: 'quantity', label: 'Quantity', alignRight: true },
    { id: 'bid_start', label: 'Current bid', alignRight: true },
    { id: 'farmer', label: 'Farmer', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'bid', label: '', alignRight: false },
];


export default function Auction() {
    const crops = useSelector(state => state.crops);
    const user = useSelector(state => state.auth);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const users = useSelector((state) => state.users);
    const [aucList, setAucList] = useState([]);

    const [open, setOpen] = useState(false);
    const [selectedCropName, setSelectedCropName] = useState('');
    const [selectedCurrentBid, setSelectedCurrentBid] = useState(0);
    const [inputAmount, setInputAmount] = useState('');
    const [placedBids, setPlacedBids] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCrops());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);



    useEffect(() => {
        const bidData = [];
        users.users.filter(user => user.type === 'Farmer').forEach(cult => {
            const thisCrop = cult.cultivation
            thisCrop.forEach(crop => {
                bidData.push({
                    fname: cult.name,
                    cdata: crop
                });
            });
        });
        setAucList(bidData);
    }, [dispatch]);

    // Helper function to get the color based on crop status
    const getColorBasedOnStatus = (crpstate) => {
        switch (crpstate) {
            case 'Pre-Stage':
                return 'warning';
            case 'Progress':
                return 'info';
            case 'Ready':
                return 'success';
            default:
                return 'info';
        }
    };

    const handleOpenDialog = (cropName, currentBid) => {
        setSelectedCropName(cropName);
        setSelectedCurrentBid(currentBid);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setInputAmount('');
    };

    const handleConfirm = () => {
        console.log(`Crop: ${selectedCropName}, Bid Value: ${inputAmount}`);
        setPlacedBids(prevBids => [...prevBids, { cropName: selectedCropName, bidValue: inputAmount }]);
        handleCloseDialog()
    };

    return (
        <Container maxWidth="lg">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Auction
                </Typography>
            </Stack>

            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Card sx={{ padding: 2, mt: 2 }}>
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {aucList.length > 0 && (aucList.map((data) => (
                                        <TableRow hover key={data.cdata._id} tabIndex={-1}>
                                            <TableCell>{data.cdata.name}</TableCell>
                                            <TableCell> {data.cdata.quantity} Kg</TableCell>
                                            <TableCell>{data.cdata.bid_price}</TableCell>
                                            <TableCell>{data.fname}</TableCell>
                                            <TableCell>
                                                <Label color={getColorBasedOnStatus(data.cdata.status)}>{data.cdata.status}</Label>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleOpenDialog(data.cdata.name, data.cdata.bid_price)}
                                                >Place a Bid</Button>
                                            </TableCell>
                                        </TableRow>
                                    )))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={aucList.length }
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                        />
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card sx={{ padding: 2, mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Placed Bids
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Crop Name</TableCell>
                                        <TableCell>Bid Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {placedBids.map((bid, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{bid.cropName}</TableCell>
                                            <TableCell>{bid.bidValue}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Place a Bid</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Crop Name: {selectedCropName}</Typography>
                    <Typography variant="body1">Current Bid: {selectedCurrentBid}</Typography>
                    <TextField
                        label="Your Bid"
                        type="number"
                        value={inputAmount}
                        onChange={(e) => {
                            const value = e.target.value;
                            setInputAmount(value);
                        }}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" disabled={inputAmount <= selectedCurrentBid}>
                        Place Bid
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
