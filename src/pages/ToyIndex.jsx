import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToyList } from '../cmps/ToyList'
import { loadToys, removeToy } from "../store/actions/toy.actions"
import { ToyFilter } from "../cmps/ToyFilter"
import { Link } from 'react-router-dom'




export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyMoudle.toys)
    const filterSortBy = useSelector(storeState => storeState.appMoudle.filterSortBy)

    useEffect(() => {
        loadToys()
            .catch((err) => {
                console.log('err:', err)
            })
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => console.log('Removed!'))
            .catch((err) => console.log('err:', err))
    }

    function handleChange({ target }) {
        let value
        let field = target.name
        let type = target.type

        switch (field) {
            case 'price':
                value = +value
                break;
            case 'inStock':
                value = target.checked
                break
            // case 'labels':
            //     value += ','
            //     value = value.split(',')

            default:
                value = target.value
                break;
        }


        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    if (!toys) return <div>Loading...</div>


    return (
        <section className="toys-index">
            <section className="toys-index-header">
                <ToyFilter handleChange={handleChange} name={filterSortBy.name} ></ToyFilter>
                <Link to={'/toy/edit'}>Add</Link>

            </section>
            <main className="toys">
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />

            </main>
        </section>
    )
}