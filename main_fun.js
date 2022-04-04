//--------hobie 

//TODO hobie - storage: edit and delete

//--------jam
//TODO bind events to new divs
//TODO scroll within the list 
//TODO isotope filtering (sort by category)
//TODO > circle > loading when create task

var data = (localStorage.getItem('Note-ify_data')) ? JSON.parse(localStorage.getItem('Note-ify_data')):{
   tasks: []
};

//localStorage.clear();

//console.log(data);

renderTodoList();

// -----------------------------Getting the date
const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];
const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

const n = new Date();
const m = n.getMonth();
const d = n.getDate();
const x = n.getDay();

document.getElementById("date").innerHTML = `${months[m]} ${d}`;
document.getElementById("day").innerHTML = `${week[x]}, `;

// -----------------------------Show/Hide Elements
const div_newItem = document.getElementById("new_item");
const div_itemDetail = document.getElementById("item_detail");
const div_newTag = document.getElementById("new_tag");

$("#btn_newtask, .edit").click(function(){
   $("#new_item").fadeIn();
   $("#new_tag").fadeOut();
   $("#item_detail").fadeOut();
   div_newItem.style.display = "grid";
   div_itemDetail.style.display = "none";
   div_newTag.style.display = "none";
})

$(".task_item").click(function() {
   $("#item_detail").fadeIn();
   $("#new_tag").fadeOut();
   $("#new_item").fadeOut();
   div_newItem.style.display = "none";
   div_itemDetail.style.display = "grid";
   div_newTag.style.display = "none";
})

$("#btn_newtag").click(function() {
   $("#new_tag").fadeIn();
   $("#new_item").fadeOut();
   $("#item_detail").fadeOut();
   div_newItem.style.display = "none";
   div_itemDetail.style.display = "none";
   div_newTag.style.display = "grid";
})

$(".back, #btn_create, #btn_complete").click(function(){
   document.querySelector("#anchor_home").scrollIntoView();
   $(".fade").fadeOut();
})

$(".goto_float, .task_item").click(function(){
   document.querySelector("#anchor_floating").scrollIntoView();
})

//for dynamically generated divs
$("#task_list_today").on("click", ".task_item", function(){
   document.querySelector("#anchor_floating").scrollIntoView();
})

//--------------------------------Adding task
window.addEventListener("load", () => {
   //----getting the data from the input form
   const form = document.querySelector("#form_newtask");
   const title = document.querySelector("#inp_title");
   const dateInp = document.querySelector("#inp_date");
         categories = document.getElementById("category").value;
   //----adding the data to the storage
   form.addEventListener("submit", (e) => {
      e.preventDefault();

      const task = title.value;
      const dateValue = dateInp.value;

      let dataValue = {
         Title: task, 
         Date: dateValue,
         Category: categories, 
      };

      if (!task) {
         alert("Please input a task");
         return;
      }

      location.reload();
      showTasks(dataValue);
      data.tasks.push(dataValue);
      dataObjectUpdated();
      document.getElementById("inp_title").value=""; //reset the value of input 
   });
});
//--------------------------------Updating the storage "Note-ify"
function dataObjectUpdated (){
   localStorage.setItem("Note-ify_data", JSON.stringify(data));
}
//--------------------------------Creating divs and displaying task
function showTasks({Title: task, Date: dataValue}) {
   const tasks = document.querySelector("#task_list_today");//list_el

   const task_el = document.createElement("div");
      task_el.classList.add("task_item");

         const task_circle = document.createElement("span");
         task_circle.classList.add("circle");
         task_el.appendChild(task_circle);

         const task_title = document.createElement("span");
         task_title.classList.add("title");
         task_title.innerHTML = task;
         task_el.appendChild(task_title);

         const task_date = document.createElement("span");
         task_date.classList.add("date");
         let dateObj = new Date(dateValue);
         let FormattedDate = dateObj.toLocaleString("en-US", {
            month: "long", 
            day: "numeric"
         });
         task_date.innerHTML = FormattedDate;
         task_el.appendChild(task_date);

      tasks.appendChild(task_el);
}
//------------------------------rendering the array in the local storage
function renderTodoList() {
   if (!data.tasks.length) return;

   for (var i = 0; i < data.tasks.length; i++) {
      var value = data.tasks[i];
      showTasks(value);
   }
 }

//-------------------------------FOR SHOWING TO THE DETAILS PANE
$(".task_item").click(function(){
   title = $(this).find(".title").html();
   date = $(this).find(".date").html();
   console.log(title);
   console.log(date);

   $("#item_detail > .title").html(title);
   $("#item_detail > .date").html(date);
})
