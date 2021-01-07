import React, {useState,useEffect} from 'react'
import { Card } from './Card'
import { Form } from './Form'
import api from './Api'

export const Todo = () => {
    const [todo,setTodo] = useState([])
    const [addToDo,setAddToDo] = useState('')

    useEffect(() => {
        fetch('/api').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setTodo(data))
    },[])

    const handleFormChange = (inputVal) => {
        setAddToDo(inputVal)
        console.log(addToDo)
    }

    const handleFormSubmit = () => {
        fetch('/api/create', {
            method:'POST',
            body: JSON.stringify({
                content: addToDo
            })
        }).then(response => response.json)
          .then(msg => {
              console.log(msg)
              setAddToDo('')
              updateData()
        })
    }

    const updateData = () => {
        fetch('/api').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setTodo(data))
    }

    return (
        <div>
            <Form userInput = {addToDo} onFormChange = {handleFormChange} onFormSubmit = {handleFormSubmit}/>
            <Card toDoList = {todo}/>
        </div>
    )
}
