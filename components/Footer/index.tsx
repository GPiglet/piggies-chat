import Box from '@mui/material/Box';
import Copyright from "./Copyright";

const Footer = (props: any) => {
    return (
        
        <Box
            sx = {{
                background: 'rgba(0,0,0,5%)'
            }}
        >
            <Copyright/>
        </Box>
    );
}

export default Footer;
