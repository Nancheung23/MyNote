import { useState, useEffect } from 'react'
import noteServices from './service/noteServices'

const App = () => {
  const categories = ['tasks', 'tags', 'timestamps', 'options', 'timesfortask']
  const [tasks, setTasks] = useState([])
  const [tags, setTags] = useState([])
  // test get all tasks
  useEffect(() => {
    noteServices
      .getAll(categories[0])
      .then(tasks => setTasks(tasks))
  }, [])
  // test get all tags
  useEffect(() => {
    noteServices
      .getAll(categories[1])
      .then(tags => setTags(tags))
  }, [])

  // construct tags
  const listTags = (id) => {
    tasks[id - 1].tags.split(',').map(tagId => {
      tags.find(tag => tag.id === tagId)
    }
    )
  }
  // construct tasks
  const listTasks = tasks.map(task =>
    <li key={task.id}>
      <p>Task id: {task.id}</p>
      <p>Task name: {task.name}</p>
      <p>Task tags: {listTags(task.id)}</p>
    </li>)

  return (
    <div>
      {listTasks}
    </div>
  )
}

export default App
