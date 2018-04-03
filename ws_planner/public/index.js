() => {
  'use strict';
  addItems();
};

/**
 * Sends a new plan to the server
 */
async function sendToAPI() {
  // If empty do nothing
  if (weekText.value === '') return;

  const opts = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      week: weekText.value,
      topic: topicId.value,
      note: noteId.value,
      resource: resourcesId.value
    })
  };
  // Handle request
  const response = await fetch('/api/plans', opts);
  const obj = await response.json();

  //Handle error if any
  if (obj.error) return console.log(obj.error);
}

/**
 * Fetches all plans from server
 */
async function addItems() {
  const response = await fetch('/api/plans');
  // Handle response
  const data = await response.json();
  empty();
  // Sends response to DOM
  sendPlansToDom(data);

  // Handle error
  if (data.error) return console.log(data.error);
}

/**
 * Removes plan from DOM after deleting
 */
function empty() {
  const plan = document.getElementsByClassName('planBlock');
  for (let i = 0; i < plan.length; i++) {
    plan[i].remove();
  }
}

/**
 * Gets a specific plan from the server and DOM.
 * @param {event} e
 */
async function getAPlan(e) {
  const item = e.target;
  const parent = e.target.parentNode;
  // Gets plan id
  const taskId = parseInt(item.getAttribute('data-id'));

  const response = await fetch(`api/plans/${taskId}`, { method: 'GET' });
  // Handle response
  if (response.ok) {
    empty();
    // Sends response to DOM
    sendPlansToDom(await response.json());
  } else {
    // Handle error if any
    console.error('error getting', response.status, response.statusText);
  }
}

/**
 * Deletes a specific plan from the server and DOM.
 * @param {event} e
 */
async function deletePlan(e) {
  const item = e.target;
  const parent = e.target.parentNode;
  // Gets plan id
  const taskId = parseInt(parent.getAttribute('data-id'));

  const response = await fetch(`api/plans/${taskId}`, { method: 'DELETE' });
  // Handle response
  if (response.ok) {
    // Remove item from DOM
    item.remove();
    empty();
  } else {
    // Handle error if any
    console.error('error getting', response.status, response.statusText);
  }
}

/**
 * Drag and drop functionality for plan block
 */
function dragNDrop() {
  const headLine = document.querySelector('#drop');
  const el = document.querySelectorAll('.planBlock');

  for (let i = 0; i < el.length; i++) {
    el[i].draggable = true;

    //  Add dragstart event
    el[i].addEventListener('dragstart', e => {
      e.dataTransfer.setData('text', e.target.id);
    });

    //  Add dragover event
    headLine.addEventListener('dragover', e => {
      e.preventDefault();
      e.target.style.display = 'yellow';
    });

    //  Add drop event
    headLine.addEventListener('drop', e => {
      e.preventDefault();
      const data = e.dataTransfer.getData('text');
      e.dataTransfer.dropEffect = 'move';
      e.target.appendChild(document.getElementById(data));
    });
  }
}

/**
 * Puts plan on the DOM
 * @param {object} plan JSON object being recieved from server
 */
function sendPlansToDom(plan) {
  for (let i = 0; i < plan.length; i++) {
    // Elements to create
    const div = document.createElement('div');
    const week = document.createElement('p');
    const topicHeader = document.createElement('p');
    const noteHeader = document.createElement('p');
    const resourceHeader = document.createElement('p');
    const topicUl = document.createElement('ul');
    const noteUl = document.createElement('ul');
    const resourceUl = document.createElement('ul');
    const resourceLi = document.createElement('li');
    const topicLi = document.createElement('li');
    const noteLi = document.createElement('li');

    // Creates delete buttton
    const remove = document.createElement('button');
    remove.innerHTML = 'X';
    remove.classList = 'remove';

    topicHeader.textContent = 'Topic';
    topicLi.textContent = plan[i].topic;
    topicLi.setAttribute('data-id', plan[i].id);
    topicLi.classList = 'drag';

    noteHeader.textContent = 'Notes';
    noteLi.textContent = plan[i].notes;

    resourceHeader.textContent = 'Resources';
    resourceLi.textContent = plan[i].resources;

    topicUl.appendChild(topicLi);
    noteUl.appendChild(noteLi);
    resourceUl.appendChild(resourceLi);

    week.textContent = plan[i].week;

    div.appendChild(remove);
    div.appendChild(week);
    div.appendChild(topicHeader);
    div.appendChild(topicUl);
    div.appendChild(noteHeader);
    div.appendChild(noteUl);
    div.appendChild(resourceHeader);
    div.appendChild(resourceUl);
    div.draggable = 'true';
    div.classList = 'planBlock';
    div.id = plan[i].id;
    div.setAttribute('data-id', plan[i].id);

    home.appendChild(div);
    // Call drag and drop on all plan blocks
    dragNDrop();

    // Add click event for deleting a plan
    const el = document.getElementsByClassName('remove');
    for (let i = 0; i < el.length; i++) {
      el[i].addEventListener('click', deletePlan);
    }
  }
}

function createInput() {
  // Elements to create
  const ul = document.createElement('ul');
  const topics = document.createElement('li');
  const notes = document.createElement('li');
  const resources = document.createElement('li');
  const inputTopic = document.createElement('input');
  const inputNotes = document.createElement('textarea');
  const inputResources = document.createElement('textarea');
  const week = document.createElement('li');
  const inputWeek = document.createElement('input');
  const btn = document.createElement('button');

  week.innerText = 'Week';
  week.className = 'blem';
  week.appendChild(inputWeek);
  ul.appendChild(week);
  week.style.display = 'grid';

  topics.innerText = 'Topics';
  topics.className = 'blem';
  topics.appendChild(inputTopic);
  ul.appendChild(topics);
  topics.style.display = 'grid';

  notes.innerText = 'Notes';
  notes.appendChild(inputNotes);
  ul.appendChild(notes);
  notes.style.display = 'grid';
  notes.className = 'blem';

  resources.innerText = 'Resources';
  resources.appendChild(inputResources);
  ul.appendChild(resources);
  resources.className = 'blem';

  inputTopic.id = 'topicId';
  inputNotes.id = 'noteId';
  inputResources.id = 'resourcesId';
  inputWeek.id = 'weekText';
  ul.id = 'mainCard';
  ul.classList = 'list';
  add.appendChild(ul);

  btn.textContent = 'add';
  btn.id = 'addBtn';
  ul.appendChild(btn);

  // Remove event listener from button
  addPlan.removeEventListener('click', createInput);

  // Add click event for adding a plan
  addBtn.addEventListener('click', () => {
    sendToAPI();
    empty();
    addItems();
    add.removeChild(mainCard);

    // Add event listener for creating new plan
    addPlan.addEventListener('click', createInput);
  });
}

// EVENT HANDLERS

// Creates input for adding a plan
addPlan.addEventListener('click', createInput);

// Displays and closes main screen
document.getElementsByClassName('rtnBtn')[0].addEventListener('click', () => {
  const picker = document.getElementById('picker');
  const panel = document.getElementById('open');
  if (panel.style.display == 'grid') {
    panel.style.display = 'none';
    picker.style.display = 'block';
  } else {
    panel.style.display = 'grid';
    picker.style.display = 'block';
  }
});

// Brings back screen to homepage
document.getElementById('backBtn').addEventListener('click', () => {
  const picker = document.getElementById('picker');
  const board = document.getElementById('drawboard');
  if (board.style.display == 'block') {
    board.style.display = 'none';
    picker.style.display = 'block';
  } else {
    board.style.display = 'none';
    picker.style.display = 'block';
  }
});

// Displays create plan page
document.getElementsByClassName('mainBtn')[0].addEventListener('click', () => {
  empty();
  addItems();
  const picker = document.getElementById('picker');
  const panel = document.getElementById('open');
  if (panel.style.display == 'grid') {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'grid';
    picker.style.display = 'none';
  }

  // Add click event for deleting a plan
  const el = document.getElementsByClassName('remove');
  for (let i = 0; i < el.length; i++) {
    el[i].addEventListener('click', deletePlan);
  }
});

// Brings up whiteboard page
document.getElementById('boardBtn').addEventListener('click', () => {
  const picker = document.getElementById('picker');
  const panel = document.getElementById('drawboard');
  if (panel.style.display === 'block') {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'block';
    picker.style.display = 'none';
  }
});

// Pops chat window
window.chat.addEventListener('click', () => {
  const chat = document.getElementsByClassName('io')[0];
  if (chat.style.display === 'block') chat.style.display = 'none';
  else chat.style.display = 'block';
});
