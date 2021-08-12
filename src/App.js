//               Calendar
// ┌──────────────────────────────────┐
// │          ┌─────────────┐         │ MonthAndYear
// │          │ August 2029 │         │
// │          └─────────────┘         │
// ├────┬────┬────┬────┬────┬────┬────┤
// │ S  │ M  │ T  │ W  │ T  │ F  │ S  │	DayNames
// ├────┼────┼────┼────┼────┼────┼────┤
// │ 28 │ 30 │ 31 │  1 │  2 │  3 │  4 │ DaysContainer
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
  return (
    //wrapper takes up the whole page
    <div className="bg-cover bg-jellyfish h-screen w-screen flex justify-center items-center">
      {/* Calendar */}
      <div className="bg-opacity-50 bg-white h-3/4 w-3/4 rounded-lg overflow-hidden">
        {/* Wrapper */}
        <div className="h-1/5">
          {/* MonthAndYear */}
          <div className=" relative overflow-hidden text-3xl xl:text-5xl flex justify-center items-center h-3/4 w-full">
            August 2021
            <div className=" text-opacity-50 text-blue-500 absolute top-0 right-0 flex">
              <LeftArrow />
              <RightArrow />
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
        {/* DaysContainer */}
        <div className="grid grid-cols-7 gap-1 grid-rows-6 h-4/5">
          {dates.map((date) => (
            <div
              className=" rounded-sm bg-opacity-20 bg-white overflow-hidden flex justify-center items-center"
              key={date}
            >
              {date.date}
            </div>
          ))}
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

//mock dates for now, will be replaced with real dates from momentjs
const dates = [
  { day: 'Monday', date: '1' },
  { day: 'Tuesday', date: '2' },
  { day: 'Wednesday', date: '3' },
  { day: 'Thursday', date: '4' },
  { day: 'Friday', date: '5' },
  { day: 'Saturday', date: '6' },
  { day: 'Sunday', date: '7' },
  { day: 'Monday', date: '8' },
  { day: 'Tuesday', date: '9' },
  { day: 'Wednesday', date: '10' },
  { day: 'Thursday', date: '11' },
  { day: 'Friday', date: '12' },
  { day: 'Saturday', date: '13' },
  { day: 'Sunday', date: '14' },
  { day: 'Monday', date: '15' },
  { day: 'Tuesday', date: '16' },
  { day: 'Wednesday', date: '17' },
  { day: 'Thursday', date: '18' },
  { day: 'Friday', date: '19' },
  { day: 'Saturday', date: '20' },
  { day: 'Sunday', date: '21' },
  { day: 'Monday', date: '22' },
  { day: 'Tuesday', date: '23' },
  { day: 'Wednesday', date: '24' },
  { day: 'Thursday', date: '25' },
  { day: 'Friday', date: '26' },
  { day: 'Saturday', date: '27' },
  { day: 'Sunday', date: '28' },
  { day: 'Monday', date: '29' },
  { day: 'Tuesday', date: '30' },
  { day: 'Wednesday', date: '31' },
  { day: 'Thursday', date: '25' },
  { day: 'Friday', date: '26' },
  { day: 'Saturday', date: '27' },
  { day: 'Sunday', date: '28' },
  { day: 'Monday', date: '29' },
  { day: 'Tuesday', date: '30' },
  { day: 'Wednesday', date: '31' },
  { day: 'Thursday', date: '25' },
  { day: 'Friday', date: '26' },
  { day: 'Saturday', date: '27' },
  { day: 'Sunday', date: '28' },
]
