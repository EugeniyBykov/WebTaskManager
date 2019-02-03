let tasks = document.getElementById('taskCount'); 
let done = document.getElementById('doneCount'); 
let fail = document.getElementById('failedCount'); 

let inpField = document.getElementById('inpField'); 
let taskText;

let acceptDiv = document.getElementById('acceptDiv'); 
let date;  
let taskCount = 0; 
let doneCount = 0; 
let failedCount = 0;

acceptDiv.addEventListener('click', addNewTask); 


function addNewTask(event) {
	let text = inpField.value;
	date = new Date();
	let year = date.getFullYear(); 
	let month = date.getMonth() + 1; 
	let day = date.getDate(); 
	let hour = date.getHours(); 
	let minutes = date.getMinutes();



	let newTask = document.createElement('div'); 
	newTask.innerHTML = `<div class="task d-flex justify-content-between align-items-center">
	<div class="circle red d-flex justify-content-center align-items-center done">
		<i class="fas fa-check done"></i>
	</div>
	<p class="mb-0 text-center">${year}.${month}.${day}<br>${hour}:${minutes}</p> 
	<p id="ttt" class="task-input mb-0" contenteditable="false">${text}</p>
	<div class="circle red ml-0 d-flex justify-content-center align-items-center edit remov">
			<i class="fas fa-pencil-alt edit"></i> 
	</div>
	<div class="circle red d-flex ml-0 justify-content-center align-items-center del">
			<i class="fas fa-shopping-basket del"></i>
	</div>
</div>`

newTask.setAttribute('data', taskCount); 
document.body.appendChild(newTask); 
newTask.addEventListener('click', taskDone); 

let arr = newTask.querySelectorAll('.edit'); 
for (let it of arr) {
	it.style.backgroundColor = 'red';
}
 
let str = tasks.innerHTML.replace(taskCount, ++taskCount);
tasks.innerHTML = str; 


taskText = newTask.querySelector('.task-input'); 
taskText.addEventListener('keypress', textEdit);
	
}



function textEdit(event) {
	let str = taskText.innerHTML; 
	console.log(str.length);
	if (str.length >= 34 && event.keyCode !== 8) {
	alert('Достигнуто максимальное количество символов');
	event.preventDefault(); 
	}
	


}

function taskDone(event) {

	if (event.target.classList.contains('done'))
	{
			event.target.style.backgroundColor = 'green';
			if (event.target.parentNode.classList.contains('done'))
			{
				event.target.parentNode.style.backgroundColor = 'green';
			}
		if (document.getElementsByClassName('task')[this.getAttribute('data')].style.backgroundColor != "lightgreen"){
		let str = done.innerHTML.replace(doneCount, ++doneCount);
		done.innerHTML = str;
		}
		document.getElementsByClassName('task')[this.getAttribute('data')].style.backgroundColor = "lightgreen";
		document.getElementsByClassName('task-input')[this.getAttribute('data')].setAttribute('contenteditable', false);
		let editArr = event.currentTarget.getElementsByClassName('edit'); 
		editArr[0].style.backgroundColor = 'red'; 
		editArr[1].style.backgroundColor = 'red'; 
		editArr[1].classList.remove('fa-check'); 
		editArr[1].classList.add('fa-pencil-alt'); 
	}
	


	if (event.target.classList.contains('edit')) {
		if (event.target.style.backgroundColor === "red" )
		{
			if (event.target.classList.contains('fas') )
			{
				event.target.parentNode.style.backgroundColor = 'lightgreen';
				event.target.style.backgroundColor = 'lightgreen';
				event.target.classList.remove('fa-pencil-alt');
				event.target.classList.add('fa-check'); 
			}
			else 
			{
				event.target.childNodes[1].style.backgroundColor = 'lightgreen';
				event.target.childNodes[1].classList.remove('fa-pencil-alt'); 
				event.target.childNodes[1].classList.add('fa-check');  
			}

			
			event.target.style.backgroundColor = 'lightgreen';
			document.getElementsByClassName('task-input')[this.getAttribute('data')].setAttribute('contenteditable', true); 
			document.getElementsByClassName('task-input')[this.getAttribute('data')].focus(); 
		}
		else 
		{
			if (event.target.classList.contains('fas') )
			{
				event.target.parentNode.style.backgroundColor = 'red';
				event.target.style.backgroundColor = 'red';
				event.target.classList.remove('fa-check'); 
				event.target.classList.add('fa-pencil-alt');
				
			}
			else 
			{
				event.target.childNodes[1].style.backgroundColor = 'red';
				event.target.childNodes[1].classList.remove('fa-check'); 
				event.target.childNodes[1].classList.add('fa-pencil-alt'); 
			}


			event.target.style.backgroundColor = 'red';
			document.getElementsByClassName('task-input')[this.getAttribute('data')].setAttribute('contenteditable', false); 
 
		}
	
	}

	if (event.target.classList.contains('del'))
	{
		document.body.removeChild(event.currentTarget); 
		let str = fail.innerHTML.replace(failedCount, ++failedCount);
		fail.innerHTML = str;

		let tasksArr = Array.from(document.getElementsByClassName('task'));	
		let t = tasksArr.filter( item => item.parentNode.getAttribute('data') > event.currentTarget.getAttribute('data'));
		let c; 
		for (let i = 0; i < t.length; i++) {
			if (i == 0) { c = t[i].parentNode.getAttribute('data') - 1}
			t[i].parentNode.setAttribute('data', c++); 
		}

		str = tasks.innerHTML.replace(taskCount, --taskCount);
		tasks.innerHTML = str; 


	}

	
}		

let loc; 



window.onbeforeunload = function(){
	let tasksArr = Array.from(document.getElementsByClassName('task'));	

	let c = [doneCount, failedCount]; 
	let a = []; 
	for (let i = 0; i < tasksArr.length; i++) {
		a.push(tasksArr[i].parentNode.innerHTML); 
	}

	// a = a.push(tasksArr[0].innerHTML); 
	c = JSON.stringify(c); 
	localStorage.setItem('counts', c); 
	let saveArr = JSON.stringify(a); 
	localStorage.setItem('arr', saveArr);
}

window.onload = function() {
	let loadArr = localStorage.getItem('arr'); 
	let tasksArr = JSON.parse(loadArr); 

	for (let i = 0; i < tasksArr.length; i++) {
		 console.log(tasksArr[i]);
		 let newTask = document.createElement('div'); 
		 newTask.innerHTML = tasksArr[i]; 
		 newTask.setAttribute('data', taskCount); 
		 document.body.appendChild(newTask); 
		 newTask.addEventListener('click', taskDone); 

		 taskCount++; 
	}

		let c = localStorage.getItem('counts');
		c = JSON.parse(c); 

		doneCount = c[0]; 
		failedCount = c[1]; 

		let str = done.innerHTML.replace(0, c[0]);
		done.innerHTML = str;

		str = tasks.innerHTML.replace(0, taskCount);
		tasks.innerHTML = str; 

	    str = fail.innerHTML.replace(0, c[1]);
		fail.innerHTML = str;


}


//localStorage.clear(); 




