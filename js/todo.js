export const  TodoManager = () => {

    let tasks = [];

    const addTask = (title) => {
       
      const task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(task);
    return true;
    }

    const deleteTask = (id) => {
        tasks = tasks.filter((task) => task.id !== id);

    }


    const toggleTask = (taskid) => {
        const task = tasks.find((task) => task.id === taskid);
        if(task) {
            task.completed = !task.completed
        }
    }


}