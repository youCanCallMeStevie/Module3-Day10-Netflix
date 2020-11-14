const productResults = document.querySelector(".container-products");

renderProducts = (products) => {
  products.forEach((movie) => {
    let listItem = document.createElement("div");
    listItem.classList.add("col");
    listItem.classList.add("mr-3");
    listItem.classList.add("mb-3");
    listItem.classList.add("product-card");
    listItem.classList.add("card");
    listItem.classList.add("trending");

    listItem.innerHTML = `<img src="${movie.imageUrl}" style="height:250px;"/>
                    <div class="card-body" style="height: 200px; overflow-y: auto">
                        
                      <div>
                        <div><h6 class ="movie-name">${movie.name}</h6></div>
                        <div><p>${movie.description}</p></div>
                        <div><h6 class ="movie-category">${
                          movie.category
                        }</h6></div>
                      </div>
                        
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <a class="btn btn-info btn-danger" href="details.html?id=${
                            movie._id
                          }">VIEW DETAILS</a>
                        </div>

                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary btnHide" onclick="hideToggle()"
                        >Hide
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-danger onclick=""
                        >
                        <span><i class="far fa-play-circle"></i></i></span>
                        </button>
                        </div>
                        <small class="text-muted">Add on ${
                          movie.createdAt.split("T")[0]
                        }
                        </small>

                    </div>
                    </div>`;
    productList.appendChild(listItem);
  });
};

const productList = document.querySelector("#product-list");

let productLibrary = [];

const clearContainer = (productList) => {
  //use function for new data
  productResults.innerHTML = "";
  // productResults.querySelectorAll("*").forEach((node) => node.remove()); //same as above
};

let category = document
  .querySelector("#category")
  .addEventListener("change", () => {
    getProducts(document.querySelector("#category").value);
  });

const getProducts = async (category) => {
  const url = "https://striveschool-api.herokuapp.com/api/movies/" + category;
  try {
    productLibrary = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRkMjRiY2RlMTAwMTc2MTZhODMiLCJpYXQiOjE2MDUwOTI1NjIsImV4cCI6MTYwNjMwMjE2Mn0.arJqVkpzT0MeHAgQP3AYhkG9rGTJHbVwdiXIuPiok20",
      },
    }).then((res) => res.json());
    console.log(productLibrary);

    renderProducts(productLibrary);
  } catch (error) {
    console.log(error);
  }
};

const input = document.querySelector(".form-control");

const handleProductSearch = () => {
  const filteredList = productLibrary.filter((item) =>
    item.name.toLowerCase().includes(input.value.toLowerCase())
  );
  clearContainer();
  renderProducts(filteredList);
};

const searchButton = document.querySelector(".search-btn");
searchButton.addEventListener("click", () => handleProductSearch());
input.addEventListener("keyup", () => handleProductSearch());

const hideToggle = () => {
  let allCards = document.querySelectorAll(".product-card");
  let btnsHide = document.querySelectorAll(".btnHide");
  for (let i = 0; i < btnsHide.length; i++) {
    btnsHide[i].onclick = function () {
      allCards[i].style.display = "none";
    };
  }
};

window.onload = async () => {
  getProducts();
};
