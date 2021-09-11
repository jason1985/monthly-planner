import { useState, useEffect, useRef } from 'react'
import Modal from 'react-modal'
import { PlusIcon } from './Icons'
import ModalTask from './ModalTask'

Modal.setAppElement('#root')

const TaskModal = ({
  addTask,
  delTask,
  editTask,
  tasks,
  showModal,
  setShowModal,
}) => {
  const [data, setData] = useState('')
  const [editable, setEditable] = useState(true)
  const inputRef = useRef()

  useEffect(() => {
    if (showModal === true) {
      setTimeout(() => {
        setData('')
        inputRef.current.focus()
      }, 1)
    }
  }, [showModal])

  const onSubmit = (e) => {
    e.preventDefault()
    setShowModal(false)
    if (data !== '') {
      addTask(data)
    }
    setData('')
    setEditable(true)
  }

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={onSubmit}
      className=" h-36 w-96 bg-blue-500 bg-opacity-70 rounded p-2 overflow-y-auto overflow-x-auto
      "
      overlayClassName="h-screen w-screen flex justify-center items-center fixed left-0 top-0 bg-black bg-opacity-5 z-10"
    >
      {tasks.map((task,i) => (
        <ModalTask
          key={i}
          task={task}
          delTask={delTask}
          editTask={editTask}
          editable={editable}
          setEditable={setEditable}
        />
      ))}
      <form className="flex items-center justify-between" onSubmit={onSubmit}>
        <input
          className="p-0.5 flex-grow outline-none rounded"
          ref={inputRef}
          type="text"
          placeholder="add task/event"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button className=" rounded-full ml-1" type="submit">
          <PlusIcon />
        </button>
      </form>
    </Modal>
  )
}

export default TaskModal
