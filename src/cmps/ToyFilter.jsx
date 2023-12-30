import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Fragment } from 'react'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { MultiSelect } from './ToyFilters/MultiSelect';
import { SelectFilter } from './ToyFilters/SelectFilter';
import { TextfiledFilter } from './ToyFilters/TextFiledFilter';



export function ToyFilter({ handleChange, filterSortBy, labels }) {

    const inStocksValues = { label: 'inStock', values: [{ val: 'all', name: 'All' }, { val: 'notInStock', name: 'Not in Stock' }, { val: 'inStock', name: 'In Stock' }] }
    const sortByValues = { label: 'sortBy', values: [{ val: 'name', name: 'Name' }, { val: 'price', name: 'Price' }, { val: 'createAt', name: 'Add to Store' }] }


    return (
        <Fragment>
            {/* <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <TextField value={filterSortBy.name} onChange={handleChange} type="text" id="name" name="name" placeholder='Search by name' />
            </Box> */}

            <TextfiledFilter name={filterSortBy.name} handleChange={handleChange}></TextfiledFilter>

            <SelectFilter data={inStocksValues} handleChange={handleChange} currData={filterSortBy.inStock}></SelectFilter>
            <SelectFilter data={sortByValues} handleChange={handleChange} currData={filterSortBy.sortBy}></SelectFilter>

            <MultiSelect ></MultiSelect>

        </Fragment >

    )
}

