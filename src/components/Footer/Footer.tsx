import { Box, Typography } from '@material-ui/core'
import React from 'react'

function Footer() {
    return (
        <div style={{backgroundColor: '#00334e', color: 'white', bottom: 0, width: '100%', padding: '10px', marginTop: '20px'}}>
           <Box display='flex' justifyContent='center' alignItems='center'>
                <Typography>All rights reserved © 2021</Typography>
            </Box>
        </div>
    )
}

export default Footer
