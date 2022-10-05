(() => {
  let dataBuku = [];

  function showData(showData) {
    const inComplete = document.querySelector("#incompleteBookshelfList"),
      complete = document.querySelector("#completeBookshelfList");
    inComplete.innerHTML = "", complete.innerHTML = "";
    for (const localData of showData) {
      const eArticle = document.createElement("article");
      eArticle.classList.add("book_item");
      const a = document.createElement("h2");
      a.innerText = localData.title;
      const b = document.createElement("p");
      b.innerText = "Penulis: " + localData.author;


      const c = document.createElement("p");
      if (c.innerText = "Tahun: " + localData.year,
        eArticle.appendChild(a),
        eArticle.appendChild(b),
        eArticle.appendChild(c),
        localData.isComplete) {
        const div = document.createElement("div");
        div.classList.add("action");
        const but = document.createElement("button");
        but.id = localData.id,
          but.innerText = "Belum Selesai dibaca",
          but.classList.add("green"),
          but.addEventListener("click", changeToUnComplete);
        const butt = document.createElement("button");
        butt.id = localData.id,
          butt.innerText = "edit",
          butt.classList.add("blue"),
          butt.addEventListener("click", edit);
        const butto = document.createElement("button");
        butto.id = localData.id,
          butto.innerText = "Hapus buku",
          butto.classList.add("red"),
          butto.addEventListener("click", deleteBook),
          div.appendChild(butt),
          div.appendChild(but),
          div.appendChild(butto),
          eArticle.appendChild(div),
          complete.appendChild(eArticle)
      } else {
        const divv = document.createElement("div");
        divv.classList.add("action");
        const button = document.createElement("button");
        button.id = localData.id,
          button.innerText = "Selesai dibaca",
          button.classList.add("green"),
          button.addEventListener("click", changeToComplete);
        const buttonn = document.createElement("button");
        buttonn.id = localData.id,
          buttonn.innerText = "edit",
          buttonn.classList.add("blue"),
          buttonn.addEventListener("click", edit);
        const bbutton = document.createElement("button");
        bbutton.id = localData.id,
          bbutton.innerText = "Hapus buku",
          bbutton.classList.add("red"),
          bbutton.addEventListener("click", deleteBook),
          divv.appendChild(buttonn),
          divv.appendChild(button),
          divv.appendChild(bbutton),
          eArticle.appendChild(divv),
          inComplete.appendChild(eArticle)
      }
    }
  }

  let string = "WELCOME TO CRUD PERPUSTAKAAN";
  let str = string.split("");
  let el = document.getElementById('str');
  (function animate() {
    str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
    let running = setTimeout(animate, 90);
  })();

  function addBook() {
    contactList = JSON.parse(localStorage.getItem('books')) ?? []
    contactList.length != 0 ? contactList.findLast((item) => id = item.id) : id = 0
    if (document.getElementById('id').value) {
      contactList.forEach(value => {
        if (document.getElementById('id').value == value.id) {
          value.title = document.getElementById('inputBookTitle').value,
            value.author = document.getElementById('inputBookAuthor').value,
            value.year = document.getElementById('inputBookYear').value,
            value.isComplete = document.getElementById('inputBookIsComplete').checked
        }
      });
      document.getElementById('id').value = ''
    } else {
      var item = {
        id: +new Date,
        title: document.getElementById('inputBookTitle').value,
        author: document.getElementById('inputBookAuthor').value,
        year: document.getElementById('inputBookYear').value,
        isComplete: document.getElementById('inputBookIsComplete').checked,
      }
      contactList.push(item)
    }
    localStorage.setItem('books', JSON.stringify(contactList))
  }

  function edit(book) {
    book.preventDefault()
    const n = Number(book.target.id)
    for (const localData of dataBuku) {
      if (n == localData.id) {
        document.getElementById('id').value = localData.id
        document.getElementById('inputBookTitle').value = localData.title
        document.getElementById('inputBookAuthor').value = localData.author
        document.getElementById('inputBookYear').value = localData.year
        document.getElementById('inputBookIsComplete').checked = localData.isComplete
        document.getElementById('inputBookTitle').focus();
        if (document.getElementById('inputBookIsComplete').checked) {
          let bookhasbeenread = document.getElementById("newstatusbook");
          bookhasbeenread.innerText = "Selesai Dibaca";
        } else {
          let bookhasbeenread = document.getElementById("newstatusbook");
          bookhasbeenread.innerText = "Belum Selesai Dibaca";
        }
        return console.log(n)
      }
    }
  }

  function searchBook(book) {
    book.preventDefault();
    const searchByTitle = document.querySelector("#searchBookTitle");
    query = searchByTitle.value, query ?
      showData(dataBuku.filter((function (getData) {
        return getData.title.toLowerCase().includes(query.toLowerCase())
      }))) : searchBook(dataBuku)
  }


  function changeToComplete(book) {
    const n = Number(book.target.id),
      o = dataBuku.findIndex((function (getData) { return getData.id === n }));
    -1 !== o && (dataBuku[o] = {
      ...dataBuku[o], isComplete: !0
    },
      document.dispatchEvent(new Event("bookChanged")))
  }

  function changeToUnComplete(book) {
    const n = Number(book.target.id),
      o = dataBuku.findIndex((function (getData) { return getData.id === n }));
    -1 !== o && (dataBuku[o] = {
      ...dataBuku[o], isComplete: !1
    }, document.dispatchEvent(new Event("bookChanged")))
  }

  function deleteBook(book) {
    let text = "Yakin Mau Dihapus!\nOK or Cancel.";
    if (confirm(text) == true) {
      // document.getElementById("demo").innerHTML = text;
      const n = Number(book.target.id),
        o = dataBuku.findIndex((function (getData) {
          return getData.id === n
        }));
      -1 !== o && (dataBuku.splice(o, 1),
        document.dispatchEvent(new Event("bookChanged")))
      document.getElementById('inputBookTitle').focus()
      alert('Data Berhasil Dihapus')
    } else {
      alert('Data Gagal Dihapus')
    }
  }

  function changeText() {
    const newstatusbook = document.getElementById("inputBookIsComplete");
    if (newstatusbook.checked) {
      let bookhasbeenread = document.getElementById("newstatusbook");
      bookhasbeenread.innerText = "Selesai Dibaca";
    } else {
      let bookhasbeenread = document.getElementById("newstatusbook");
      bookhasbeenread.innerText = "Belum Selesai Dibaca";
    }
  }
  document.getElementById("inputBookIsComplete").addEventListener('change', changeText);

  function a() {
    !function (getData) {
      localStorage.setItem("books", JSON.stringify(getData))
    }(dataBuku), showData(dataBuku)
  }

  window.addEventListener("load", (function () {
    dataBuku = JSON.parse(localStorage.getItem("books")) || [], showData(dataBuku);
    listBuku = JSON.parse(localStorage.getItem("books")) ?? [];
    const o = document.querySelector("#inputBook"),
      d = document.querySelector("#searchBook");
    o.addEventListener("submit", addBook),
      d.addEventListener("submit", searchBook),
      document.addEventListener("bookChanged", a)
  }))

}


)();