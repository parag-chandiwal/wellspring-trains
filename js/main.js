/**
 * Summary which must end with period or two line breaks.
 *
There are many train lines in the city of Chicago. The El is the quickest, the Metra is used to and
from the suburbs, and the Amtrak crosses large distances. Your assignment is to write a program
that reads in a ‘comma separated values’ (CSV) file containing train information and outputs the
data to the user.
 * 
 * @since version 1 
 *
 */

/**
 * @link      http://chandiwal.com
 * @author    Parag Chandiwal <chandiwalp@gmail.com>
 * @Git  
 */


//<---Sort Table Function------Using Datatables.js instead to sort and apply pagination 

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("sortTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("tr");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}






//Delete Row 
function deleteTrain() {
    var deleteButton = $(this).attr("data-id");
    // var deleteButton = document.getElementById("removeBtn").value;
    //alert(deleteButton);
    var openRequest = indexedDB.open("notekeeper", 1);
    openRequest.onsuccess = function (e) {
        var databaseObject;
        databaseObject = e.target.result;
        var transaction = databaseObject.transaction(["noteKeeperDatabase"], "readwrite");
        var store = transaction.objectStore("noteKeeperDatabase");
        var objectStoreRequest = store.delete(deleteButton);
        objectStoreRequest.onsuccess = function (event) {
            alert("Success Deleting");
            buildTable();
        }
    };
    
}
//
//function showDetail() {
//    $(".detail").hide();
//    $(".confirm").hide();
//    $(".edit").show();
//    var target = $(this).parent().parent().next();
//    $(target).show();
//    $(target).next().show();
//    $(target).next().find("input").each(function (index, obj) {
//        $(obj).attr("readonly", true);
//    });
//}




//Populating values into HTML Table
function buildTable() {
    var rows = $("#sortTable").find("tr");
    if (rows.length > 1) {
        rows.each(function (index, row) {
            if (index > 0) {
                $(row).remove();
            }
        });
    }
    //console.log(results);
    //  var markup = "<table class='table' id='sortTable'>";
    //requests opening a connection to a database.    	
    var openRequest = indexedDB.open("notekeeper", 1);
    openRequest.onsuccess = function (e) {
        var databaseObject;
        console.log("Success!");
        databaseObject = e.target.result;
        var count = 0;
        var transaction = databaseObject.transaction(["noteKeeperDatabase"], "readonly");
        var store = transaction.objectStore("noteKeeperDatabase");
        var request = store.openCursor()
            , index = 1;
        //markup+= "<thead><tr><th>RUN NUMBER</th><th>TRAIN LINE</th><th>ROUTE NAME</th><th>OPERATOR ID</th><th>OPERATIONS</th></tr></thead><tbody>";
        //mode_edit
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                var value = cursor.value;
                var row = document.createElement("tr");
                var runTd = document.createElement("td");
                runTd.innerHTML = "<input type='text' class='edit-run' value='" + value.run_number + "' readonly/>";
                $(row).append(runTd);
                var trainTd = document.createElement("td");
                trainTd.innerHTML = "<input type='text' class='edit-train' value='" + value.train_line + "' readonly/>";
                $(row).append(trainTd);
                var routeTd = document.createElement("td");
                routeTd.innerHTML = "<input type='text' class='edit-route' value='" + value.route_name + "' readonly/>";
                $(row).append(routeTd);
                var operatorTd = document.createElement("td");
                operatorTd.innerHTML = "<input type='text' class='edit-operator' value='" + value.operator_id + "' readonly/>";
                $(row).append(operatorTd);
                var operationTd = document.createElement("td");
                var editBtn = document.createElement("button");
                editBtn.className = "btn btn-warning edit";
                $(editBtn).attr("data-id", value.run_number);
                editBtn.innerHTML = "Edit";
                editBtn.onclick = enableEdit;
                $(operationTd).append(editBtn).append(" ");
                var confirmBtn = document.createElement("button");
                confirmBtn.className = "btn btn-success confirm";
                $(confirmBtn).attr("data-id", value.run_number);
                confirmBtn.innerHTML = "Confirm";
                confirmBtn.onclick = confirmEdit;
                $(confirmBtn).hide();
                $(operationTd).append(confirmBtn).append(" ");
                $(row).append(operationTd);
                var deletionTd = document.createElement("td");
                var removeBtn = document.createElement("button");
                removeBtn.className = "btn btn-danger remove";
                $(removeBtn).attr("data-id", value.run_number);
                removeBtn.innerHTML = "Remove";
                removeBtn.onclick = deleteTrain;
                $(deletionTd).append(removeBtn);
                var closeBtn = document.createElement("button");
                closeBtn.className = "btn btn-danger";
                closeBtn.innerHTML = "Close";
                closeBtn.onclick = closeDetail;
                $(closeBtn).hide();
                $(deletionTd).append(closeBtn);
                $(row).append(deletionTd);
                
                //Add Everything
                $("#sortTable").append(row);
                index++;
                cursor.continue()
            }
            else {
                
                //Apply Pagination using Datatables ----------connot use since can be initialise only once
//                    $('#sortTable').DataTable({
//                    "paging": true
//                    , "ordering": true
//                    , "retrieve": true    
//                    , "info": false
//                    , "lengthMenu": [[5, 10, -1], [5, 10, "All"]]
//                });
          
                //  markup+="</tbody></table>";
                //$("#sortTable").html(markup);
            }
        }
    }
}
//--------------Enable input type="text" in html Table -----------------
function enableEdit() {
    var row = $(this).parent().parent();
    $(this).hide();
    $(this).next().show();
    row.find("input").each(function (index, obj) {
        $(obj).attr("readonly", false);
    });
}
//--------------Not Really Using----------------
function closeDetail() {
    $(".detail").hide();
    $("#table").find("input").each(function (index, obj) {
        $(obj).attr("readonly", true);
    });
}
//-----------------------Update-------------------
function confirmEdit() {
    $(".confirm").hide();
    $(this).prev().show();
    var id = $(this).attr("data-id")
        , row = $(this).parent().parent()
        , runEdit = $(row).find(".edit-run").val()
        , trainEdit = $(row).find(".edit-train").val()
        , routeEdit = $(row).find(".edit-route").val();
    operatorEdit = $(row).find(".edit-operator").val();
    var openRequest = indexedDB.open("notekeeper", 1);
    var editTrain = {
        train_line: trainEdit
        , route_name: routeEdit
        , run_number: runEdit
        , operator_id: operatorEdit
    };
    row.find("input").each(function (index, obj) {
        $(obj).attr("readonly", true);
    });
    openRequest.onsuccess = function (e) {
        var databaseObject;
        databaseObject = e.target.result;
        var transaction = databaseObject.transaction(["noteKeeperDatabase"], "readwrite");
        var store = transaction.objectStore("noteKeeperDatabase");
        var objectStoreRequest = store.put(editTrain); {
            alert("Updated Sucessfully");
        }
    }
}
//------------------Add Data--------------------
function contentLoaded() {
    //  initDb();                
    //                var btnAdd = document.getElementById("btnAdd");
    //                var btnDelete = document.getElementById("btnDelete");
    //    
    //    
    //                    btnAdd.addEventListener("click", function () {
    var ntrain = document.getElementById("new-line").value;
    var nrun = document.getElementById("new-run").value;
    var nroute = document.getElementById("new-route").value;
    var noperator = document.getElementById("new-oid").value;
    // console.log(ntrain);
    var openRequest = indexedDB.open("notekeeper", 1);
    var newTrain = {
        train_line: ntrain
        , route_name: nroute
        , run_number: nrun
        , operator_id: noperator
    };
    openRequest.onsuccess = function (e) {
        var databaseObject;
        databaseObject = e.target.result;
        var transaction = databaseObject.transaction(["noteKeeperDatabase"], "readwrite");
        var store = transaction.objectStore("noteKeeperDatabase");
        //Add New Data
        var objectStoreRequest = store.add(newTrain);
        objectStoreRequest.onsuccess = function (event) {
            alert("Success");
            buildTable();
        }
    };
}
//class declaration
function TrainData(train_line, route_name, run_number, operator_id) {
    this.train_line = train_line;
    this.route_name = route_name;
    this.run_number = run_number;
    this.operator_id = operator_id;
}
var jsonObject = [];
var databaseObject;
$(document).ready(function () {
    //------------------Using IndexedDB to store CSV data--------------------------------------------------
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    $('#submit').on("click", function (e) {
        e.preventDefault();
        if (!$('#files')[0].files.length) {
            alert("Please choose at least one file to read the data.");
        }
        else {
            if (!window.indexedDB) {
                window.alert("Your browser doesn't support a stable version of IndexedDB.")
            }
            else {
                //requests opening a connection to a database.    	
                var openRequest = indexedDB.open("notekeeper", 1);
                //triggered when a database of a bigger version number than the existing stored database is loaded.
                openRequest.onupgradeneeded = function (e) {
                    var thisDB = e.target.result;
                    if (!thisDB.objectStoreNames.contains("noteKeeperDatabase")) {
                        //creates and returns a new object store or index.  
                        //Will be using RUN_NUMBER as primary Key
                        var objectStore = thisDB.createObjectStore("noteKeeperDatabase", {
                            keyPath: "run_number"
                        });
                        //create index
                        objectStore.createIndex("run_number", "run_number", {
                            unique: true
                        });
                    }
                }
                openRequest.onerror = function (e) {
                        console.dir(e);
                        alert("Database creation failed!!");
                    }
                    //fired when the result of a request is successfully returned
                openRequest.onsuccess = function (e) {
                    var databaseObject;
                    databaseObject = e.target.result;
        //---------------------------------------papaparse--------------------------------------
                    //Using Papaparse.js to convert CSV files into JSON
                    
                    $('#files').parse({
                        config: {
                            delimiter: ", "
                            , complete: buildTable
                        , }
                        , before: function (file, inputElem) {
                            //console.log("Parsing file...", file);
                            //Doesn't return anything. Results are provided asynchronously to a callback function.
                            Papa.parse(file, {
                                header: true
                                , dynamicTyping: true
                                , complete: function (results) {
                                    data = results.data;
                                    for (var i = 0; i < data.length; i++) {
                                        var trainData = {
                                            train_line: data[i]["TRAIN_LINE"].trim() == "" ? "NA" : data[i]["TRAIN_LINE"].trim()
                                            , route_name: data[i][" ROUTE_NAME"].trim() == "" ? "NA" : data[i][" ROUTE_NAME"].trim()
                                            , run_number: data[i][" RUN_NUMBER"].trim() == "" ? "NA" : data[i][" RUN_NUMBER"].trim()
                                            , operator_id: data[i][" OPERATOR_ID"].trim() == "" ? "NA" : data[i][" OPERATOR_ID"].trim()
                                        };
                                        //                                                                var trainData = new TrainData(data[i]["TRAIN_LINE"].trim(),data[i][" ROUTE_NAME"].trim(),data[i][" RUN_NUMBER"].trim(),data[i][" OPERATOR_ID"].trim());
                                        jsonObject.push(trainData);
                                    }
                                    var newJsonObject = unique(jsonObject);
                                    console.log("Train Data -> ", newJsonObject);
                                    newJsonObject.forEach(function (elem) {
                                        var transaction = databaseObject.transaction(["noteKeeperDatabase"], "readwrite");
                                        //returns an object store that has already been added to the scope of this transaction
                                        var store = transaction.objectStore("noteKeeperDatabase");
                                        var request = store.add(elem);
                                        request.onerror = function (e) {
                                            console.log("Error", e.target.error.name);
                                            //some type of error handler
                                        }
                                        request.onsuccess = function (e) {
                                            console.log("Woot! Did it");
                                        }
                                    })
                                }
                            });
                        }
                        , error: function (err, file) {
                            console.log("ERROR:", err, file);
                        }
                        , complete: function () {
                            //console.log("Done with all files");
                        }
                    });
                }
            }
        }
    });
  buildTable();
});

//------------------------------------Remove Duplicate entries from CSV file ---------------


function unique(list) {
    var arrResult = {};
    for (i = 0, n = list.length; i < n; i++) {
        var item = list[i];
        arrResult[item.train_line + " - " + item.route_name + " - " + item.run_number + " - " + item.operator_id] = item;
    }
    var i = 0;
    var nonDuplicatedArray = [];
    for (var item in arrResult) {
        nonDuplicatedArray[i++] = arrResult[item];
    }
    return nonDuplicatedArray;
}
