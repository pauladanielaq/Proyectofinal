//Inicialmente se crea un array de objetos donde cada objeto es un usuario
//al que se le pedirá nombre, numnumdocumento y tipo de usuario (propiedades o atributos).

//NOTA: habrá dos tipos de usuarios; el 1 es administrador y el 2 es cliente.
let totalDineroEnCajero = 0;

const misusuarios = [
  {
    nombre: "Paula Daniela Quinones",
    numdocumento: "1",
    contraseña: "1",
    usuario: 1,
  },
  {
    nombre: "Andrés Felipe Lopera",
    numdocumento: "2",
    contraseña: "2",
    usuario: 2,
  },
  {
    nombre: "William Quiñones",
    numdocumento: "76307486",
    contraseña: "asproc",
    usuario: 2,
  },
  {
    nombre: "Patricia Realpe",
    numdocumento: "34557682",
    contraseña: "iris",
    usuario: 2,
  },
];

//Seguido de esto se crea un array para el dinero del cajero, donde se debe especificar
//el valor del billete y también cuántos de estos habrá.

const dineroEnCajero = [
  {
    valorbillete: 100,
    cantidad: 0,
  },
  {
    valorbillete: 50,
    cantidad: 0,
  },
  {
    valorbillete: 20,
    cantidad: 0,
  },
  {
    valorbillete: 10,
    cantidad: 0,
  },
  {
    valorbillete: 5,
    cantidad: 0,
  },
];

//Ahora se crea una función flecha llamada inicioCajero
const inicioCajero = () => {
  const numdocumento = prompt(
    "Por favor ingrese en el recuadro su número de numdocumento"
  );
  const contraseña = prompt("A continuación ingrese por favor su contraseña");
  return {
    numdocumento,
    contraseña,
  };
};

const validateUser = () => {
  let usuarioIniciado = inicioCajero();
  //Buscamos al usuario iniciado en nuestro arrays de usuarios creados inicialmente
  //Ponemos .find al ser uno de los métodos en los arrays para
  //encontrar un valor del primer elemento del array que nos cumpla. (Diapos sesión 6)

  let userFound = misusuarios.find(
    (user) =>
      user.numdocumento === usuarioIniciado.numdocumento &&
      user.contraseña === usuarioIniciado.contraseña
  );

  //Ahora empleando un while rectifico que si el usuario no existe, entonces debe
  //volver a ejecutar la función de inicio del cajero y la búsqueda del usuario.

  while (!userFound) {
    //Se le avisa al usuario que los datos ingresados están incorrectos
    alert("Los datos que ha ingresado son incorrectos");
    //y se le vuelven a pedir los datos al usuario
    usuarioIniciado = inicioCajero();
    userFound = misusuarios.find(
      (user) =>
        user.numdocumento === usuarioIniciado.numdocumento &&
        user.contraseña === usuarioIniciado.contraseña
    );
  }
  // Si estos requisitos se cumplen y son correctos entonces enviará un mensaje de atenticado
  alert("Usuario correctamente autenticado");
  return userFound;
};

const depositarDinero = () => {
  alert("Vamos a depositar dinero");
  let totalDineroEnCajero = 0;
  dineroEnCajero.forEach((billete) => {
    //Empleamos un forEach para recorrer el array
    const cantidadDepositadaStr = prompt(
      `Por favor ingrese la cantidad de billetes de $${billete.valorbillete} mil a depositar`
    );
    const cantidadDepositada = Number(cantidadDepositadaStr);
    billete.cantidad += cantidadDepositada;
    const sumavalorbillete = billete.valorbillete * billete.cantidad;
    totalDineroEnCajero += sumavalorbillete;
    console.log(
      `Hay $${sumavalorbillete} en billetes de $${billete.valorbillete}`
    );
  });
    //console.log("con el mensaje que quiero que lea el usuario y que envíe"; la suma anterior)
    //ESTRUCTURA PARECIDA A PSEINT.
  console.log("El total de dinero disponible en el cajero es $", totalDineroEnCajero);
  return totalDineroEnCajero;
};

function retiroDeDinero(cajero, valorRetiro) {
  let dineroDisponible = 0;
  for (let i = 0; i < cajero.length; i++) {
    dineroDisponible += cajero[i].valorbillete * cajero[i].cantidad;
  }

  let dineroEntregado = [];
  for (let i = 0; i < cajero.length; i++) {
    let billetesEntregados = Math.min(
      Math.floor(valorRetiro / cajero[i].valorbillete),
      cajero[i].cantidad
    );
    dineroEntregado.push({
      valorbillete: cajero[i].valorbillete,
      cantidad: billetesEntregados,
    });
    valorRetiro -= billetesEntregados * cajero[i].valorbillete;
  }

  // Redondear al valor más cercano menor al solicitado
  if (valorRetiro > 0) {
    let ultimavalorbillete =
      dineroEntregado[dineroEntregado.length - 1].valorbillete;
    let montoFaltante = ultimavalorbillete - (valorRetiro % ultimavalorbillete);
    if (montoFaltante < ultimavalorbillete) {
      valorRetiro -= montoFaltante;
      dineroEntregado[dineroEntregado.length - 1].cantidad -= Math.floor(
        montoFaltante / ultimavalorbillete
      );
    }
  }

  let dineroRestante = 0;
  let mensajeBilletesRestantes = "Cantidad restante de billetes:\n";
  for (let i = 0; i < cajero.length; i++) {
    let billetesRestantes = cajero[i].cantidad - dineroEntregado[i].cantidad;
    dineroRestante += billetesRestantes * cajero[i].valorbillete;
    mensajeBilletesRestantes +=
      billetesRestantes + " billetes de $" + cajero[i].valorbillete + "\n";
  }

  let mensaje = "Dinero entregado:\n";
  for (let i = 0; i < dineroEntregado.length; i++) {
    mensaje +=
      dineroEntregado[i].cantidad +
      " billetes de $" +
      dineroEntregado[i].valorbillete +
      "\n";
  }

  alert(mensaje);
  alert(mensajeBilletesRestantes);
  alert("Dinero restante en el cajero: $" + dineroRestante);
  return dineroEntregado;
}

const retirarDinero = () => {
  const dineroARetirar = prompt("Ingrese la cantidad a retirar");
  alert(`Podemos entregar $${totalDineroEnCajero}`);

  if (dineroARetirar > totalDineroEnCajero) {
    alert("Lo sentimos, no tenemos suficiente dinero");
  } else {
    alert("Vamos a retirar");
    retiro = retiroDeDinero(dineroEnCajero, dineroARetirar);
  }

  return retiro;
};

const funcionPrincipal = () => {
  let usuario_validado = validateUser();

  while (usuario_validado.usuario === 1) {
    totalDineroEnCajero = depositarDinero();
    usuario_validado = validateUser();
    if (usuario_validado.usuario === 2) {
      break;
    }
  }

  if (usuario_validado.usuario === 2 && totalDineroEnCajero === 0) {
    alert("Cajero en mantenimiento, vuelva pronto");
    funcionPrincipal();
  } else {
    retiro = retirarDinero();
  }
};

funcionPrincipal();
