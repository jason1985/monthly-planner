import Task from './Task'

function DatesGrid({ dates, displayedMonth, displayedYear, tasks, setTasks }) {

  const handleClick = (date) => {
    let taskKey = `${displayedMonth}-${date.date}-${displayedYear}`

    if (taskKey in tasks) {
      setTasks({ ...tasks, [`${taskKey}`]: [...tasks[taskKey], '2nd task'] })
    } else {
      tasks[taskKey] = ['new value']
      setTasks({ ...tasks, [`${taskKey}`]: ['first task'] })
    }
  }
	
  return (
    <>
      {dates.map((date, index) => {
        let info = ''
        switch (date.info) {
          case 'curr':
            info =
              'rounded-sm bg-opacity-20 bg-white overflow-hidden cursor-pointer'
            break
          case 'other':
            info =
              'text-gray-500 text-opacity-40 rounded-sm bg-opacity-20 bg-grey overflow-hidden'
            break
          case 'today':
            info =
              'rounded-sm bg-opacity-50 bg-white overflow-hidden cursor-pointer'
            break
          default:
        }

        if (date.info === 'other') {
          return (
            <div className={info} key={index}>
              <div className=" ml-0.5 text-xs">{date.date}</div>
            </div>
          )
        }

        let taskKey = `${displayedMonth}-${date.date}-${displayedYear}`

        return (
          <div onClick={() => handleClick(date)} className={info} key={index}>
            <div className=" ml-0.5 text-xs">{date.date}</div>
            {taskKey in tasks === true
              ? tasks[taskKey].map((t) => <Task task={t} />)
              : null}
          </div>
        )
      })}
    </>
  )
}

export default DatesGrid
