import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';



export function TextfiledFilter({ name, handleChange }) {


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField value={name} onChange={handleChange} type="text" id="name" name="name" label='Search by name'  />
        </Box>
    )
}