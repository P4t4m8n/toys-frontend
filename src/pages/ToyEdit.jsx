import { toyService } from "../services/toy.service"
import { useState, useEffect } from "react"
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
            case 'labels':
                value += ','
                value = value.split(',')

            default:
                value = target.value
                break;
        }
       

        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
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
        navigate('/toy')
    }


    return (
        <section className="edit-toy">

            <form >
                <label htmlFor="name">Name: </label>
                <input value={toyToEdit.name} onChange={handleChange}
                    id="name" type="text" name="name"></input>

                <label htmlFor="price">Price: </label>
                <input value={toyToEdit.price} onChange={handleChange}
                    id="price" type="number" name="price"></input>

                <label htmlFor="inStock">Instock: </label>
                <input checked={toyToEdit.inStock} onChange={handleChange}
                    id="inStock" type="checkbox" name="inStock"></input>

                <label htmlFor="labels">Labels: </label>
                <input value={toyToEdit.labels} onChange={handleChange}
                    id="labels" type="text" name="labels"></input>


            </form>
            <div className="edit-toy-btns">
                <button onClick={onSaveToy}>Save</button>
                <button onClick={onBack}>Back</button>
            </div>
        </section>
    )


}