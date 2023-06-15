import { useEffect, useState } from "react"
import { deleteTodoData, getTodoData, postTodoData, updateTodoData } from "./Routes/todoRoute"
import './App.css'

const TodoComponent = () => {
    const [todo, setTodo] = useState([])
    const [addTodo, setAddTodo] = useState([])
    const [action, setAction] = useState("")
    const [selectedId, setSelectedId] = useState("")
   
    const getAllTodos = async () => {
        try {
            const res = await getTodoData()
            setTodo(res)
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => { getAllTodos() }, [])

    const onChangeTodoFun = (e) => {
        setAddTodo(e.target.value)
    }
    
    const onAddTodo = async (addTo) => {
        try {
            const res = await postTodoData({ todo: addTo })
            document.getElementById("todoInput").value = ""
            setAddTodo("")
            setAddTodo("Add")
            setTodo(res)
            return getAllTodos()
        }
        catch (e) {
            console.log(e)
        }
    }
    const onEditTodo = (e, x) => {
        setAddTodo(e.target.value)
        setSelectedId(x._id)
        document.getElementById("todoInput").value = x.todo
        setAction("Edit")
    }
    const onSaveUpdatedTodo = async (addTodo, x) => {
        try {
            document.getElementById("todoInput").value = ""
            let todoValue = { todo: addTodo }
            const res = await updateTodoData(x._id, todoValue)
            setTodo(res)
            setSelectedId("")
            return getAllTodos()
        }
        catch (e) {
            console.log(e)
        }
    }
    const onCancelUpdatedTodo = (x) => {
        setSelectedId("")
        document.getElementById("todoInput").value = ""
        return getAllTodos()
    }
    const onDeleteTodo = async (x) => {
        try {
            const res = await deleteTodoData(x._id)
            return res
        }
        catch (e) {
            console.log(e)
        }
    }
   
    return (
        <div>
            <div>
                <h1 className="title">Todo</h1>
                <input type="text" name="todoInput" id="todoInput" onChange={(e) => onChangeTodoFun(e)} />
                <button type="submit" onClick={() => onAddTodo(addTodo)} className="addBtn" hidden={action === "Edit"}>ADD</button>
            </div>
            <div className="mainContainer">
                <div className="todoSectionContainer" >
                    {todo?.map(x => {
                        return (
                            <ul key={todo?._id} className="todosContainer">
                                <li key={todo?._id}><h1 className="todoText">{x?.todo}</h1>
                                    <button onClick={(e) => onEditTodo(e, x)} className="actionBtn" hidden={x?._id === selectedId}>EDIT</button>
                                    {x?._id === selectedId && <>
                                        <button onClick={() => onSaveUpdatedTodo(addTodo, x)} className="actionBtn" hidden={todo?._id === x?._id}> Save</button>
                                        <button onClick={() => onCancelUpdatedTodo(x)} className="dangerBtn" hidden={todo?._id === x?._id}>Cancel</button>
                                    </>}
                                    <button onClick={() => onDeleteTodo(x)} className="dangerBtn" >DELETE</button>
                                </li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default TodoComponent