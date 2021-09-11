import { useState, useEffect, useRef } from 'react'
import { TrashIcon, EditIcon, SaveIcon2 } from './Icons'

function ModalTask({ task, delTask, editTask, editable, setEditable }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(task)
  const editRef = useRef()

  useEffect(() => {
    if (editing === true) {
      setTimeout(() => {
        editRef.current.focus()
      }, 1)
    }
  }, [editing])

	useEffect(() => {
		if(editable === true) {
			setEditing(false)
		}
	},[editable])

  const onEditClick = () => {
    if (editable === false && editing === false) return

    if (editing === true) {
      // click save
      editTask(task, text)
      setEditable(true)
			setEditing(false)
    } else {
      // click edit
			setEditing(true)
      setEditable(false)
      setText(task)
    }
  }

  const onDelClick = () => {
    setEditable(true)
		setEditing(false)
    delTask(task)
  }

  return (
    <div className="flex bg-gray-500 items items-center justify-between rounded mb-1">
      <div className="flex items-center">
        <button onClick={() => onEditClick(task, text)}>
          {editing ? <SaveIcon2 /> : <EditIcon />}
        </button>
        {editing ? (
          <input
					className="w-72 outline-none bg-gray-500 "
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={editRef}
          ></input>
        ) : (
          <div className=" bg-gray-500  break-words w-72">{task}</div>
        )}
      </div>
      <button onClick={onDelClick}>
        <TrashIcon />
      </button>
    </div>
  )
}

export default ModalTask
