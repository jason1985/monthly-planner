import { useState, useEffect } from 'react'
import moment from 'moment'

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

// 0 is current month, -1 is previous month, 1 is next month
// function getMonth(offset) {
//   let datesArray = []
//   let month = moment().add(offset, 'month').format('MMMM')
//   let year = moment().add(offset, 'month').format('y')
//   let firstDay = parseInt(
//     moment().add(offset, 'month').startOf('month').format('d')
//   )
//   let totalDays = parseInt(
//     moment().add(offset, 'month').endOf('month').format('D')
//   )

//   console.log(month, year, firstDay, totalDays)

//   if (firstDay > 0) {
//     //total days of the previous month
//     let end = parseInt(
//       moment()
//         .add(offset - 1, 'month')
//         .endOf('month')
//         .format('D')
//     )

//     //fill outdays from prevous month
//     let i = end - firstDay
//     for (; i < end + 1; i++) {
//       datesArray.push({ date: { i }, info: 'other' })
//     }
//   }

//   //fill out days for current month
//   for (let i = 1; i < totalDays + 1; i++) {
//     datesArray.push({ date: { i }, info: 'curr' })
//   }

//   //fill out days for next month
//   let remaining = 42 - (totalDays + firstDay)
//   for (let i = 1; i < remaining + 1; i++) {
//     datesArray.push({ date: { i }, info: 'other' })
//   }
// }

function App() {
  const [dates, setDates] = useState([])
  const [currentMonth, setCurrentMonth] = useState(0)
  const [displayedMonth,setDisplayedMonth] = useState("")
  const [displayedYear,setDisplayedYear] = useState("")

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

    console.log(month, year, firstDay, totalDays)

    if (firstDay > 0) {
      //total days of the previous month
      let end = parseInt(
        moment()
          .add(currentMonth - 1, 'month')
          .endOf('month')
          .format('D')
      )

      //fill outdays from prevous month
      let i = end - firstDay
      for (; i < end + 1; i++) {
        datesArray.push({ date: i, info: 'other' })
      }
    }

    //fill out days for current month
    for (let i = 1; i < totalDays + 1; i++) {
      if(currentMonth === 0 && i === todaysDate) {
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

  return (
    //wrapper takes up the whole page
    <div className="animate-sliding bg-cover bg-jellyfish h-screen w-screen flex justify-center items-center select-none">
      {/* Calendar */}
      <div className="bg-opacity-50 bg-white h-3/4 w-3/4 rounded-lg overflow-hidden">
        {/* Wrapper - ensures that MonthAndYear & DayNames takes up 20% height of Calendar  */}
        <div className="h-1/5">
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
        <div className="grid grid-cols-7 gap-1 grid-rows-6 h-4/5">
          {dates.map((date, index) => {
            let info = ''
            switch (date.info) {
              case 'curr':
                info =
                  'relative rounded-sm bg-opacity-20 bg-white overflow-hidden cursor-pointer'
                break
              case 'other':
                info =
                  'relative text-gray-500 text-opacity-40 rounded-sm bg-opacity-20 bg-grey overflow-hidden'
                break
              case 'today':
                info =
                  'relative rounded-sm bg-opacity-50 bg-white overflow-hidden cursor-pointer'
                break
              default:
            }
            return (
              <div className={info} key={index}>
                <span className="ml-1 text-xs absolute">{date.date}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function LeftArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 cursor-pointer"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function RightArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 cursor-pointer"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
        clipRule="evenodd"
      />
    </svg>
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
