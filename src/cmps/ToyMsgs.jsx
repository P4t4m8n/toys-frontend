

export function ToyMsgs({ toy }) {

    const params = useParams()
    const [msgs, setMsgs] = useState(toy.msgs)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const isEdit = useRef(false)
    useEffect(() => {
        setMsgs(msgs)
    },[isEdit])

    onRemoveMsg(msgId){
        
    }


    return (
        <ul className="msgs">
            {msgs.map(msg =>
                <li key={msg.id}>
                    <div className="msg-admin-btns">
                        <button onClick={() => onRemoveMsg(msg.id)}>Remove Massage</button>
                        {!isEdit && <button onClick={() => { isEdit.current = true }}>Edit</button>}
                    </div>
                    {(isEdit && (user.isAdmin || user._id === by)) ?
                        <input value={msg.txt} onChange={handleChange} name="txt" type="text"></input> :
                        <p>{msg.txt}</p>
                    }
                    <p>By: {msg.by}</p>
                    <p>At: {msg.createdAt}</p>
                </li>
            )
            }
        </ul >

    )
}

