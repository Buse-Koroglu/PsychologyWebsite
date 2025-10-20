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


let testData; 


document.addEventListener("DOMContentLoaded", async()=>{

  const testId =  1;
  const res = await fetch(`/tests/${testId}`);
  testData = await res.json();

  document.getElementById("title").textContent = testData.title;
  document.getElementById("description").textContent= testData.description;

    const container = document.getElementById("question-container");
    testData.questions.forEach(q => {
    const questionDiv = document.createElement("div");
    questionDiv.setAttribute("category",q.category);
    const question = document.createElement("p");
    question.classList.add("question");
    if(q.id===2){
       question.innerHTML = `<p>${q.id}) ${q.content}.</p>`;
    }
    else{
       question.innerHTML = `<p>${q.id}) ${q.content}</p>`;
    }
    questionDiv.appendChild(question);
    
    q.options.forEach(opt => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${q.id}`;
      input.value = opt.value;
      input.id = `opt${opt.id}`;

      if(opt.content === "Evet") input.classList.add("evet");
      if(opt.content === "Hayır") input.classList.add("hayir");

      const label = document.createElement("label");
      label.htmlFor = `opt${opt.id}`;
      label.textContent = opt.content;

      questionDiv.appendChild(input);
      questionDiv.appendChild(label);

    });
   container.appendChild(questionDiv);

  });


}) ;

document.getElementById("testForm").addEventListener('submit',async(e)=>{
  e.preventDefault();
  const allAnswers = document.querySelectorAll("input[type='radio']:checked") ;

  if(allAnswers.length<30){
    alert("Lütfen tüm soruları cevaplayınız!");
    return;
  }


 const categories = [
  {type:"guvenli",count:0},
   {type:"kacingan",count:0},
   {type:"kaygili",count:0} ];
  
 

 allAnswers.forEach(input =>{
  const value = parseInt(input.value);
  const question = input.closest("div");
  const category = question.getAttribute("category");

    categories.forEach(element=>{
      if(category==element.type){
        element.count += value;
      }
    })  ;
 });
  
 try {
  
  let resultId;

  if(categories[0].count>categories[1].count && categories[0].count>categories[2].count){
    resultId = 1;
  }
  else if(categories[1].count>categories[0].count && categories[1].count>categories[2].count){
    resultId = 3;
  }
  else if(categories[2].count>categories[0].count && categories[2].count>categories[1].count){
    resultId = 2;
  }
  else if(categories[0].count === categories[1].count){
     resultId= 4;
  }
  else if(categories[1].count === categories[2].count){
      resultId =6;
  }
  else if(categories[0].count === categories[2].count){
    resultId=5;
  }

  fetch(`/results/${resultId}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.description}</p>
    `;
  });

 } catch (error) {
   console.log(error);
 }

}
);