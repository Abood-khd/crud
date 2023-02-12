var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var btn = document.getElementById("mainBtn");
var table = document.getElementById("tableRow");

var productArr = [];

// =======================================
// invoke seilf function for localstoreg

(function () {
  if (localStorage.getItem("MyData") != null) {
    productArr = JSON.parse(localStorage.getItem("MyData"));
  }
})();

// =======================================
// For create data

function addProduct() {
if (nameRegex() == true) {
  
  

var Product = {
  pName: productName.value,
  pPrice: productPrice.value,
  pCat: productCat.value,
  pDesc: productDesc.value,
};
productArr.push(Product);

localStorage.setItem("MyData", JSON.stringify(productArr));
display();
  reset();
}
}

// =======================================
// For the show data

function display() {
  box = ``;
  for (var i = 0; i < productArr.length; i++) {
    box += `
    <tr>
    <td>${i + 1}</td>
    <td>${productArr[i].pName}</td>
    <td>${productArr[i].pPrice}</td>
    <td>${productArr[i].pCat}</td>
    <td>${productArr[i].pDesc}</td>
    <td><button class="btn btn-danger btn-sm" onclick="Delete(${i})">Delete</button></td>
    <td><button class="btn btn-success btn-sm" onclick="updateProduct(${i})">update</button></td>
  </tr>
    `;
  }
  table.innerHTML = box;
}
display();

// =======================================
// For reset input after create
function reset() {
  productName.value = " ";
  productCat.value = " ";
  productDesc.value = " ";
  productPrice.value = " ";
}

// =======================================
// to delete a product
function Delete(index) {
  productArr.splice(index, 1);
  localStorage.setItem("MyData", JSON.stringify(productArr));

  display();
}

// =======================================
// For search on the product name

function searchName(searchName) {
  box2 = ``;
  for (var i = 0; i < productArr.length; i++) {
    if (productArr[i].pName.toLowerCase().includes(searchName.toLowerCase())) {
      box2 += `
        <tr>
        <td>${i + 1}</td>
        <td>${productArr[i].pName.replace(
          searchName,
          `<span class="bg-warning" >${searchName}</span>`
        )}</td>
        <td>${productArr[i].pPrice}</td>
        <td>${productArr[i].pCat}</td>
        <td>${productArr[i].pDesc}</td>
        <td><button class="btn btn-danger btn-sm" onclick="Delete(${i})">Delete</button></td>
        <td><button class="btn btn-success btn-sm" onclick="updateProduct(${i})">update</button></td>
      </tr>
        `;
    }
  }
  document.getElementById("tableRow").innerHTML = box2;
}

// =======================================
// For search on the product category

function searchCat(searchCat) {
  box3 = ``;
  for (var i = 0; i < productArr.length; i++) {
    if (productArr[i].pCat.toLowerCase().includes(searchCat.toLowerCase())) {
      box3 += `
        <tr>
        <td>${i + 1}</td>
        <td>${productArr[i].pName}</td>
        <td>${productArr[i].pPrice}</td>
        <td>${productArr[i].pCat.replace(
          searchCat,
          `<span class="bg-warning">${searchCat}</span>`
        )}</td>
        <td>${productArr[i].pDesc}</td>
        <td><button class="btn btn-danger btn-sm" onclick="Delete(${i})">Delete</button></td>
        <td><button class="btn btn-success btn-sm" onclick="updateProduct(${i})">update</button></td>
      </tr>
        `;
    }
  }
  document.getElementById("tableRow").innerHTML = box3;
}

// =======================================
// to update or modify the product
function updateProduct(i) {
  productName.value = productArr[i].pName;
  productPrice.value = productArr[i].pPrice;
  productCat.value = productArr[i].pCat;
  productDesc.value = productArr[i].pDesc;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function nameRegex(){
  var regex = /^[A-Z][a-z]{1,}$/;
  if (regex.test(productName.value) == true) {
    return true
  }else{
    alert("error pattern")
    return false;
  }
}