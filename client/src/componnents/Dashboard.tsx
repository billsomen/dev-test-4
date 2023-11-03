import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ActiveUser } from './ActiveUser';
import { Activity } from "./Activity"
import { Activity as ActivityType, User, Accessibility, Price } from '../utils/types';
import { createUser, getActivity, getUserById } from '../services/api';
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 'auto',
        width: `100%`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



const mdTheme = createTheme();

function DashboardContent() {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '0.5px solid #000',
        borderRadius: 1,
        boxShadow: 24,
        p: 4,
    };

    const [activity, setActivity] = React.useState<ActivityType>();
    const [currentUser, setCurrentUser] = React.useState<User>();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [accessibility, setAccessibility] = React.useState<Accessibility>('Medium');
    const [price, setPrice] = React.useState<Price>('High');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');

    const handleAccessibility = (event: SelectChangeEvent) => {
        setAccessibility(event.target.value as Accessibility);
    };
    const handlePrice = (event: SelectChangeEvent) => {
        setPrice(event.target.value as Price);
    };
    const handleName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!name || !accessibility || !price) {
            setError("Please fill the form!");
        } else {
            createUser({ name, accessibility, price })
                .then((result) => {
                    localStorage.setItem('lastCreatedUser', JSON.stringify(result));
                    setCurrentUser(result);

                    getActivity(result.id)
                        .then((res) => {
                            setActivity(res)
                        })
                        .catch((e) => console.error(e));

                    setOpen(false);
                })
                .catch((e) => {
                    setError(e.response?.data?.message);
                })
        }

    };

    const getRandomActivity = (userId?: number) => {
        getActivity(userId)
            .then((res) => {
                setActivity(res)
            })
            .catch((e) => console.error(e));
    }

    const handleReloadActivity = () => {
        getRandomActivity(currentUser?.id || 0);
    }

    React.useEffect(() => {
        const lastCreatedUser = localStorage.getItem('lastCreatedUser');
        let activeUserId = 0;

        if (lastCreatedUser) {
            const user = JSON.parse(lastCreatedUser);

            (async () => {
                const result = await getUserById(user.id)
                if (result) {
                    activeUserId = result.id;
                    setCurrentUser(result);
                    getRandomActivity(activeUserId);
                }
            })()
                .catch(e => {
                    console.error(e);
                    localStorage.removeItem('lastCreatedUser');
                    getRandomActivity(activeUserId);
                });
        } else {
            getRandomActivity(activeUserId);
        }

    }, [])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >

                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <Button variant="outlined" color='inherit' onClick={handleOpen} startIcon={<PersonAddAlt1Icon />}>
                            Create User
                        </Button>
                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={8} lg={9}>
                                <Activity data={activity} handleReloadActivity={handleReloadActivity}/>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <ActiveUser data={currentUser} />
                            </Grid>

                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a user
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            width: "100%",
                            '& > :not(style)': { my: 1, padding: '0 auto' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <Typography variant="body1" component="p" color='red'>
                            {error}
                        </Typography>
                        <FormControl required sx={{ my: 1, width: '100%' }}>

                            <TextField fullWidth id="name" label="Name *" variant="outlined" value={name} onChange={e => handleName(e)} />

                        </FormControl>

                        <FormControl required sx={{ my: 1, width: '100%' }}>
                            <InputLabel id="demo-simple-select-required-label">Accessibility</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={accessibility}
                                label="Accessibility *"
                                onChange={handleAccessibility}
                            >
                                <MenuItem value='Low'>Low</MenuItem>
                                <MenuItem value='Medium'>Medium</MenuItem>
                                <MenuItem value='High'>High</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required sx={{ my: 1, width: '100%' }}>
                            <InputLabel id="demo-simple-select-required-label">Price</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={price}
                                label="Price *"
                                onChange={handlePrice}
                            >
                                <MenuItem value='Free'>Free</MenuItem>
                                <MenuItem value='Low'>Low</MenuItem>
                                <MenuItem value='High'>High</MenuItem>
                            </Select>
                        </FormControl>

                        <Button type="submit"
                            fullWidth variant="contained" onClick={onSubmit}>create</Button>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}