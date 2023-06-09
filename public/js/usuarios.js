// const urlBase = "http://localhost:3000/";

let crearUsuario = () => {
  let username = document.getElementById("username").value;
  let contraseña = document.getElementById("contraseña").value;
  let telefono = document.getElementById("telefono").value;
  let domicilio = document.getElementById("domicilio").value;
  let email = document.getElementById("email").value;

  axios
    .post(`/crearUsuario`, {
      username: username,
      contraseña: contraseña,
      telefono: telefono,
      domicilio: domicilio,
      email: email,
    })
    .then(function (response) {
      alert(response.data);
      window.location.href = "/pagPrincipal_login";
    })
    .catch(function (error) {
      // Manejar errores de solicitud
      alert(`${error.response.data}, por favor ingrese otro.`);
    });

  event.preventDefault();

  // Puedes retornar false al final de la función para asegurarte de que la página no se recargue
  return false;
};

let inicarSesión = async () => {
  let username = document.getElementById("signup-user").value;
  let contraseña = document.getElementById("signup-password").value;

  axios
    .post(`/iniciarSesion`, {
      username: username,
      contraseña: contraseña,
    })
    .then(function (response) {

      if (response.data[0].TipoUsuario == 'Admin'){
        alert(
          `¡Hola ${response.data[0].Nombre}! ¡Bienvenido de vuelta! `
        );
          window.location.href = "/admin";
      } else {
        usuario = response.data[0];
        alert(
          `¡Hola ${response.data[0].Nombre}! ¡Gracias por iniciar sesión! `
        );
        // Almacenar datos del usuario en el almacenamiento local del navegador
        localStorage.setItem("usuario", JSON.stringify(usuario));
        // Redirigir a la página de productos
        window.location.href = "/pagPrincipal_productos";
        // window.location.href = "/html/paginaPrincipal_Productos.html";
      }

    })
    .catch(function (error) {
      // Manejar errores de solicitud
      alert(error.response.data);
    });

  event.preventDefault();

  // Puedes retornar false al final de la función para asegurarte de que la página no se recargue
  return false;
};
