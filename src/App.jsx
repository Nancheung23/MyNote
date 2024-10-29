import { useState, useEffect } from 'react'
import noteServices from './service/noteServices'

const App = () => {
  const categories = ['tasks', 'tags', 'timestamps', 'options', 'timesfortask']
  const [tasks, setTasks] = useState([])
  const [tags, setTags] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [options, setOptions] = useState([])
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

  useEffect(() => {
    noteServices
      .getAll(categories[2])
      .then(timestamp => setTimestamps(timestamp))
  }, [])

  useEffect(() => {
    noteServices
      .getAll(categories[3])
      .then(option => setOptions(option))
  }, [])
  // construct tags
  // const listTags = tags.map(tag =>
  //   <li key={tag.id}>
  //     {tag.name}
  //   </li>
  // )

  const listOptions = options.map(option =>
    <ul key={option.id}>
      <li>id: {option.id}</li>
      <li>theme: {option.theme}</li>
      <li>alternative: {option.alternative}</li>
      <li>own_textual_data: {option.own_textual_data}</li>
    </ul>
  )


  const filterTags = (task) => {
    const filterTags = tags.filter(tag => task.tags.includes(tag.id))
    const names = []
    filterTags.forEach(tag => names.push(tag.name))
    return names
  }

  const filterTimestamps = (task) => {
    const filterTimestamps = timestamps.filter(timestamp => timestamp.task === task.id)
    const times = []
    filterTimestamps.forEach(timestamp => times.push(timestamp.timestamp))
    return times
  }
  // construct tasks
  const listTasks = tasks.map(task =>
    // for each task, will display:
    <ul key={task.id}>
      <li>Task id: {task.id}</li>
      <li>
        Task timestamps: {
          // also ? timesfortask can use
          filterTimestamps(task).sort().map(timestamp =>
            <p key={filterTimestamps(task).indexOf(timestamp) + 1}>
              {timestamp}
            </p>
          )
        }
      </li>
      <li>Task name: {task.name}</li>
      <li>Task tags: {
        filterTags(task).sort().map(tag =>
          <p key={filterTags(task).indexOf(tag) + 1}>
            {tag}
          </p>
        )
      }</li>
    </ul>)

  return (
    <div>
      {listTasks}
      <br />
      {listOptions}
    </div>
  )
}

export default App
