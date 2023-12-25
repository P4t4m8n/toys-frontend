
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { loadToy } from "../store/actions/toy.actions"


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy(params.toyId)
            .then(toy => {
                setToy(toy)
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/toy')
            })
    }, [])

    if (!toy) return <div>Loading...</div>

    function onBack() {
        navigate('/toy')
    }


    return (
        <section className="toy-details">
            <header>Name: {toy.name}</header>
            <p>Price: {toy.price}</p>
            <p>Labels: {toy.labels.toString()}</p>
            <p>InStock: {toy.inStock}</p>

            <button onClick={onBack}>Back</button>
        </section>
    )
}