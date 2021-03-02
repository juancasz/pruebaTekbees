import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Navbar = () => {
    return(
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        COMERCIO
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Navbar