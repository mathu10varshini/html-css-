
console.log("Welcome to Community Portal");

window.onload = () => alert("Page Loaded");


const portalName = "Community Portal";
let seatsLeft = 5;
console.log(`${portalName}`);


class Event {
  constructor(name, category, seats) {
    this.name = name;
    this.category = category;
    this.seats = seats;
  }
}

Event.prototype.check = function () {
  return this.seats > 0;
};


let events = [
  new Event("Music Fest", "Music", 5),
  new Event("Dance Show", "Music", 2)
];

function tracker() {
  let count = 0;
  return () => {
    count++;
    console.log("Registrations:", count);
  };
}
const track = tracker();


function showEvents(list = events) {
  let box = document.getElementById("events");
  box.innerHTML = "";

  list.forEach(e => {
    if (e.check()) {
      box.innerHTML += `
        <div class="card">
          <h3>${e.name}</h3>
          <p>${e.category}</p>
          <p>Seats: ${e.seats}</p>
          <button onclick="register('${e.name}')">Register</button>
        </div>
      `;
    }
  });
}

showEvents();

function register(name) {
  try {
    let event = events.find(e => e.name === name);

    if (!event || event.seats <= 0) throw "No Seats";

    event.seats--;
    track();
    showEvents();

  } catch (err) {
    console.log(err);
  }
}

document.getElementById("filter").onchange = function () {
  showEvents(
    this.value === "All"
      ? events
      : events.filter(e => e.category === this.value)
  );
};

document.getElementById("search").onkeyup = function () {
  let val = this.value.toLowerCase();
  showEvents(events.filter(e =>
    e.name.toLowerCase().includes(val)
  ));
};

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Fill all fields");
    return;
  }

  sendData({ name, email });
});


function sendData(data) {
  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => alert("Registration Success"))
      .catch(() => alert("Error"));
  }, 1000);
}

async function loadData() {
  let res = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data = await res.json();
  console.log("Async Data", data);
}
loadData();


function greet(name = "Guest") {
  console.log("Hello", name);
}
greet();

let [first] = events;
console.log(first);

let copy = [...events];
console.log(copy);


$("#filter").click(function () {
  $(".card").fadeOut(200).fadeIn(200);
});


console.log("Step 1 complete");
console.log("Step 2 complete");