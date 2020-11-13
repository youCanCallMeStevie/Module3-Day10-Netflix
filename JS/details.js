const url = "https://striveschool-api.herokuapp.com/api/movies/";

const productList = document.querySelector("#product-list");


window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");

  try {
    let response = await fetch(url + id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRkMjRiY2RlMTAwMTc2MTZhODMiLCJpYXQiOjE2MDUwOTI1NjIsImV4cCI6MTYwNjMwMjE2Mn0.arJqVkpzT0MeHAgQP3AYhkG9rGTJHbVwdiXIuPiok20",
      },
    });

    let movie = await response.json(); // transforming the response body in an usable object, asyncronous operation!
    let element = document.createElement("p");
          element.innerHTML = `${movie.name} : ${movie.description}`;

          document.querySelector("#details").appendChild(element);
        } catch (error) {
          //   alert("Something went wrong");
          console.log(error);
        }
      };

const handleDelete = async () => {
  try {
    const response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRkMjRiY2RlMTAwMTc2MTZhODMiLCJpYXQiOjE2MDUwOTI1NjIsImV4cCI6MTYwNjMwMjE2Mn0.arJqVkpzT0MeHAgQP3AYhkG9rGTJHbVwdiXIuPiok20",
      },
    });

    if (response.ok) {
      // checking the ok property which stores the successful result of the operation
      alert("Product deleted successfully");
      location.assign("index.html");
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleEdit = () => {
  window.location.href = "backoffice.html?id=" + id;
};