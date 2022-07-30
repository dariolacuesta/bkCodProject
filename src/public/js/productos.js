const socket = io.connect();

/* -------------------  PRODUCTOS -------------------------- */

// ENVIAR PRODUCTOS POR SOCKET
document.getElementById("btnForm").addEventListener("click", () => {
  validarForm();
}); // al apretar el boton ejecuta la fn valida()

// Funcion que valida que los input no esten vacios y si estan OK envia la informacion al server
function validarForm() {
  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let thumbnail = document.getElementById("thumbnail").value;
  if (title === "" || price === "" || thumbnail === "") {
    alert(`CAMPOS REQUERIDOS PARA AGREGAR PRODUCTO`);
  } else {
    let newProd = {
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      stock: document.getElementById("stock").value,
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
      thumbnail: document.getElementById("thumbnail").value,
    };
    console.log(newProd);
    socket.emit("new-producto", newProd);

    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("thumbnail").value = "";
  }
}

// GET
const fragment = document.createDocumentFragment();
const tabla = document.getElementById("tableProd");
const template = document.getElementById("templateList").content;

// Traer productos
document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
});

const fetchData = async () => {
  const res = await fetch("http://localhost:8080/api/productos");
  const data = await res.json();
  verProdHtml(data);
};

const verProdHtml = (data) => {
  data.forEach((producto) => {
    template.getElementById("prodTitle").textContent = producto.title;
    template.getElementById("prodPrice").textContent = producto.price;
    template.getElementById("prodImg").setAttribute("src", producto.thumbnail);
    template.getElementById("prodId").textContent = producto._id;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  tabla.appendChild(fragment);
};

socket.on("new-prod-server", async (data) => {
  let array = [];
  array.push(await data);
  verProdHtml(array);
});

let btnCart = document.getElementById("btnCart");
if(btnCart)
{
  btnCart.addEventListener("click", () => {
    console.log("prodocto._id");
  }); 
}



