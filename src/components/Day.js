import { useState } from 'react'
import Task from './Task'
import TaskModal from './TaskModal'

function Day({ date, displayedMonth, displayedYear, tasks, setTasks }) {
  const [showModal, setShowModal] = useState(false)

  const onClick = () => {
    if (showModal === false) {
      setShowModal(true)
    }
  }

  const addTask = (task) => {
    let taskKey = `${displayedMonth}-${date.date}-${displayedYear}`

    if (taskKey in tasks) {
      setTasks({ ...tasks, [`${taskKey}`]: [...tasks[taskKey], task] })
    } else {
      setTasks({ ...tasks, [`${taskKey}`]: [task] })
    }
  }

  const delTask = (task) => {
    setTasks({
      ...tasks,
      [`${taskKey}`]: [...tasks[taskKey].filter((t) => t !== task)],
    })
  }

  const editTask = (oldTask, newTask) => {

    let index = tasks[taskKey].indexOf(oldTask)
    tasks[taskKey].splice(index, 1, newTask)

    setTasks({
      ...tasks,
      [`${taskKey}`]: [...tasks[taskKey]],
    })
  }

  let info = ''
  switch (date.info) {
    case 'curr':
      info = 'rounded-sm bg-opacity-20 bg-white overflow-hidden cursor-pointer'
      break
    case 'other':
      info =
        'text-gray-500 text-opacity-40 rounded-sm bg-opacity-20 bg-grey overflow-hidden'
      break
    case 'today':
      info = 'rounded-sm bg-opacity-50 bg-white overflow-hidden cursor-pointer'
      break
    default:
  }

  if (date.info === 'other') {
    return (
      <div className={info}>
        <div className=" ml-0.5 text-xs">{date.date}</div>
      </div>
    )
  }

  let taskKey = `${displayedMonth}-${date.date}-${displayedYear}`

  return (
    <div onClick={onClick} className={info}>
      <div key={'date'} className=" ml-0.5 text-xs">
        {date.date}
      </div>
      {taskKey in tasks === true
        ? tasks[taskKey].map((t, i) => {
            return <Task key={i} task={t} /> // make a legit key?
          })
        : null}
      <TaskModal
        tasks={taskKey in tasks === true ? tasks[taskKey] : []}
        addTask={addTask}
        delTask={delTask}
        editTask={editTask}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  )
}

export default Day
