import {
    Box,
    Divider,
    ListItem,
    ListItemText,
    List,
    Typography,
    ListItemAvatar,
    Paper,
    Grid,
    Alert,
    IconButton
} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import BorderVerticalIcon from '@mui/icons-material/BorderVertical';
import Groups2Icon from '@mui/icons-material/Groups2';
import LinkIcon from '@mui/icons-material/Link';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Activity as ActivityType } from "../utils/types";

type ActivityProps = {
    data: ActivityType | undefined;
    handleReloadActivity?: () => void
}

export const Activity = ({ data, handleReloadActivity }: ActivityProps) => {

    return (
        <><Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 80,
            }}
        >

            <List
                sx={{
                    width: "100%",
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
                        Activity
                    </Typography>
                    <IconButton onClick={handleReloadActivity} 
                                color="primary" sx={{ml: 1}} 
                                aria-label="Load new activity">
                        <RefreshIcon/>
                    </IconButton>
                </Box>
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <ListItem>
                            <ListItemAvatar>
                                <AssignmentIcon />
                            </ListItemAvatar>
                            <ListItemText primary="Activity" secondary={data?.activity} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <EqualizerIcon />
                            </ListItemAvatar>
                            <ListItemText primary="Accessibility" secondary={data?.accessibility} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <VpnKeyIcon />
                            </ListItemAvatar>
                            <ListItemText primary="Key" secondary={data?.key} />
                        </ListItem>
                        <Divider variant="inset" component="li" sx={{ display: { xs: 'block', sm: 'none' } }} />

                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>

                        <ListItem>
                            <ListItemAvatar>
                                <BorderVerticalIcon />
                            </ListItemAvatar>
                            <ListItemText primary="Type" secondary={data?.type} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <AttachMoneyIcon />
                            </ListItemAvatar>
                            <ListItemText primary="Price" secondary={data?.price} />
                        </ListItem>
                        <Divider variant="inset" component="li" sx={{ display: { xs: 'block', sm: 'none' } }} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <ListItem>
                            <ListItemAvatar>
                                <Groups2Icon />
                            </ListItemAvatar>
                            <ListItemText primary="Participants" secondary={data?.participants} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <LinkIcon />
                            </ListItemAvatar>
                            <ListItemText sx={{ overflowWrap: 'break-word' }}
                                primary="Link" secondary={data?.link || '- -'} />
                        </ListItem>
                    </Grid>
                </Grid>
                {data?.error && (
                    <Alert variant="filled" severity="error">
                        {data?.error}
                    </Alert>
                )}
            </List>

        </Paper>
        </>
    );
}
