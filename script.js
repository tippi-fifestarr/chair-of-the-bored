const stinkyStuff = [
  {
    name: 'name',
    cause:'cause'
  },
  {
    name: 'concept',
    cause:'create'
  },
  {
    name: 'tippi-fifestarr_presents',
    cause: 'Creative Artist DJ Academy America (now with 5% science!) <br> subtitle- Culture Art Music - Malvern Online Course Winter 2020'
  }
]

const inputTitle = document.querySelector('.firstInput')
const inputReps = document.querySelector('.secondInput')
const mainDiv = document.querySelector('.content-container')


mainDiv.appendChild(createUl('firstList', 'BEFORE'))  //add first section so we can populate it with items
const firstList = document.querySelector('.firstList')  //

for(i=0;i<stinkyStuff.length;i++){  //add all the objects to section
  firstList.appendChild(createLi(stinkyStuff[i]))
  document.querySelector(`#${stinkyStuff[i].name}`).addEventListener('click', e => deleteItem(e))
}
mainDiv.appendChild(createUl('doing-list', 'DOING')) //create new section
mainDiv.appendChild(createUl('finished-list', 'FINISHED')) //again


function createLi(data){
  let li = document.createElement('li')
  li.draggable = 'true'
  li.addEventListener('dragstart', e => taskDrag(e), false)
  li.innerHTML = `
    <p>Concept: ${data.name}</p>
    <p>Create: ${data.cause}</p>
    <button id=${data.name} class="removeItemBtn">DELETE</button>
  `
  li.classList.add('card')
  li.id = data.name
  return li
}

function taskDrag(e){
  e.dataTransfer.setData("elementid", e.target.id)
}

function createUl(cl, title){
  let ul = document.createElement('ul')
  ul.innerHTML = `<h2 class="ul-header">${title}</h2>`
  ul.className = `dropzone ${cl}`
  ul.addEventListener("dragenter", e => ulDragEnter(e), false)
  ul.addEventListener("dragleave", e => ulDragLeave(e), false)
  ul.addEventListener("dragover", e => ulDragOver(e), false)
  ul.addEventListener("drop", e => itemDrop(e, this), false)
  return ul
}

function ulDragEnter(e){
  if(e.target.classList.contains("dropzone")){
    e.target.classList.add("highlight")
  }
}
function ulDragLeave(e){
  if(e.target.classList.contains("dropzone")){
    e.target.classList.remove("highlight")
  }
}
function ulDragOver(e){
  e.preventDefault()
}
function itemDrop(e){
  if(e.target.classList.contains('dropzone')){
    e.target.classList.remove("highlight")
    let listItem = document.getElementById(e.dataTransfer.getData("elementid"))
    e.target.appendChild(listItem)
  }
}

function inputNewItem(){
  const newItem = {
    name: inputTitle.value,
    cause: inputReps.value
  }
  firstList.appendChild(createLi(newItem))
}

function deleteItem(e){
  e.target.remove()
  console.log('e', e.target)
}

document.querySelectorAll('.removeItemBtn').forEach(item => item.addEventListener('click', e => deleteItem(e)))
