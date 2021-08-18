import { useState, useEffect } from 'react'
import moment from 'moment'
import Title from './components/Title'
import DatesGrid from './components/DatesGrid'

//TODO: Update sizing comments after tweaking it. ex: daysContainer takes up 80% etc.
//  refactor things into components & make it readable
//  make logic for datesArray into a function/hook
// add: modals & localstorage
// at very end maybe add context menu

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
  const [currentMonth, setCurrentMonth] = useState(0)
  const [displayedMonth, setDisplayedMonth] = useState('')
  const [displayedYear, setDisplayedYear] = useState('')
  const [dates, setDates] = useState([])
  const [tasks, setTasks] = useState({ month: 0 })

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
      //total days of the previous month
      let end = parseInt(
        moment()
          .add(currentMonth - 1, 'month')
          .endOf('month')
          .format('D')
      )

      //fill out days from prevous month
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

    //set the state
    setDates(datesArray)
    setDisplayedMonth(month)
    setDisplayedYear(year)
  }, [currentMonth])

  return (
    //wrapper takes up the whole page
    <div className="animate-sliding bg-cover bg-jellyfish h-screen w-screen flex justify-center items-center select-none">
      {/* Calendar */}
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
          <DatesGrid
            dates={dates}
            displayedMonth={displayedMonth}
            displayedYear={displayedYear}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </div>
    </div>
  )
}

export default App
