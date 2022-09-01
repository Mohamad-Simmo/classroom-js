const form = document.getElementById('questions');
const addQ = document.querySelector('[data-role="add-q"]');
let questionCount = 0;
form.addEventListener('click', (event) => {
  if (event.target.dataset.role === 'add-c') addChoice(event);
  else if (event.target.dataset.role === 'add-q') addQuestion(event);
  else if (event.target.dataset.role === 'check') checkChoice(event);
  else if (event.target.dataset.role === 'delete-choice') deleteChoice(event);
  else if (event.target.dataset.role === 'delete-q') deleteQuestion(event);
});
addQ.click();

form.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && event.target.nodeName === 'INPUT') {
    event.preventDefault();
    event.target.blur();
  }
});

//TODO: REDIRECT
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const questions = questionsObj();

  let error = false;
  let errMsg = [];
  if (!questions) {
    error = true;
    errMsg.push('*Every question must have a correct choice.');
  }
  if (updateGrade() !== 100) {
    error = true;
    errMsg.push('*Total grade should be equal to 100.');
  }

  if (!error) {
    const formObj = {
      title: urlParams.get('title'),
      code: urlParams.get('code'),
      type: urlParams.get('type'),
      startDate: urlParams.get('start_d'),
      startTime: urlParams.get('start_t'),
      endDate: urlParams.get('end_d'),
      endTime: urlParams.get('end_t'),
      questions: questions,
    };
    document.getElementById('error').innerText = '';
    fetch('api/addForm.php', {
      method: 'POST',
      body: JSON.stringify(formObj),
    }).then((window.location.href = './'));
  } else {
    document.getElementById('error').innerText = [...errMsg].join('\n');
  }
});

function addQuestion(event) {
  event.preventDefault();
  const question = document.createElement('div');
  question.classList.add('border', 'rounded-4', 'p-3', 'mb-3', 'question');
  question.innerHTML = `
          <div class="mb-3 d-flex align-items-center gap-3 justify-content-center">
            <h5 class="m-0 q-num">${++questionCount}.</h5>
            <input type="text" class="form-control mx-auto" data-type="question" required />
            <button class="btn btn-danger" data-role="delete-q">
              <i class="bi bi-trash3" data-role="delete-q"></i>
            </button>
          </div>

          <div class="px-5 choices mb-2">
            <h6>Choices</h6>
            <button class="btn btn-secondary" data-role="add-c">Add choice</button>
          </div>
          <div class="d-flex align-items-center justify-content-center gap-2 g-container" style="width: 30vw;">
            <h6 class="m-0">Grade</h6>
          </div>
        `;
  const gradeInput = document.createElement('input');
  gradeInput.setAttribute('type', 'number');
  gradeInput.setAttribute('required', '');
  gradeInput.setAttribute('min', 0);
  gradeInput.setAttribute('max', 100);
  gradeInput.classList.add('form-control', 'grade');
  gradeInput.value = 0;
  question.querySelector('.g-container').appendChild(gradeInput);

  gradeInput.addEventListener('change', () => {
    document.getElementById('totalGrade').innerText = updateGrade();
  });

  form.insertBefore(question, addQ);
  question.children[1].querySelector('[data-role="add-c"]').click();
  window.scrollTo(0, form.scrollHeight);
}

function addChoice(event) {
  event.preventDefault();
  const choice = document.createElement('div');
  choice.classList.add('choice', 'd-flex', 'mb-2');
  choice.innerHTML = `
              <input type="text" required class="form-control" data-type="choice" style="padding-right:10px;"/>
              <button class="btn btn-secondary" style="margin-left:-10px;" data-role="check">
                <i class="bi bi-check2" data-role="check"></i>
              </button>
              <button class="btn btn-danger ms-3" data-role="delete-choice">
                <i class="bi bi-trash3" data-role="delete-choice"></i>
              </button>
          `;
  event.target.parentElement.insertBefore(choice, event.target);
}

function checkChoice(event) {
  event.preventDefault();
  if (event.target.nodeName === 'I') {
    target = event.target.parentElement;
  } else {
    target = event.target;
  }
  const parent = target.closest('.choices');
  parent.querySelectorAll('.choice').forEach((c) => {
    if ((b = c.querySelector('.btn-success')))
      b.classList.replace('btn-success', 'btn-secondary');
  });
  target.classList.replace('btn-secondary', 'btn-success');
}

function deleteChoice(event) {
  event.preventDefault();
  if (event.target.nodeName === 'I') {
    target = event.target.parentElement;
  } else {
    target = event.target;
  }
  const parent = target.closest('.choice');
  parent.remove();
}

function deleteQuestion(event) {
  event.preventDefault();
  if (event.target.nodeName === 'I') {
    target = event.target.parentElement;
  } else {
    target = event.target;
  }
  const parent = target.closest('.question');
  parent.remove();
  questionCount--;
  document.getElementById('totalGrade').innerText = updateGrade();
  let renumber = 0;
  document.querySelectorAll('.q-num').forEach((el) => {
    el.innerText = `${++renumber}.`;
  });
}

function questionsObj() {
  //json array
  const questions = [];
  let error = false;
  //get question elements
  document.querySelectorAll('.question').forEach((q) => {
    //get question
    const question = q.children[0].querySelector(
      '[data-type="question"]'
    ).value;
    const choices = [];
    let hasCorrectChoice = false;
    //get choices
    q.children[1].querySelectorAll('.choice').forEach((c) => {
      const choice = c.querySelector('[data-type="choice"]').value;
      const isCorrect = c.querySelector('.btn-success') ? true : false;
      if (isCorrect) hasCorrectChoice = true;
      choices.push({ choice: choice, isCorrect: isCorrect });
    });
    if (!hasCorrectChoice) return (error = true);
    const grade = parseInt(q.children[2].querySelector('.grade').value);
    questions.push({
      question: question,
      choices: choices,
      grade: grade,
    });
  });
  if (!error) return questions;
  return false;
}

function updateGrade() {
  let totalGrade = 0;
  document.querySelectorAll('.grade').forEach((el) => {
    totalGrade += parseInt(el.value) ? parseInt(el.value) : 0;
  });
  const gradeEl = document.getElementById('grade-container');
  if (totalGrade > 100 || totalGrade < 0) {
    gradeEl.classList.add('text-danger');
    gradeEl.classList.remove('text-success');
  } else if (totalGrade === 100) {
    gradeEl.classList.remove('text-danger');
    gradeEl.classList.add('text-success');
  } else {
    gradeEl.classList.remove('text-danger');
    gradeEl.classList.remove('text-success');
  }
  return totalGrade;
}
