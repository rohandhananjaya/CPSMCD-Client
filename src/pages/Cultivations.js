import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  Stack,
  Paper,
  Avatar,
  Button,
  Checkbox,
  Table,
  TableRow,
  TableHead,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { getUsers } from '../features/users/usersSlice';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { getCrops } from '../features/crops/cropSlice';

const TABLE_HEAD = [
  { id: 'name', label: 'Crop Name', alignRight: false },
  { id: 'quantity', label: 'Quantity (Kg)', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'cost', label: 'Cost', alignRight: false },
  { id: 'target_date', label: 'Target Date', alignRight: false },
  { id: 'bid_price', label: 'Bid Price', alignRight: false },
];

export default function CultivationsPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.auth.user);
  const [crops, setCrops] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCrops());
  }, [dispatch]);


  useEffect(() => {
    console.log('Cult Updating');
    console.log(users.users);
    console.log('----------');
    if (users.users.length > 0) {
      const userCultivation = users.users.filter(thisUser => thisUser._id === user._id)[0].cultivation;
      setCrops(userCultivation);
    }
  }, [users, crops]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <Helmet>
        <title> Cultivations | CPSMCD </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Cultivations
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((header) => (
                      <TableCell key={header.id} align={header.alignRight ? 'right' : 'left'}>
                        {header.label}
                      </TableCell>
                    ))}
                    <TableCell align="right">Actions</TableCell> {/* This is for the action buttons */}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {crops.map((crop) => (
                    <TableRow hover key={crop._id} tabIndex={-1}>
                      <TableCell>{crop.name}</TableCell>
                      <TableCell>{crop.quantity}</TableCell>
                      <TableCell>
                        <Label>{crop.status}</Label>
                      </TableCell>
                      <TableCell>{crop.cost}</TableCell>
                      <TableCell>{crop.target_date || 'N/A'}</TableCell>
                      <TableCell>{crop.bid_price}</TableCell>
                      <TableCell align="right">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={crops.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
          />
        </Card>
      </Container>
    </>
  );
}
