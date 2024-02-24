
const reviewForm = document.getElementById("review-form");
const productList = document.getElementById("product-list");
reviewForm.addEventListener("submit",  (event)=> {
  event.preventDefault();
  const productName = document.getElementById("product-name").value;
  const reviewText = document.getElementById("review-text").value;
  const review = {
    product: productName,
    text: reviewText,
  };
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  document.getElementById("product-name").value = "";
  document.getElementById("review-text").value = "";
  displayProductList();
});
function displayProductList() {
  productList.innerHTML = "";

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  let products = [...new Set(reviews.map((review) => review.product))];
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-list");
    const summaryElement = document.createElement("h2");
    summaryElement.textContent = product;
    productElement.appendChild(summaryElement);
    const reviewsContainer = document.createElement("div");
        summaryElement.addEventListener("click", ()=> {
      
      displayReviews(product, reviewsContainer);
    });
    productElement.appendChild(reviewsContainer);
    productList.appendChild(productElement);
  });
}
function displayReviews(product, container) {
    container.innerHTML = "";
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  let filteredReviews = reviews.filter((review) => review.product === product);
  filteredReviews.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");
    const productName = document.createElement("h3");
    productName.textContent = review.product;
    reviewElement.appendChild(productName);
    const reviewText = document.createElement("p");
    reviewText.textContent = review.text;
    reviewElement.appendChild(reviewText);
    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Удалить";
    reviewElement.appendChild(deleteButton);
    deleteButton.addEventListener("click",  ()=> {
      deleteReview(review);
     
      displayReviews(product, container);
    });

    container.appendChild(reviewElement);
  });
}
function deleteReview(review) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const index = reviews.findIndex(
    (r) => r.product === review.product && r.text === review.text
  );
  if (index !== -1) {
    reviews.splice(index, 1);
  }
  localStorage.setItem("reviews", JSON.stringify(reviews));
}
displayProductList();
