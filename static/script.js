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



function retriveData(){

    getParkaData("https://se3316-amali28-lab3-amali28.c9users.io/api/items", function(response){
        
        document.querySelector("tbody").innerHTML = ""
        
        let itemNumber = 0;
 
        response.forEach(function(parka){
       
        ++itemNumber;
        displayTableAttributes();
        document.querySelector("tbody").innerHTML += "<tr>" + 
        "<td id='parka.name' >" +parka.name +"</td>"+
        "<td id='parka.price' >" +parka.price +"</td>"+
     "<td id='parka._id" + itemNumber +"' >" +parka._id +"</td>"+
        "<td><input type='text' value= " + parka.quantity + "></td>"+
        "<td><input type='text' value= " + parka.tax + "></td>"+ "<td><button>Save</button></td>" +
        "<td id = "+itemNumber+">"+" <button onclick= 'parkaDeleter("+itemNumber+")'> Delete </button>"+" </td>" 
        + "</tr>"
        })
    }
    );
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
    
    console.log(document.getElementById("name").value);
    postData(` https://se3316-amali28-lab3-amali28.c9users.io/api/items`, {price: document.getElementById("name").value})
  .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
  .catch(error => console.error(error));
    
}




