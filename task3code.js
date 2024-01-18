const tasks = [
    {
       id: '1138465078061',
       completed: false,
       text: 'Посмотреть новый урок по JavaScript',
    },
    {
       id: '1138465078062',
       completed: false,
       text: 'Выполнить тест после урока',
    },
    {
       id: '1138465078063',
       completed: false,
       text: 'Выполнить ДЗ после урока',
    },
   ]
   
   const createElementFunction = (TaskId, TaskText) => {
   
       const newElement = document.createElement('div');
       newElement.className = 'task-item'; 
       newElement.dataset.taskId = TaskId;
       
       const elementContr = document.createElement('div');
       elementContr.className = 'task-item__main-container';
   
       const elementContent = document.createElement('div');
       elementContent.className = 'task-item__main-content';
   
       newElement.append(elementContr);
       elementContr.append(elementContent);
   
       const formElement = document.createElement('form');
       formElement.className = 'checkbox-form';
   
       const inputElement = document.createElement('input');
       inputElement.className = 'checkbox-form__checkbox';
       inputElement.type = 'checkbox';
       const inputId = `task-${TaskId}`;
       inputElement.id = inputId;
   
       const labelElement = document.createElement('label');
       labelElement.htmlFor = inputId;
   
       const spanElement = document.createElement('span');
       spanElement.className = 'task-item__text';
       spanElement.textContent = TaskText;
   
       const deleteButtonElement = document.createElement('button');
       deleteButtonElement.className = 'task-item__delete-button default-button delete-button';
       deleteButtonElement.textContent = 'Удалить';

       elementContent.append(formElement, spanElement);
       formElement.append(inputElement, labelElement);
       elementContr.append(deleteButtonElement);
       
       // console.log(newElement, spanElement); 
       return newElement;
       
   } 
   
    
   const formLogics = document.querySelector('.create-task-block');
   formLogics.addEventListener('submit', (event) => {
       event.preventDefault();

       const { target } = event;
        const taskValue = target.taskName.value;

        let thesameNameValues;
        tasks.forEach((name) => {
           thesameNameValues = name.text;
        });

        const spanErrorElement = document.createElement('span');
        spanErrorElement.className = "error-message-block";
        tasksListContainer.append(spanErrorElement);

        const errorMessageBlockFromDOM = formLogics.querySelector('.error-message-block');
        if(thesameNameValues === taskValue){
            spanErrorElement.textContent = 'Задача с таким названием уже существует';
        }
        else if(!taskValue){
            spanErrorElement.textContent = "Название задачи не должно быть пустым"
        }
        else if(taskValue){
            const newTasks = {
                id: Date.now().toString(),
                text: taskValue,
            }
            tasks.push(newTasks);
            const formFunction = createElementFunction(newTasks.id, newTasks.text);
           tasksListContainer.append(formFunction);
            // console.log(tasksListContainer);
        }
        // if(errorMessageBlockFromDOM){
        //     errorMessageBlockFromDOM.remove();
        // }
        
});

let tasksListContainer = document.querySelector(".tasks-list");
tasks.forEach((dowork) => {
    const finalElements = createElementFunction(dowork.id, dowork.text);
    tasksListContainer.append(finalElements);
});

const createDeleteModal = (text) => {

    const firstModal = document.createElement('div');
    firstModal.className = 'modal-overlay modal-overlay_hidden';

    const deleteModal = document.createElement('div');
    deleteModal.className = 'delete-modal';

    firstModal.append(deleteModal);
    
    const textModalWindow = document.createElement('h3');
    textModalWindow.className = 'delete-modal__question';
    textModalWindow.textContent = text;
    const deleteButton = document.createElement('div');
    deleteButton.className = 'delete-modal__buttons';
    
    const buttonCancel = document.createElement('button');
    buttonCancel.className = 'delete-modal__button delete-modal__cancel-button';
    buttonCancel.textContent = 'Отмена';
    const buttonConfirm = document.createElement('button');
    buttonConfirm.className = 'delete-modal__button delete-modal__confirm-button';
    buttonConfirm.textContent = 'Удалить';

    deleteModal.append(textModalWindow, deleteButton);
    deleteButton.append(buttonCancel, buttonConfirm);

    return {
        buttonCancel, 
        buttonConfirm, 
        deleteModal, 
        firstModal
    };
}

let currentlyIdToDelete = null;
const {
    deleteModal, buttonCancel, buttonConfirm, firstModal,
} = createDeleteModal('Вы дейтсвительно хотите удалить ?');
document.body.prepend(firstModal);
buttonCancel.addEventListener('click', () => {
    firstModal.classList.add('modal-overlay_hidden');
  });
buttonConfirm.addEventListener('click', () => {
    const idTask = tasks.findIndex((task) => task.id === currentlyIdToDelete);
    if(idTask >= 0){
        tasks.splice(idTask, 1);
        const taskItemHTML = document.querySelector(`[data-task-id="${currentlyIdToDelete}"]`);
        taskItemHTML.remove();
        firstModal.classList.add('modal-overlay_hidden');
    }
});

const addDeleteToList = document.querySelector('.tasks-list');
addDeleteToList.addEventListener('click', (event) => {
    const { target } = event;
    const closestElement = target.closest('.task-item__delete-button');
    if(closestElement) {
        const closestTask = closestElement.closest('.task-item');
        if (closestTask) {
            const taskFindId = closestTask.dataset.taskId; 
            currentlyIdToDelete = taskFindId;
            firstModal.classList.remove('modal-overlay_hidden');
        }
    }
});


document.addEventListener('keydown', (event) => {
    console.log(event);
    const { key } = event;

    const allElementsTaskItem = document.querySelectorAll('.task-item');
    const deleteButtonsElements = document.querySelectorAll('button');

    if(key == "Tab"){
        console.log(document.body.style);
        if(!document.body.style.backgroundColor || document.body.style.backgroundColor == "initial"){
            document.body.style.backgroundColor = "#24292E";
            allElementsTaskItem.forEach((text) => {
                text.style.color = "#ffffff";
            });
            deleteButtonsElements.forEach((button) => {
                button.style.border = "1px solid #ffffff";
            });
        }
        else{
            document.body.style.backgroundColor = "initial";
            allElementsTaskItem.forEach((text) => {
                text.style.color = "initial";
            });
            deleteButtonsElements.forEach((button) => {
                button.style.border = "none";
            })
        }
    }
})
