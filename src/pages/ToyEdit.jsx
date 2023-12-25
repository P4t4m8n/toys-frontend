import { toyService } from "../services/toy.service"
import { useState,useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { loadToy, saveToy } from "../store/actions/toy.actions"

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (params.toyId) {
            loadToy(params.toyId)
                .then(toy => setToyToEdit(toy))
                .catch(err => {
                    console.log('err:', err)
                    navigate('/toy')
                })
        }
    }, [])

    function handleChange({ target }) {
        let value = target.value
        setToyToEdit((prevToy) => ({ ...prevToy, name: value }))
    }


    function onSaveToy(ev) {
        ev.preventDefault()

        saveToy(toyToEdit)
            .then(() => {
                navigate('/toy')
            })
            .catch((err) => {
                console.log('err:', err)
            })

    }

    function onBack() {
        navigate('/toy' )
    }


    return (
        <section className="edit-toy">

            <form >
                <label htmlFor="name">Name: </label>
                <input value={toyToEdit.name} onChange={handleChange} id="name" type="text" name="name"></input>
            </form>
            <div className="edit-toy-btns">
                <button onClick={onSaveToy}>Save</button>
                <button onClick={onBack}>Back</button>
            </div>
        </section>
    )


}