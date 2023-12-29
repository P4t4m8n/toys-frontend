
import { ToyPreview } from "./ToyPreview"
import { Link, } from "react-router-dom"

export function ToyList({ toys, onRemoveToy, isAdmin }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>

                <li className="toy" key={toy._id}>
                    <ToyPreview toy={toy}></ToyPreview>
                    <section className="toy-list-btns">
                        <button><Link to={`/toy/${toy._id}`} >Details</Link></button>
                        {isAdmin &&
                            <div className="admin-btns">
                                <button onClick={() => onRemoveToy(toy._id)}>X</button>
                                <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                            </div>
                        }
                    </section>
                </li>
            )}
        </ul>

    )
}