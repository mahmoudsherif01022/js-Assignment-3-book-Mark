var bookName = document.querySelector("#bookName");
var bookUrl = document.querySelector("#bookUrl");
bookMark = [];
KEY = "books";
if (localStorage.getItem(KEY) != null) {
  bookMark = JSON.parse(localStorage.getItem(KEY));
  display(bookMark);
}

function addSubmit() {
  if (validationInput(bookName)) {
    var existingBookmark = bookMark.find(
      (mark) => mark.name.toLowerCase() === bookName.value.toLowerCase()
    );
    if (existingBookmark) {
      alert("The name you entered already exists. Please choose another name.");
      return;
    }

    var mark = {
      name: bookName.value,
      url: bookUrl.value,
    };
    bookMark.push(mark);
    localStorage.setItem(KEY, JSON.stringify(bookMark));
    display(bookMark);
    clear();
  }
}

function display(list) {
  cartona = ``;
  for (var i = 0; i < bookMark.length; i++) {
    cartona += `
            <tr>
                            <td>${i + 1}</td>
                            <td class=" text-capitalize"> ${list[i].name}</td>
                            <td>
                         <button  onclick="openURL('${
                           list[i].url
                         }')" class="btn btn-visit">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                         </button>
                              </td> 
                            <td> 
                        <button onclick="deleteForm(${i})" class="btn btn-delete pe-2">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                        </button>
                            </td>
                        </tr>
        `;
  }
  document.querySelector("#tableData").innerHTML = cartona;
}

function clear() {
  bookName.value = null;
  bookUrl.value = null;
}

function deleteForm(index) {
  bookMark.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(bookMark));
  display(bookMark);
}

function validationInput(element) {
  var regex = {
    bookName: /^[A-Za-z 0-9]{3,12}$/,
    bookUrl:
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%\+.~#?&\/\/=]*)$/gm,
  };
  if (regex[element.id].test(element.value) == true) {
    element.nextElementSibling.classList.add("d-none");
    console.log("match");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.nextElementSibling.classList.remove("d-none");
    console.log("nomatch");

    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}
function openURL(url) {
  window.open(url, "_blank");
}
