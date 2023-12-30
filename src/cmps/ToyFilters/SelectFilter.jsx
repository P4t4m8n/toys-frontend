import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export function SelectFilter({ data, handleChange, currData }) {

    return (

        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">{data.label}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={currData}
                name={data.label}
                label={data.label}
                onChange={handleChange}
            >

            

                {
                    data.values.map(value => {
                        return <MenuItem key={value.val} value={value.val}>{value.name}</MenuItem>
                    })
                }

            </Select>
        </FormControl>

        
    )
}