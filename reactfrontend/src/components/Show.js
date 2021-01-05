import React, {useState,useEffect} from 'react';
import {Delete} from './Delete'
import {
    useParams,
    Link
  } from "react-router-dom";

export const Show = () => {
    const {id} = useParams()
    const [toDo,setToDo] = useState([])
    useEffect(() => {
        fetch(`/api/${id}`)
        .then(response => response.json())
        .then(data => setToDo(data))
    },[id])

    return(
        <div>
            {toDo.length > 0 && toDo.map(data => <div> {data.content} </div>)}
            <Delete id={id}/>
            <hr></hr>
            <Link to='/'> Back to Todo </Link>
        </div>
    )
}