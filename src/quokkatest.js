
let displayedMonth = "july"
let date = 23
let displayedYear = "1985"
let key = `${displayedMonth}-${date}-${displayedYear}`
console.log(key)

let tasks = {}
tasks[key] = ["do something"]
console.log(tasks)


// this was tricky. [`${key}`] seems to be the only way to do it
if(key in tasks) {
	tasks = {...tasks, [`${key}`]: [...tasks[key],'2nd task']}
} else {
	tasks[key] = ['new value']
	tasks = {...tasks, [`${key}`]: ['first task']}
}

// tasks = {...tasks, {tasks[key]: ['new value']}}




console.log(tasks)

