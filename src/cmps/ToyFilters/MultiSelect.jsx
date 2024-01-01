import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER } from '../../store/redcuers/app.reducer'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}


export function MultiSelect() {
    const filterSortBy = useSelector(storeState => storeState.appMoudle.filterSortBy)
    const labels = useSelector(storeState => storeState.appMoudle.labels)

    const dispatch = useDispatch()

    const handleChange = ({ target }) => {
        const { value } = target

        const filterSort = { ...filterSortBy, byLabel: value }

        dispatch({ type: FILTER, filterSort })

    }


    return (
        <div>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-checkbox-label">By label</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={filterSortBy.byLabel}
                    onChange={handleChange}
           
                    input={<OutlinedInput label="By label" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {labels.map((label) => (
                        <MenuItem key={label} value={label}>
                            <Checkbox checked={filterSortBy.byLabel.indexOf(label) > -1} />
                            <ListItemText primary={label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}



