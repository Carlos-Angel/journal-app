import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export default function SideBarItem({ id, body, title }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText
            primary={title}
            primaryTypographyProps={{
              textOverflow: 'ellipsis',
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
}
