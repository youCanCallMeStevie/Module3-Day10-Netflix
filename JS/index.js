const productResults = document.querySelector(".container-products");

      renderProducts = (products) => {
        products.forEach((e) => {
          let listItem = document.createElement("div");
          listItem.classList.add("col-md-4");
          listItem.classList.add("product-card");
          listItem.innerHTML = `<img src="${e.imageUrl}" style="height:200px;"/>
                    <div class="card-body" style="height: 400px; overflow-y: auto">
                        <p class="card-text">
                      <div>
                        <div><h6 class ="product-name">${e.name}</h6></div>
                        <div>${e.description}</div>
                        <div><h6 class ="product-price">${e.category}</h6></div>
                      </div>
                        </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <a class="btn btn-info" href="detail.html?id=${
                            e._id
                          }">VIEW DETAILS</a>
                        </div>

                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary btnHide" onclick="hideToggle()"
                        >Hide
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary onclick=""
                        >
                        <span><i class="far fa-play-circle"></i></i></span>
                        </button>
                        </div>
                        <small class="text-muted">Add on ${
                          e.createdAt.split("T")[0]
                        }</small>

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

      const getProducts = async () => {
        const url = "https://striveschool-api.herokuapp.com/api/movies/";
        try {
          productLibrary = await fetch(url, {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzRkMjRiY2RlMTAwMTc2MTZhODMiLCJpYXQiOjE2MDUwOTI1NjIsImV4cCI6MTYwNjMwMjE2Mn0.arJqVkpzT0MeHAgQP3AYhkG9rGTJHbVwdiXIuPiok20",
            },
          }).then((res) => res.json());
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