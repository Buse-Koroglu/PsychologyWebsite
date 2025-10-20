function toggleTheme() {
    var body = document.body;
    var navbar = document.querySelector(".navbar");
    body.classList.toggle("dark-mode");
    navbar.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

function menuBar(){
 const menu = document.getElementById('menu');
 menu.classList.toggle("show");
 document.body.classList.toggle("menu-open");
}

function handleMenu() {
  const menu = document.getElementById("menu");

  if (window.innerWidth > 1287 && menu.classList.contains("show")) {
    menu.classList.remove("show");
    document.body.classList.remove("menu-open");
  }

  if (window.innerWidth <= 936) {
  const navLinks = document.querySelectorAll(".nav-links li");
    const iconMenu = document.querySelector("#menu .icons");

    if (iconMenu.dataset.filled !== "true") {
      const fragment = document.createDocumentFragment();

      navLinks.forEach(li => {
        const clone = li.cloneNode(true);

        const link = clone.querySelector("a, button");

        if (link) {
          const icon = document.createElement("i");
          icon.className ="ri-arrow-right-s-line";
          icon.style.marginRight = "5px"; 

          link.prepend(icon);
        }

        fragment.appendChild(clone);
      });

      iconMenu.insertBefore(fragment, iconMenu.firstChild);
      iconMenu.dataset.filled = "true";
    }
  }
};

window.addEventListener("resize", handleMenu);

window.addEventListener("DOMContentLoaded", function () {
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector(".navbar").classList.add("dark-mode");
    }
    handleMenu();
});
 

document.addEventListener("DOMContentLoaded", async () => {

  const testNum = 2;
  const res = await fetch(`/tests/${testNum}`);
  if (!res.ok) {
    console.error("Test bulunamadı:", res.status);
    return;
  }
  const testOkb = await res.json();

  document.getElementById("title").textContent = testOkb.title;
  document.getElementById("description").textContent = testOkb.description;

  const container = document.getElementById("question-container");

  testOkb.questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-block");

    const question = document.createElement("p");
    question.textContent = `${index + 1}) ${q.content}`;
    questionDiv.appendChild(question);

    const rangeBar = document.createElement("input");
    rangeBar.type = "range";
    rangeBar.min = 0;
    rangeBar.max = q.options.length-1;
    rangeBar.step = 1;
    rangeBar.value = 0;
    rangeBar.name = `q${q.id}`;
    questionDiv.appendChild(rangeBar);

    const scale = document.createElement("ul");

    q.options.forEach((opt)=>{
      const li = document.createElement("li");
      li.textContent = opt.value;
      scale.appendChild(li);
    });

    questionDiv.appendChild(scale);
    container.appendChild(questionDiv);
  });
});


const form = document.getElementById("testForm");

form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  try {   
  const allAnswers = document.querySelectorAll("input[type='range']");
  let score=0;
  allAnswers.forEach(input =>{
    const value = parseInt(input.value);
    score+=value;
  });

  let resultId;
  if(score<=15){
    resultId = 7;
  }
  else if(score<=30){
    resultId = 8;
  }
  else if(score<=45){
    resultId = 9;
  }
  else{
    resultId =10;
  }
    const res = await fetch(`/results/${resultId}`);
    const data = await res.json();
    document.getElementById("result").innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.description}</p>
    `;

  } catch (error) {
    console.log(error);
  }
}


);