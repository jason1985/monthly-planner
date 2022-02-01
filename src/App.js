import { useState, useEffect } from 'react'
import moment from 'moment'
import Title from './components/Title'
import Day from './components/Day'

//TODO:
//  make logic for datesArray into a function/hook

// at very end maybe add context menu?

//               Calendar
// ┌──────────────────────────────────┐
// │          ┌─────────────┐         │
// │          │ August 2029 │         │
// │          └─────────────┘         │           -Month & Year
// ├────┬────┬────┬────┬────┬────┬────┤ <Title />
// │ S  │ M  │ T  │ W  │ T  │ F  │ S  │           -Weekdays
// ├────┼────┼────┼────┼────┼────┼────┤
// │ 28 │ 30 │ 31 │  1 │  2 │  3 │  4 │ <DatesGrid /> is a 7x6 grid
// │  5 │  6 │  7 │  8 │  9 │ 10 │ 11 │   -dates outside displayed month are greyed out
// │ 12 │ 13 │ 14 │ 15 │ 16 │ 17 │ 18 │   -dates in displayed month can contain <Task />'s
// │ 19 │ 20 │ 21 │ 22 │ 23 │ 24 │ 25 │
// │ 26 │ 27 │ 28 │ 29 │ 30 │ 31 │  1 │
// │  2 │  3 │  4 │  5 │  6 │  7 │  8 │
// └────┴────┴────┴────┴────┴────┴────┘

function App() {
  const [currentMonth, setCurrentMonth] = useState(0)
  const [displayedMonth, setDisplayedMonth] = useState('')
  const [displayedYear, setDisplayedYear] = useState('')
  const [dates, setDates] = useState([])
  const [tasks, setTasks] = useState({})

  //  builds a 42 element array to fill 7x6 calendar & info key used for styling
  //  other = greyed out dates from months before & after current month(curr)
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
      //0-6 0 = Sunday, 1 = Monday, etc.
      moment().add(currentMonth, 'month').startOf('month').format('d')
    )
    let totalDays = parseInt(
      moment().add(currentMonth, 'month').endOf('month').format('D')
    )

    if (firstDay > 0) {
      //total dates of the previous month
      let end = parseInt(
        moment()
          .add(currentMonth - 1, 'month')
          .endOf('month')
          .format('D')
      )

      //add dates from prevous month
      let i = end - firstDay + 1
      for (; i <= end; i++) {
        datesArray.push({ date: i, info: 'other' })
      }
    }

    //add dates for current month
    for (let i = 1; i < totalDays + 1; i++) {
      if (currentMonth === 0 && i === todaysDate) {
        datesArray.push({ date: i, info: 'today' })
      } else {
        datesArray.push({ date: i, info: 'curr' })
      }
    }

    //add dates for next month
    let remaining = 42 - (totalDays + firstDay)
    for (let i = 1; i < remaining + 1; i++) {
      datesArray.push({ date: i, info: 'other' })
    }

    //set the state
    setDates(datesArray)
    setDisplayedMonth(month)
    setDisplayedYear(year)
    if(localStorage.getItem('calendar') !== null) {
      setTasks(JSON.parse(localStorage.getItem('calendar')))
    } else {
      localStorage.setItem('calendar', JSON.stringify({}))
    }
  }, [currentMonth])

  useEffect(() => {
    localStorage.setItem('calendar', JSON.stringify(tasks))
  },[tasks])

  return (
    <div className="animate-sliding bg-cover bg-jellyfish h-screen w-screen flex justify-center items-center select-none">
      <div className="bg-opacity-50 bg-white h-4/5 w-3/4 rounded-lg overflow-hidden">
        <div className="h-1/6">
          <Title
            month={displayedMonth}
            year={displayedYear}
            setCurrentMonth={setCurrentMonth}
            currentMonth={currentMonth}
          />
        </div>
        <div className="grid grid-cols-7 gap-1 grid-rows-6 h-5/6">
          {dates.map((date,index) => (
            <Day
              key={index}
              date={date}
              displayedMonth={displayedMonth}
              displayedYear={displayedYear}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
