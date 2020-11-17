const url = "https://striveschool-api.herokuapp.com/api/movies/";
const header = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRkMjRiY2RlMTAwMTc2MTZhODMiLCJpYXQiOjE2MDUwOTI1NjIsImV4cCI6MTYwNjMwMjE2Mn0.arJqVkpzT0MeHAgQP3AYhkG9rGTJHbVwdiXIuPiok20"

window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");
  if (id) {
    let response = await fetch(url + id, {
      method: "GET",
      headers: {
        Authorization:
          header,
          "Content-Type": "application/json",
        },
    });
    // contacting the endpoint for a single event
    let movie = await response.json(); // transforming the response body in an usable object, asyncronous operation!
    console.log(movie);
    document.getElementById("name").value = movie.name;
    document.getElementById("description").value = movie.description;
    document.getElementById("categories").value = movie.category;
    document.getElementById("imageUrl").value = movie.imageUrl;
  }
};
const handleSubmit = (e) => {
  e.preventDefault(); // preventing the default browser event handling
  submitMovie(); //
};

const submitMovie = async () => {
  let spinner = document.querySelector("#loadingSpinner");
  spinner.classList.toggle("d-none"); // showing the spinner
  let newMovie = {
    // gathering the data from the form, field by field
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    category: document.querySelector("#categories").value,
    imageUrl: document.querySelector("#imageUrl").value,
  };

  try {
    let response;

    if (id) {
      response = await fetch(url + id + category, {
        method: "PUT", 
        body: JSON.stringify(newMovie), // we need to stringify the JS object in order to send it
        headers: new Headers({
          // we need also to declare the content type
          Authorization:
          header,
          "Content-Type": "application/json",
        }),
      });
    } else {
      response = await fetch(url, {
        method: "POST", 
        body: JSON.stringify(newMovie), // we need to stringify the JS object in order to send it
        headers: new Headers({
          // we need also to declare the content type
          Authorization:
         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRkMjRiY2RlMTAwMTc2MTZhODMiLCJpYXQiOjE2MDUwOTI1NjIsImV4cCI6MTYwNjMwMjE2Mn0.arJqVkpzT0MeHAgQP3AYhkG9rGTJHbVwdiXIuPiok20",
          "Content-Type": "application/json",
        }),
      });
    }

    if (response.ok) {
      // checking the ok property which stores the successful result of the operation
      spinner.classList.toggle("d-none"); // hiding the spinner
      alert(`Movie ${id ? "updated" : "created"} successfully`);
      location.assign("index.html");
    } else {
      spinner.classList.toggle("d-none"); // hiding the spinner
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};