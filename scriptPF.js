//Inicialmente se crea un array de objetos donde cada objeto es un usuario
//al que se le pedirá nombre, numdocumento y tipo de usuario (propiedades o atributos).

//NOTA: habrá dos tipos de usuarios; el 1 es administrador y el 2 es cliente.

let totalcajero = 0;

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
    "Por favor ingrese en el recuadro su número de documento"
  );
  const contraseña = prompt(
    "A continuación ingrese en el recuadro su contraseña"
  );
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
      //Comparo para que coincidan los datos pedidos con los ingresados
      user.numdocumento === usuarioIniciado.numdocumento &&
      user.contraseña === usuarioIniciado.contraseña
  );

  //Ahora empleando un while rectifico que si el usuario no existe, entonces debe
  //volver a ejecutar la función de inicio del cajero y la búsqueda del usuario. 
  while (!userFound) {
    //Se le avisa al usuario que los datos ingresados están incorrectos
    alert("Los datos que ha ingresado son incorrectos");
    // Y se le vuelven a pedir los datos al usuario
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
  let totalcajero = 0;
  dineroEnCajero.forEach((billete) => { /*Empleamos un forEach para recorrer el array*/
    const dineroIngresado = prompt(
      `Por favor ingrese la cantidad de billetes de $${billete.valorbillete} mil a depositar`
    );
    const cantidadDepositada = Number(dineroIngresado);
    billete.cantidad += cantidadDepositada;
    const sumavalorbillete = billete.valorbillete * billete.cantidad;
    totalcajero += sumavalorbillete;
    console.log(
      `Hay $${sumavalorbillete} en billetes de $${billete.valorbillete}`
    );
  });
  //console.log("con el mensaje que quiero que lea el usuario y que envíe"; la suma anterior) ESTRUCTURA PARECIDA A PSEINT.
  console.log(
    "El total de dinero disponible en este cajero es: $",
    totalcajero
  );
  return totalcajero;
};


let usuario_validado = validateUser();

while (usuario_validado.usuario === 1) {
  totalcajero = depositarDinero();
  usuario_validado = validateUser();
  if (usuario_validado.usuario === 2) {
    break;
  }
}

const retirarDinero = () => {
  const dineroARetirar = prompt(
    "Ingrese la cantidad de dinero que desea retirar"
  );
  alert(`Recuerde que por el momento este cajero le puede entregar un monto de $${totalcajero} mil.`);

  if (dineroARetirar > totalcajero) {
    alert(
      "Lo sentimos, por el momento este cajero no cuenta con los fondos suficientes para este retiro."
    );
  } else {
    alert("Entendido, ¡vamos a retirar!");
  }
};

if (usuario_validado.usuario === 2 && totalcajero === 0) {
  alert(
    "Este cajero se encuentra actualmente en mantenimiento, ¡vuelva pronto!"
  );
} else {
  retirarDinero();
}

/*¡const retirarDinero = () => {
    //1. Preguntamos al usuario la cantidad a reitar
    //2. Esa cantidad hay que convertirla de string a número
    //3. Calculamos el total de dinero en el cajero
    //4. calculamos la diferencia entre el total de dinero en cajero y el valor a retirar para calcular el dinero que queda en la caja después de realizar el retiro
    //5. Realizamos las validaciones correspondientes
    //5.1 Si el dinero que queda en caja es menor a 0: "El cajero no tiene sufuciente dinero para darle al cliente"
    //5.2 Si el dinero que queda en caja es igual a 0: el cajero le debe entregar al cliente todo el dinero disponible en caja
    //5.3. Si el dinero que queda en caja es mayor a 0, pueden pasar dos cosas:
    //5.3.1 Cuando en la caja existe suficiente sencillo para entregarle al cliente la cantidad total del retiro
    //5.3.2 Cuando en la caja no hay sencillo.
    //---------La misma lógica de la caja registradora--------------
  };
  
  const transaccionesCajero = () => {
    const usuarioEncontrado = validateUser();
    //Si el usuario ingresado existe, procedemos a validar que tipo de usuario es.
    if (usuarioEncontrado) {
      if (usuarioEncontrado.tipoUsuario === 1) {
        //Es administrador y debe depositar dinero
        depositarDinero();
      } else {
        //Es cliente y debe retirar dinero
        retirarDinero();
      }
    }
  };*/

//Se ejecuta la función de transacción del cajero

//transaccionesCajero();
