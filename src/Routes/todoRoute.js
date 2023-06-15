import axios from "axios";
const URL = "http://localhost:8080"
var headers = (process.env.NODE_ENV === "production") ? {} : {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type'
}

//get all Todo details
const getTodoData = async () => {
    try {
        const res = await axios.get(URL, { headers })
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}

//post all Todo details
const postTodoData = async (todoData) => {
    try {
        const res = await axios.post(URL + `/addTodo`, todoData)
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}
//update all Todo details
const updateTodoData = async (id, todoData) => {
    try {
        const res = await axios.patch(URL + `/updateTodo/${id}`, todoData)
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}
//delete all todo details
const deleteTodoData = async (id) => {
    try {
        const res = await axios.delete(URL + `/${id}`)
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}

export { getTodoData, postTodoData, updateTodoData, deleteTodoData }