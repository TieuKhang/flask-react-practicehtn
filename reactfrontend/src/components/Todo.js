import React, {useState,useEffect} from 'react'
import Card from './Card.js'

const Todo = () => {
    const [todo,setTodo] = useState([])

    useEffect(() => {
        fetch('/api').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => console.log(data))
    },[])

    return (
        <div>
            <Card/>
        </div>
    )
}

export default Todo;