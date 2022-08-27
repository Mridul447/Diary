const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');


loadEventListeners();


function loadEventListeners()
{  
   document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
}


 function getTasks()
 {
   let tasks;
   if(localStorage.getItem('main')===null)
   {
     tasks=[];
   }else{
    tasks=JSON.parse(localStorage.getItem('main'));
   }
 }

function addTask(e)
{
   if(taskInput.value === ''){
    alert('Add a task');    
   }

   const li=document.createElement('li');
   li.className = 'collection-item';
   li.appendChild(document.createTextNode(taskInput.value));
   const link=document.createElement('a');
   link.className='delete-item secondary-content';
   link.innerHTML='<i class="fa fa-remove"></i>';
   li.appendChild(link);
   taskList.appendChild(li);
   storeTaskInLocalStorage(taskInput.value);
   taskInput.value='';
   e.preventDefault();
}

function storeTaskInLocalStorage(task)
{  
    let tasks;
   if(localStorage.getItem('main')===null)
   {
     tasks=[];
   }else{
    tasks=JSON.parse(localStorage.getItem('main'));
   }
   tasks.push(task);
   localStorage.setItem('main',JSON.stringify(tasks));
   // console.log(tasks);
  
   
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure?'))
        {
           e.target.parentElement.parentElement.remove();
        }
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage(tI){
   let tasks;
   if(localStorage.getItem('main')===null)
   {
     tasks=[];
   }else{
    tasks=JSON.parse(localStorage.getItem('main'));
   }

   tasks.forEach(function(task,index){
      if(tI.textContent===task){
         task.splice(index,1);
      }
   });
   localStorage.setItem('main',JSON.stringify(tasks));
}

function clearTasks()
{
//    taskList.innerHTML = '';
      while(taskList.firstChild)
      {
        taskList.removeChild(taskList.firstChild);
      }   
}

function filterTasks(e)
{
   const text=e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(
    function(task){
     const item=task.textContent;
     if(item.toLowerCase().indexOf(text)!=-1)
     {
        task.style.display='block';
     }else{
        task.style.display='none';
     }
    // console.log(item);

    });
}
