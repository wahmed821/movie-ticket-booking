/*
Step 1: Get references to DOM elements
*/
// Get a reference to the main container
const container = document.querySelector(".container");

// Reference of all available seats
const seats = document.querySelectorAll(".row .seat:not(.sold)");

// Reference of the count and total elements
const count = document.getElementById("count");
const total = document.getElementById("total");

// Reference of the movie dropdown
const movieSelect = document.getElementById("movie");

/*
Step 2: Add event listeners
*/

// Event listner for movie selection change
movieSelect.addEventListener("change", e => {
  //Update ticket price and store selected movie data
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);

  // Update displayed count and total
  updateSelectedCount();
});

// Event listner for seat clicks
container.addEventListener("click", e => {
  // check if a seat is clicked and not sold
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    //Toggle seat selection
    e.target.classList.toggle("selected");

    // Update displayed count and total
    updateSelectedCount();
  }
});

/*
Step 3: Define funtion to update selected count and total
*/

function updateSelectedCount() {
  // Get all selected seats
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Get an array of selected seats's indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // Store selected seats index into local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  // Calculate selected seats and count
  const selectedSeatsCounts = selectedSeats.length;

  // Update UI with selected seats count and total price
  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

/*
Step 4: Define funtion to set selected movie data, in local storage
*/
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

/*
Step 5: Define funtion to populate UI with local storage data
*/
// Function to populate UI from local storage data

function populateUI() {
  // Get selected seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // If there are selected seats, mark them as selected in the UI
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  // Get selected movie data from local storage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  // If there's a selected movie index, then set it in the dropdown
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

/*
Step 6: Initial setup of count, total and UI based on save data
*/
populateUI();

// Initialize ticket price
let ticketPrice = +movieSelect.value;

updateSelectedCount();
