const form = document.getElementById('questions');
const addQ = document.querySelector('[data-role="add-q"]');
let questionCount = 0;
form.addEventListener('click', (event) => {
  if (event.target.dataset.role === 'add-c') addChoice(event);
  else if (event.target.dataset.role === 'add-q') addQuestion(event);
  else if (event.target.dataset.role === 'check') checkChoice(event);
});
addQ.click();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const formObj = {
    title: urlParams.get('title'),
    code: urlParams.get('code'),
    type: urlParams.get('type'),
    startDate: urlParams.get('start_d'),
    startTime: urlParams.get('start_t'),
    endDate: urlParams.get('end_d'),
    endTime: urlParams.get('end_t'),
    questions: questionsObj(),
  };
  fetch('api/addForm.php', {
    method: 'POST',
    body: JSON.stringify(formObj),
  })
    .then((res) => res.text())
    .then((text) => console.log(text));
});

function addQuestion(event) {
  event.preventDefault();
  const question = document.createElement('div');
  question.classList.add('border', 'rounded-4', 'p-3', 'mb-3', 'question');
  question.innerHTML = `
          <div class="mb-3 d-flex align-items-center gap-2 justify-content-center">
            <h5 class="m-0">${++questionCount}.</h5>
            <input type="text" class="form-control mx-auto" data-type="question" />
          </div>

          <div class="px-5 choices mb-2">
            <h6>Choices</h6>
            <button class="btn btn-secondary" data-role="add-c">Add choice</button>
          </div>
          <div class="d-flex align-items-center justify-content-center gap-2" style="width: 110px;">
            <h6 class="m-0">Grade</h6>
            <input type="number" class="form-control grade">
          </div>
        `;
  form.insertBefore(question, addQ);
  question.children[1].querySelector('[data-role="add-c"]').click();
  window.scrollTo(0, form.scrollHeight);
}

function addChoice(event) {
  event.preventDefault();
  const choice = document.createElement('div');
  choice.classList.add('choice', 'd-flex', 'mb-2');
  choice.innerHTML = `
              <input type="text" class="form-control" data-type="choice" style="padding-right:10px;"/>
              <button class="btn btn-secondary" style="margin-left:-10px;" data-role="check">
                <i class="bi bi-check2" data-role="check"></i>
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

function questionsObj() {
  //json array
  const questions = [];
  //get question elements
  document.querySelectorAll('.question').forEach((q) => {
    //get question
    const question = q.children[0].querySelector(
      '[data-type="question"]'
    ).value;
    const choices = [];
    //get choices
    q.children[1].querySelectorAll('.choice').forEach((c) => {
      const choice = c.querySelector('[data-type="choice"]').value;
      const isCorrect = c.querySelector('.btn-success') ? true : false;
      choices.push({ choice: choice, isCorrect: isCorrect });
    });
    const grade = parseInt(q.children[2].querySelector('.grade').value);
    questions.push({
      question: question,
      choices: choices,
      grade: grade,
    });
  });
  return questions;
}
