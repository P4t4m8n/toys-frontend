
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { loadToy } from "../store/actions/toy.actions"
import { toyService } from "../services/toy.service"
import { useSelector } from "react-redux"

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const [msgs, setMsgs] = useState(null)
    const [isEditMsg, test] = useState(false)
    const [msgToEdit, setMsgToEdit] = useState({ txt: 'Add you massage' })
    const user = useSelector(storeState => storeState.userMoudle.userObj)
    // const isEditMsg = useRef(false)
    const hadMsg = useRef(false)

    const refresherHolder = useRef(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy(params.toyId)
            .then(toy => {
                setToy(toy)
                loadMsgs(toy)
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/toy')
            })
    }, [isEditMsg, hadMsg.current])

    function loadMsgs(toy) {
        if (user) {
            var msg = toy.msgs.find(msg => msg.by === user._id)
            if (msg) hadMsg.current = true
        }
        setMsgToEdit(() => msg || { txt: 'Add you massage' })
        setMsgs(toy.msgs)

    }

    if (!toy) return <div>Loading...</div>

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setMsgToEdit(prevMsg => ({ ...prevMsg, [field]: value }))
    }



    function onRemoveMsg(msgId) {
        toyService.removeMsg(toy._id, msgId)
            .then(() => {
                test(!isEditMsg)
                hadMsg.current = false


            }
            )

    }

    function onSaveMsg(ev) {
        ev.preventDefault()
        toyService.addMsg(toy._id, msgToEdit)
            .then(() => {
                test(!isEditMsg)
            }
            )
            .catch(err => {
                console.log('err:', err)
            })
    }





    function onBack() {
        navigate('/toy')
    }

    return (
        <section className="toy-details">
            <div className="toy-txt">
                <header>Name: {toy.name}</header>
                <p>Price: {toy.price}</p>
                <p>Labels: {toy.labels.toString()}</p>
                <p>InStock: {toy.inStock}</p>
            </div>
            <img src={toy.img || "src/assets/img/10.jpg"}></img>
            <ul className="msgs">
                {msgs.map(msg =>
                    <li key={msg.id}>
                        {(user && (user.isAdmin || user._id === msg.by)) ?
                            <div className="msg-admin-btns">
                                <button onClick={() => onRemoveMsg(msg.id)}>Remove Massage</button>
                                <form onSubmit={onSaveMsg}>
                                    <input value={msgToEdit.txt} onChange={handleChange} name="txt" type="text"></input>
                                    <button>Save</button>
                                </form>
                            </div>
                            :
                            <p>{msg.txt}</p>
                        }
                        <p>By: {msg.by}</p>
                        <p>At: {msg.createdAt}</p>
                    </li>
                )
                }
                {
                    !hadMsg.current && user &&
                    <li>
                        <form onSubmit={onSaveMsg}>
                            <input value={msgToEdit.txt} onChange={handleChange} name="txt" type="text"></input>
                            <button>Save</button>
                        </form>

                    </li>
                }
            </ul >
            <button onClick={onBack}>Back</button>
        </section >
    )
}



