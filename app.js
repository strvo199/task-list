//class List
class List{
    constructor(newTask,filterTask){
        this.newTask = newTask;
        this.filterTask = filterTask;
    }

}

class UI{
    //showAlert
    showAlert(msg,classname){
        const divAlert =  document.createElement('div');
            divAlert.className = `alert ${classname}`
            divAlert.appendChild(document.createTextNode(msg));
        const card = document.querySelector('.card-content'),
              cardTitle = document.querySelector('.card-title')    
        card.insertBefore(divAlert,cardTitle);
        setTimeout(function() {
            document.querySelector('.alert').remove()
        },3000)
    }

    //addTaskToList
    addTaskToList(list){
    const listItem = document.querySelector('.collection'),
          step = document.createElement('li');
          const msgDiv = document.createElement('div');
          step.className = 'collection-item'
          msgDiv.appendChild(document.createTextNode(list.newTask))
          msgDiv.className = 'msg-div'
          step.appendChild(msgDiv)
          const link  = document.createElement('div');
          link.className = 'secondary-content'
          link.innerHTML = '<a class = "delete" href ="#"><i class="fa fa-remove" aria-hidden="true"></i></a>'
          step.appendChild(link)
        listItem.appendChild(step)
        if (listItem.value !== '') {
            const resultTask = document.querySelector('#saved-task');
            resultTask.style.display = 'block';
        }
    }
    //clearInput
    clearInput(){
        document.querySelector('#task').value = ''
    }
    //deleteTask
    deleteTask(target){
        if (target.parentElement.className === 'delete') {
            target.parentElement.parentElement.parentElement.remove();
        }
    }
    //filterTask;
    filterTask(target){
        const task = target.value.toLowerCase();
        document.querySelectorAll('.collection-item').forEach(function(ask){
            const item = ask.firstChild.textContent;
            if (item.toLowerCase().indexOf(task) != -1) {
                ask.style.display = 'block';
            } else {
                ask.style.display = 'none';
            }
        });

    }
         
    

    clearTask(){
        const listItem = document.querySelector('.collection')
        while (listItem.firstChild) {
                listItem.removeChild(listItem.firstChild)
                
            }
                  
        }
    }

    //Store in LS;
class Store{
    static getTask(list){
        let lists;
        if (localStorage.getItem('lists') === null) {
            lists = []
        } else {
            lists = JSON.parse(localStorage.getItem('lists'))
        }
        return lists;
    }

    static displayTasks(){
        const lists = Store.getTask();
        lists.forEach(function(list) {
            const ui = new UI();
            ui.addTaskToList(list)
        });

        
    }

    static addTasks(list){
        const lists = Store.getTask();
        lists.push(list);
        localStorage.setItem('lists',JSON.stringify(lists))
    }

    static removeTask(step){
        const lists = Store.getTask();
        lists.forEach(function(list,index) {
            lists.splice(index,1)
        });
        localStorage.setItem('lists',JSON.stringify(lists))
    }

    static clearTasks(){
        const lists = Store.getTask();
        
        localStorage.clear()

    }


}

    


//event listener

//DOM
document.addEventListener('DOMContentLoaded',Store.displayTasks)

//add Task
document.getElementById('list-form').addEventListener('submit', function (e) {
    const taskInput = document.getElementById('task').value;
    //instantiate List;
    const list = new List(taskInput)
    //instantiate List;
    const ui = new UI()
    //
    if (taskInput === '') {
        ui.showAlert('Please enter a Task','error')
    }else{
        
        ui.addTaskToList(list);
        ui.showAlert('Task Added','success')
        ui.clearInput()
        Store.addTasks(list)
    }
    
    

    e.preventDefault()
})
//clearTask
document.querySelector('#clear-btn').addEventListener('click',function (e) {
    const listItem = document.querySelector('.collection')
    const ui = new UI()
    if (listItem.value !== '') {
        if (confirm('Are you sure')) {
            ui.showAlert('Task clear','success')
            ui.clearTask()  
            Store.clearTasks()
        }
        
    }
    

    e.preventDefault()
})

//delete
document.querySelector('.collection').addEventListener('click',function (e) {
    const ui = new UI()
    ui.deleteTask(e.target)
    ui.showAlert('Task successfully remove!','success')
    //celete From LS;
    Store.removeTask(e.target.parentElement.parentElement.parentElement)

    e.preventDefault()
})
//filterTask;
document.querySelector('#filter').addEventListener('keyup',function (e) {
    ui = new UI();
    //filterTask
    ui.filterTask(e.target)
    e.preventDefault()
})