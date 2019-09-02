import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewListIcon from '@material-ui/icons/ViewList'
import NoteAddIcon from '@material-ui/icons/NoteAdd'

const style = {
    color: 'inherit',
    textDecoration: 'none'
}

export const mainListItems = (
  <div>
    <Link style={style} to="/invoices">
        <ListItem button>
        <ListItemIcon>
            <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="Invoices" />
        </ListItem>
    </Link>
    <Link style={style} to="/new-invoice">
        <ListItem button>
        <ListItemIcon>
            <NoteAddIcon />
        </ListItemIcon>
        <ListItemText primary="New Invoice" />
        </ListItem>
    </Link>
  </div>
);