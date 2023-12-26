import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToyList } from '../cmps/ToyList'
import { loadToys, removeToy } from "../store/actions/toy.actions"
import { ToyFilter } from "../cmps/ToyFilter"
import { Link } from 'react-router-dom'
import { FILTER } from "../store/redcuers/app.reducer";




export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyMoudle.toys)
    const filterSortBy = useSelector(storeState => storeState.appMoudle.filterSortBy)
    const labels = useSelector(storeState => storeState.appMoudle.labels)

    const dispatch = useDispatch()

    useEffect(() => {
        loadToys(filterSortBy)
            .catch((err) => {
                console.log('err:', err)
            })
    }, [filterSortBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => console.log('Removed!'))
            .catch((err) => console.log('err:', err))
    }

    function handleChange({ target }) {
        let value = target.value
        let field = target.name
        console.log("value:", value)
        console.log("field:", field)

        switch (field) {
            case 'dir':
                value = target.checked
            case 'byLabel':
                value = Array.from(target.selelctOptions, (option) => option.value)
            default:
                break;
        }
        const filterSort = { ...filterSortBy, [field]: value }

        dispatch({ type: FILTER, filterSort })
    }

    if (!toys) return <div>Loading...</div>


    return (
        <section className="toys-index">
            <section className="toys-index-header">
                <ToyFilter handleChange={handleChange} filterSortBy={filterSortBy} labels={labels}></ToyFilter>
                <Link to={'/toy/edit'}>Add</Link>

            </section>
            <main className="toys">
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />

            </main>
        </section>
    )
}