import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journal.slice';

export default function SideBarItem({ id, body, title, date, imageUrls = [] }) {
  const dispatch = useDispatch();

  const onActiveNote = () => dispatch(setActiveNote({ id, body, title, date, imageUrls }));

  return (
    <ListItem disablePadding onClick={onActiveNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container flexDirection='column'>
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
