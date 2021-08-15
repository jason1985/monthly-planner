import { useState, useEffect } from 'react'
import moment from 'moment'
import Task from './Task'
import { LeftArrow, RightArrow } from './Icons'

//               Calendar (75% width & height of the page)
// ┌──────────────────────────────────┐
// │          ┌─────────────┐         │ MonthAndYear (2/3 of 20% height of Calendar)
// │          │ August 2029 │         │
// │          └─────────────┘         │
// ├────┬────┬────┬────┬────┬────┬────┤
// │ S  │ M  │ T  │ W  │ T  │ F  │ S  │	DayNames (1/3 of 20% height of Calendar)
// ├────┼────┼────┼────┼────┼────┼────┤
// │ 28 │ 30 │ 31 │  1 │  2 │  3 │  4 │ DaysContainer (80% height of Calendar)
// │  5 │  6 │  7 │  8 │  9 │ 10 │ 11 │
// │ 12 │ 13 │ 14 │ 15 │ 16 │ 17 │ 18 │
// │ 19 │ 20 │ 21 │ 22 │ 23 │ 24 │ 25 │
// │ 26 │ 27 │ 28 │ 29 │ 30 │ 31 │  1 │
// │  2 │  3 │  4 │  5 │  6 │  7 │  8 │
// └────┴────┴────┴────┴────┴────┴────┘
//
// DaysContainer will always contain 6 rows
// days not in the current month will be greyed out

function App() {
  const [dates, setDates] = useState([])
  const [currentMonth, setCurrentMonth] = useState(0)
  const [displayedMonth, setDisplayedMonth] = useState('')
  const [displayedYear, setDisplayedYear] = useState('')
  const [tasks, setTasks] = useState({})

  //  builds a 42 element array to fill 7x6 calendar
  //  [{date: 31, info: "other"},
  //  ...
  //  {date: 15, info: "curr"},
  //  {date: 16, info: "today"},
  //  {date: 17, info: "curr"}
  //  {date: 18, info: "curr"},
  //  ...
  //  {date: 1, info: "other"}]

  useEffect(() => {
    let datesArray = []
    let todaysDate = parseInt(moment().format('D'))
    let month = moment().add(currentMonth, 'month').format('MMMM')
    let year = moment().add(currentMonth, 'month').format('y')
    let firstDay = parseInt(
      moment().add(currentMonth, 'month').startOf('month').format('d')
    )
    let totalDays = parseInt(
      moment().add(currentMonth, 'month').endOf('month').format('D')
    )

    // console.log(month, year, firstDay, totalDays)

    if (firstDay > 0) {
      console.log('firstDay', firstDay)
      //total days of the previous month
      let end = parseInt(
        moment()
          .add(currentMonth - 1, 'month')
          .endOf('month')
          .format('D')
      )

      //fill outdays from prevous month
      let i = end - firstDay + 1
      for (; i <= end; i++) {
        datesArray.push({ date: i, info: 'other' })
      }
    }

    //fill out days for current month
    for (let i = 1; i < totalDays + 1; i++) {
      if (currentMonth === 0 && i === todaysDate) {
        datesArray.push({ date: i, info: 'today' })
      } else {
        datesArray.push({ date: i, info: 'curr' })
      }
    }

    //fill out days for next month
    let remaining = 42 - (totalDays + firstDay)
    for (let i = 1; i < remaining + 1; i++) {
      datesArray.push({ date: i, info: 'other' })
    }

    setDates(datesArray)
    setDisplayedMonth(month)
    setDisplayedYear(year)
  }, [currentMonth])

  const handleClick = (date) => {
    let taskKey = `${displayedMonth}-${date.date}-${displayedYear}`

    if (taskKey in tasks) {
      setTasks({ ...tasks, [`${taskKey}`]: [...tasks[taskKey], '2nd task'] })
    } else {
      tasks[taskKey] = ['new value']
      setTasks({ ...tasks, [`${taskKey}`]: ['first task'] })
    }

    console.log(tasks)
  }

  console.log(dates)

  return (
    //wrapper takes up the whole page
    <div className="animate-sliding bg-cover bg-jellyfish h-screen w-screen flex justify-center items-center select-none">
      {/* Calendar */}
      <div className="bg-opacity-50 bg-white h-4/5 w-3/4 rounded-lg overflow-hidden">
        {/* Wrapper - ensures that MonthAndYear & DayNames takes up 20% height of Calendar  */}
        <div className="h-1/6">
          {/* MonthAndYear */}
          <div className=" relative overflow-hidden text-3xl xl:text-5xl flex justify-center items-center h-3/4 w-full">
            {`${displayedMonth} ${displayedYear}`}
            <div className=" text-opacity-50 text-blue-500 absolute top-0 right-0 flex">
              <div onClick={() => setCurrentMonth(currentMonth - 1)}>
                <LeftArrow />
              </div>
              <div onClick={() => setCurrentMonth(currentMonth + 1)}>
                <RightArrow />
              </div>
            </div>
          </div>
          {/* DayNames */}
          <div className="grid grid-cols-7 gap-1 h-1/4 ">
            {dayNames.map((day) => (
              <div
                className="overflow-hidden flex justify-center items-center"
                key={day}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        {/* End of Wrapper */}

        {/* DaysContainer - takes up the remaining 80% of Calendar */}
        <div className="grid grid-cols-7 gap-1 grid-rows-6 h-5/6">
          {/* add dates to calendar & proper style for each date (other,today,curr) */}
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
              <div
                onClick={() => handleClick(date)}
                className={info}
                key={index}
              >
                <div className=" ml-0.5 text-xs">{date.date}</div>
                {taskKey in tasks === true
                  ? tasks[taskKey].map((t) => <Task task={t} />)
                  : null}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
