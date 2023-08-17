import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

import { AppBar, Toolbar, Typography } from '@mui/material';

function MenuBar() {
    
    return (
        <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Mi Aplicación
                    </Typography>
                </Toolbar>
        </AppBar>
    );
}

export default MenuBar;