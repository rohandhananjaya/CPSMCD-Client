import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Container, Grid, Paper, CircularProgress } from '@mui/material';

import { createCrop } from '../features/crops/cropSlice';

const initialCropData = {
    name: '',
    costOfSeed: '',
    timeToGrow: '',
    year: '',
    month: '',
    quantity: '',
};

export default function CropAdd() {
    const [cropData, setCropData] = useState(initialCropData);
    const [isLoading, setIsLoading] = useState(false); 
    const dispatch = useDispatch();  

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCropData({ ...cropData, [name]: value });
    };

    const handleAddCrop = async() => {
        setIsLoading(true);  // <-- Start loading

        await dispatch(createCrop(cropData))
        .then(() => {
            // Reset the form fields
            setCropData(initialCropData);
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            setIsLoading(false); 
        });
    };
  
    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Add Crop Data
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
                        <CircularProgress />  // <-- Show progress circle when loading
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleAddCrop}>
                            Add Crop
                        </Button>
                    )}
                </form>
            </Paper>
        </Container>
    );
}
