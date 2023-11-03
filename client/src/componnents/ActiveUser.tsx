import {
    Box,
    Divider,
    ListItem,
    ListItemText,
    List,
    Typography,
    ListItemAvatar,
    Paper,
    Alert
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { User } from '../utils/types';

type ActiveUserProps = {
    data: User | undefined;
}

export const ActiveUser = ({ data }: ActiveUserProps) => {

    return (
        <>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 80,
                }}
            >

                {data ? (<List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",

                            padding: "0px 16px",
                        }}
                    >
                        <Typography variant="h6" fontWeight={`bold`}>

                            Active user
                        </Typography>
                    </Box>
                    <ListItem>
                        <ListItemAvatar>
                            <PermIdentityIcon />
                        </ListItemAvatar>
                        <ListItemText primary="Name" secondary={data?.name} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <AccessTimeIcon />
                        </ListItemAvatar>
                        <ListItemText primary="Accessibility" secondary={data?.accessibility} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <AttachMoneyIcon />
                        </ListItemAvatar>
                        <ListItemText primary="Price" secondary={data?.price} />
                    </ListItem>

                </List>)
                    :
                    (<Alert variant="outlined" severity="warning">
                        No active user!
                    </Alert>)}
            </Paper>
        </>
    );
}
