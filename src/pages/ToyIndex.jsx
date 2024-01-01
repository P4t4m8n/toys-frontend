import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToyList } from '../cmps/ToyList'
import { loadToys, removeToy } from "../store/actions/toy.actions"
import { ToyFilter } from "../cmps/ToyFilter"
import { Link, Outlet } from 'react-router-dom'
import { FILTER } from "../store/redcuers/app.reducer";

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyMoudle.toys)
    const filterSortBy = useSelector(storeState => storeState.appMoudle.filterSortBy)
    const labels = useSelector(storeState => storeState.appMoudle.labels)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const dispatch = useDispatch()

    useEffect(() => {
        loadToys(filterSortBy)
            .catch((err) => {
                console.log('err:', err)
            })
    }, [filterSortBy, user])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => console.log('Removed!'))
            .catch((err) => console.log('err:', err))
    }

   
    function handleChange({ target }) {
        let value = target.value
        let field = target.name

        const filterSort = { ...filterSortBy, [field]: value }

        dispatch({ type: FILTER, filterSort })
    }

    if (!toys) return <div>Loading...</div>

    const { isAdmin } = user || false

    return (
        <section className="toys-index">
            <section className="toys-index-header">
                <Link to={'/review'}>All reviews</Link>
                {user && user.isAdmin &&
                    <Link to={'/toy/edit'}>Add</Link>
                }
                <ToyFilter handleChange={handleChange} filterSortBy={filterSortBy} labels={labels}></ToyFilter>
            </section>
            <main className="toys">
                <ToyList  toys={toys} onRemoveToy={onRemoveToy} isAdmin={isAdmin} />
            </main>
            <Outlet />
        </section>
    )
}