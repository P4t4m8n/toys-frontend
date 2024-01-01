
import { Fragment } from "react";
import { utilService } from "../services/util.service";

export function ToyPreview({ toy }) {

    return (
        <Fragment>
            <header>Name: {toy.name}</header>
            <img src={toy.img || 'src/assets/img/' + utilService.getRandomIntInclusive(9, 19) + '.jpg'}></img>
            <p>Price: {toy.price}</p>
            <p>Labels: {toy.labels.toString()}</p>
            {toy.inStock && <p>InStock!</p>}
        </Fragment>
    )
}