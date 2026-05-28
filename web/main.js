console.log("Community Portal Loaded");


class Event {
  constructor(name, category, seats) {
    this.name = name;
    this.category = category;
    this.seats = seats;
  }
}

let events = [
  new Event("Music Fest", "Music", 5),
  new Event("Dance Show", "Music", 2)
];


function showEvents(list = events) {
  let container = document.getElementById("events");
  container.innerHTML = "";

  list.forEach(e => {
    if (e.seats > 0) {
      container.innerHTML += `
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
  let event = events.find(e => e.name === name);

  if (event.seats > 0) {
    event.seats--;
    alert("Registered Successfully");
    showEvents();
  } else {
    alert("No Seats Available");
  }
}

document.getElementById("filter").onchange = function () {
  if (this.value === "All") {
    showEvents();
  } else {
    let filtered = events.filter(e => e.category === this.value);
    showEvents(filtered);
  }
};


document.getElementById("search").onkeyup = function () {
  let text = this.value.toLowerCase();

  let filtered = events.filter(e =>
    e.name.toLowerCase().includes(text)
  );

  showEvents(filtered);
};

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  if (name === "" || email === "") {
    alert("Fill all fields");
    return;
  }

  alert("Registration Sent");
});