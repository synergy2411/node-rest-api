$(document).ready(() => {
  let todos = [];
  let todo, editTodo;
  $("#btnText").text("Add Item");
  let value = "block";

  const getTodos = () => {
    $.ajax({
      url: "/todos",
      error: (err) => console.log(err),
      success: (response) => {
        if (!response) {
          $("#todo-items").html("No items in list");
        }
        showTodoItems(response);
      },
    });
  };
  // initial loading all saved items
  getTodos();

  const showTodoItems = (todos) => {
    $("#todo-items").empty();
    for (let todo of todos) {
      const item = `<li class="list-group-item" data-id=${
        todo._id
      }>${todo.label.toUpperCase()}
    <span class="badge badge-dark float-right">${todo.status}</span>
      </li>`;
      $("#todo-items").append(item);
    }
  };

  $("#btnAdd").on("click", (event) => {
    event.preventDefault();
    const label = $("#txtAddItem").val();
    $.ajax({
      type: "POST",
      url: "/todos",
      data: JSON.stringify({ label }),
      dataType: "json",
      contentType: "application/json",
      success: (response) => {
        todo = response;
        addNewItem(todo);
        $("#txtAddItem").val("");
        $(".addNewItemForm").css("display", "none")
        $("#btnText").text("Add Item");
      },
      error: (err) => console.log("ERROR", err),
    });
  });
  const addNewItem = (todo) => {
    const item = `<li class="list-group-item" data-id=${todo._id}>
        ${todo.label.toUpperCase()} 
        <span class="badge badge-dark float-right">${todo.status}</span>
        </li>`;
    $("#todo-items").append(item);
  };

  $("ul").on("click", "li", function () {
    const id = $(this).data().id;
    $.ajax({
      url: `/todos/${id}`,
      error: (err) => console.log(err),
      success: (response) => {
        editTodo = response;
        const label = response.label;
        $("#selectedItem").html(`
              <h3 class="text-center">Edit Item</h3>
              <div class="row">
              <div class="col-sm-12 col-md-12">
              <input class="form-control" type="text" value="${label}" id="txtEditItem"></div>
              </div>
              
              <br>
              <div class="row">
                <div class="col-sm-4 col-md-4">Status : </div>
                <div class="col-sm-8 col-md-8"> 
                <select class="form-control">
                  <option value="false">Pending</option>
                  <option value="true">Completed</option>
                </select>  
                </div>
              </div>
              <br>
              <div class="row"> 
              <div class="col-sm-6 col-md-6">
                <button class="btn btn-block btn-outline-warning" id="btnEdit">Edit</button>
              </div>
              <div class="col-sm-6 col-md-6">
                <button class="btn btn-block btn-outline-danger" id="btnDelete">Delete</button>
              </div>
              </div>
              `);
              if(response.status){
                $("select option")
              }
        $("#selectedItemForm").css("display", "block");
      },
    });
  });
  $("#btnShowForm").on("click", (event) => {
    event.preventDefault();
    
    if (value === "block") {
      $("#btnText").text("Hide Form");
      $(".addNewItemForm").css("display", value).slideDown();
      value = "none";
    } else {
      $("#btnText").text("Add Item");
      $(".addNewItemForm").css("display", value).slideUp();
      value = "block";
    }
  });

  $("#selectedItem").on("click", "#btnEdit", (event) => {
    const status = $("#selectedItem").find("select").val();
    axios({
      method: 'patch',
      url: '/todos/'+editTodo._id,
      data: {
        label: $("#txtEditItem").val(),
        status: status
      }
    }).then(response => {
      // console.log(response);
      getTodos();
    }, err=> console.log(err));
    
    $("#selectedItemForm").css("display", "none").slideUp();
  });

  $("#selectedItem").on("click", "#btnDelete", (event) => {
    $.ajax({
      type: "DELETE",
      url: "/todos/" + editTodo._id,
      success: (response) => {
        if (!response) {
        }
        getTodos();
        $("#selectedItemForm").css("display", "none");
      },
      error: (err) => console.log(err),
    });
  });
});
