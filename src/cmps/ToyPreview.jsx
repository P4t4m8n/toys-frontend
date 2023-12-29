
import { Fragment } from "react";

export function ToyPreview({ toy }) {

    return (
        <Fragment>
            <header>Name: {toy.name}</header>
            <p>Price: {toy.price}</p>
            <img src={toy.img || "src/assets/img/10.jpg"}></img>
            <p>Labels: {toy.labels.toString()}</p>
            {toy.inStock && <p>InStock!</p>}
        </Fragment>
    )
}