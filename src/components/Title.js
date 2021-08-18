import { LeftArrow, RightArrow } from './Icons'

const WeekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function Title({ month, year,setCurrentMonth, currentMonth }) {
  return (
    <>
      <div className=" relative overflow-hidden text-3xl xl:text-5xl flex justify-center items-center h-3/4 w-full">
        {`${month} ${year}`}
        <div className=" text-opacity-50 text-blue-500 absolute top-0 right-0 flex">
          <div onClick={() => setCurrentMonth(currentMonth - 1)}>
            <LeftArrow />
          </div>
          <div onClick={() => setCurrentMonth(currentMonth + 1)}>
            <RightArrow />
          </div>
        </div>
      </div>
      {/* Sunday throught Saturday */}
      <div className="grid grid-cols-7 gap-1 h-1/4 ">
        {WeekDays.map((day) => (
          <div
            className="overflow-hidden flex justify-center items-center"
            key={day}
          >
            {day}
          </div>
        ))}
      </div>
    </>
  )
}

export default Title
