function getParkaData(url = ``,myCallBack) {
  // Default options are marked with *
    return fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer" // body data type must match "Content-Type" header
    })
    
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then(data => {
    // you can access your data here
    myCallBack(data)
    }); // parses response to JSON
}

function findItem(){
    let itemID = document.getElementById("searchField").value;
    
   
   getParkaData("https://se3316-amali28-lab3-amali28.c9users.io/api/items/" + itemID, function(response){
        
        document.querySelector("tbody").innerHTML = ""
        
        displayTableAttributes();
        document.querySelector("tbody").innerHTML +=
        "<tr>" +
           "<td>" +response.name +"</td>" +
           "<td>" +response.price +"</td>"+
           "<td>" +response._id +"</td>" +
           "<td>" +response.quantity +"</td>"+
           "<td>" +response.tax +"</td>"
    }
    );

}
function displayTableAttributes(){
     document.querySelector("tbody").innerHTML += 
     "<tr>" + 
            "<td><b>Name</b></td>" +
           "<td><b>Price</b></td>" +
            "<td><b>ID</b></td>" +
            "<td><b>Quantity</b></td>" +
           "<td><b>Tax</b></td>"+
      " </tr>"    
}

function deleteParka(url = ``,myCallBack) {
  // Default options are marked with *
    return fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer" // body data type must match "Content-Type" header
    })
    
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then(data => {
    // you can access your data here
    myCallBack(data)
    }); // parses response to JSON
}


function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
}


function addParka(){
    let name_field = document.getElementById("name-field").value;
    let price_field = document.getElementById("price-field").value;
    let quantity_field = document.getElementById("quantity-field").value;
    let tax_field = document.getElementById("tax-field").value;
     if (!name_field || !price_field || !quantity_field){
       alert("Error, please enter the required fields!");
       return;
   }
let newParka= {name: name_field, price: price_field, quantity: quantity_field, tax: tax_field};
    postData("https://se3316-amali28-lab3-amali28.c9users.io/api/items", newParka, function(response){
    });
    
// regenerate table
    retriveData();
}


function parkaDeleter(itemNumber){
    
if (confirm("Are you sure you would like to delete this item?")){
    let tableRow = String(itemNumber);
    let parkaID = document.getElementById("parka._id" + tableRow).innerHTML;
     deleteParka("https://se3316-amali28-lab3-amali28.c9users.io/api/items/"+parkaID, function(response){
        console.log(response);
    });
    }
    
// regenerate table
    retriveData();
   
}

function retriveData(){

    getParkaData("https://se3316-amali28-lab3-amali28.c9users.io/api/items", function(response){
        
        document.querySelector("tbody").innerHTML = ""
        
        let itemNumber = 0;
 
        response.forEach(function(parka){
       
        ++itemNumber;
        displayTableAttributes();
        document.querySelector("tbody").innerHTML += "<tr>" + 
        "<td id='parka.name" + itemNumber +"' >" +parka.name +"</td>"+
        "<td id='parka.price" + itemNumber +"' >" +parka.price +"</td>"+
        "<td id='parka._id" + itemNumber +"' >" +parka._id +"</td>"+
        "<td><input id = 'parka.quantity" + itemNumber+"' type='text' value= " + parka.quantity + "></td>"+
        "<td><input id = 'parka.tax" + itemNumber+"' type='text' value= " + parka.tax + "></td>"
      + "<td id = "+itemNumber+">"+" <button onclick= 'updateParkaInformation("+itemNumber+")'> Save </button>"+" </td>" 
     +   "<td id = "+itemNumber+">"+" <button onclick= 'parkaDeleter("+itemNumber+")'> Delete </button>"+" </td>" 
        + "</tr>"
        })
    }
    );
}


function putData(url = ``, data = {}, myCallBack) {
  // Default options are marked with *
    return fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(myCallBack(response => response.json())); // parses response to JSON
}
function updateParkaInformation(itemNumber){

   
    let tableRow = String(itemNumber);
    let parkaID = document.getElementById("parka._id" + tableRow).innerHTML;
    let existingName = document.getElementById("parka.name"+tableRow).innerHTML;
    let existingPrice = document.getElementById("parka.price"+tableRow).innerHTML;
    let updatedQuantity = document.getElementById("parka.quantity"+tableRow).value;
    let updatedTax = document.getElementById("parka.tax"+tableRow).value;
   
    
    let updatedParka= {name: existingName, price: existingPrice, quantity: updatedQuantity, tax: updatedTax};
    
       putData("https://se3316-amali28-lab3-amali28.c9users.io/api/items/"+ parkaID, updatedParka, function(response){
            
            if(confirm("Are you sure you would like to update this item?")){
                retriveData();
            }
            alert(existingName + " has been successfully updated");
    });
}


