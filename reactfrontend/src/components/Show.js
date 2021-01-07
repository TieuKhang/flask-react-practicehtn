import React, {useState,useEffect} from 'react';
import {Delete} from './Delete'
import {Edit} from './Edit'
import {
    useParams,useHistory,
    Link
  } from "react-router-dom";

export const Show = () => {
    const {id} = useParams()
    const [toDo,setTodo] = useState([])
    const [edit,setEdit] = useState('')
    const [clickEdit,setClickEdit] = useState(false)
    
    useEffect(() => {
        fetch(`/api/${id}`)
        .then(response => response.json())
        .then(data => setTodo(data))
    },[id])

    const handleEditChange = (inputVal) => {
        setEdit(inputVal)
        console.log(edit)
    }

    const handleEditSubmit = () => {
        fetch(`/api/create/${id}`, {
            method:'POST',
            body: JSON.stringify({
                id: id,
                content: edit
            })
        }).then(response => response.json)
          .then(msg => {
              console.log(msg)
              setEdit('')
              upDateEdit()
        })
    }

    const upDateEdit = () => {
        fetch(`/api/${id}`)
        .then(response => response.json())
        .then(data => {
            setClickEdit(false)
            setTodo(data)
        })
    }
    
    const onClickEdit = () => {
        setClickEdit(true)
    }

    const onCancelClickEdit = () => {
        setClickEdit(false)
    }

    return(
        <div>
            {toDo.length > 0 && toDo.map(data => <div> {data.content} </div>)}
            {   clickEdit === false &&
                <>
                    <Delete id={id}/>
                    <span>   </span>
                    <span>   </span>
                    <button onClick = {onClickEdit}> Edit </button>
                </>
            }
            {   clickEdit === true &&
                <>
                    <Edit userInput={edit} onFormChange = {handleEditChange} onFormSubmit = {handleEditSubmit}/>
                    <button onClick={onCancelClickEdit}>Cancel</button>
                </>
            }
            <hr></hr>
            <Link to='/'> Back to Todo </Link>
        </div>
    )
}