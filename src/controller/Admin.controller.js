const {
    firebase
} = require('../configFirebase');
const {
    patch
} = require('../router');

const controlador = {};
const db = firebase.firestore();
const auth = firebase.auth();

controlador.login = (req, res) => {
    res.render('index');
}

controlador.admin = async (req, res) => {
    res.render("./admin", {
        clientes: await leerdatos()
    });
}

const leerdatos = () => {
    return new Promise(resolve => {
        let listaCliente = [];
        db.collection("clientes").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    listaCliente.push(doc.data())
                });
                resolve(listaCliente);

            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    })
}


controlador.reservasa = async (req, res) => {
    console.log(req.body);
    await db.collection("clientes").add({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correoe_lectronico: req.body.correoelectronico,
            telefono: req.body.telefono,
            fecha_de_entrada: req.body.fechaentrada,
            fecha_de_salida: req.body.fechasalida,
            tipo_habitacion: req.body.tipohabitacion,
            numero_habitacion: req.body.nhabitacion,
            estado_cliente: req.body.estadoo,
        })
        .then(async (docRef) => {
            await docRef.update({
                idcliente: docRef.id
            })
            console.log("Document written with ID: ", docRef.id);
            alert('Reserva realizada', docRef.id);
            limpiarDatos();
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
    res.render("./admin", {
        clientes: await leerdatos()
    });
}



//--------------------------------------------

controlador.registarUsuario = (req, res) => {
    console.log(req.body);
    auth.createUserWithEmailAndPassword(req.body.emailUser, req.body.passUser)
        .then(() => {
            console.log(auth.currentUser);
        })
        .catch(function (error) {
            console.log("Error: ", error.message);
        });
    res.render('index');
}


controlador.initlogin = (req, res) => {
    console.log(req.body);
    auth.signInWithEmailAndPassword(req.body.emailUser, req.body.passUser)
        .then(async () => {
            res.render("./admin", {
                clientes: await leerdatos()
            });
        })
        .catch(function (error) {
            console.log("Error: ", error.message);
            limpiarDatosLogin();
        });
}
controlador.cerrarSesion = (req, res) => {
    console.log(req.body);
    auth.signOut()
        .then(() => {
            console.log("Sesion cerrada exitosamente");
            res.redirect('/');

        }).catch((error) => {
            console.log(error.message)
        });
}

controlador.eliminarclientes = (req, res) => {
    console.log(req.params.id);
    db.collection("clientes")
        .doc(req.params.id)
        .delete()
        .then(() => {

            console.log("DELETED: " + req.params.id);
            res.redirect('/admin');
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

};

controlador.editarclientes = (req, res) => {

    var id = req.params.id;
    console.log(id);
    db.collection("clientes").doc(id).get()
        .then((doc) => {
            var id = doc.data().id;
            var nombre = doc.data().nombre;
            var apellido = doc.data().apellido;
            var correoelectronico = doc.data().correoe_lectronico;
            var telefono = doc.data().telefono;
            var fechaentrada = doc.data().fecha_de_entrada;
            var fechasalida = doc.data().fecha_de_salida;
            var tipohabitacion = doc.data().tipo_habitacion;
            var nhabitacion = doc.data().numero_habitacion;
            var estadoo = doc.data().estado_cliente;
            res.render("./actualizarcontacto", {
                id,
                nombre,
                apellido,
                correoelectronico,
                telefono,
                fechaentrada,
                fechasalida,
                tipohabitacion,
                nhabitacion,
                estadoo,
            });
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

controlador.actualizarDatos = async (req, res) => {
    console.log(req.body);
    await db.collection("clientes").doc(req.body.aid).update({
            nombre: req.body.anombre,
            apellido: req.body.aapellido,
            correoe_lectronico: req.body.acorreoelectronico,
            telefono: req.body.atelefono,
            fecha_de_entrada: req.body.afechaentrada,
            fecha_de_salida: req.body.afechasalida,
            tipo_habitacion: req.body.atipohabitacion,
            numero_habitacion: req.body.anhabitacion,
            estado_cliente: req.body.aestadoo,
        })
        .then(async (docRef) => {
            await docRef.update({
                idcliente: docRef.id
            })
            console.log("Document written with ID: ", docRef.id);
            alert('Reserva realizada', docRef.id);
            limpiarDatos();
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
    res.render("./admin", {
        clientes: await leerdatos()
    });
}




module.exports = controlador;