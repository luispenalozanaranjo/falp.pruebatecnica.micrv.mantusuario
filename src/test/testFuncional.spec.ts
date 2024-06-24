import { describe, expect, it } from "@jest/globals";
const request = require('supertest');
import { Server } from '../server';
import { config } from "../config/config";


describe('Pruebas con resultado no exitoso', () => {

    const server = new Server();

    it('GET, PUT, DELETE and PATCH should return 405', async () => {

        const url1 = '/api/v1/buscarusuario';
        const url2 = '/api/v1/crearusuario';
        const url3 = '/api/v1/creardireccion';
        const url4 = '/api/v1/buscardireccion';
        const url5 = '/api/v1/actualizardireccion';
        const url6 = '/api/v1/eliminardireccion';

        const [ getRequest, postRequest] = await Promise.all([
            request(server.app).get(url1),
            request(server.app).post(url2),
            request(server.app).post(url3),
            request(server.app).get(url4),
            request(server.app).post(url5),
            request(server.app).post(url6),
        ]);

        expect(getRequest.status).toBe(200);
        expect(postRequest.status).toBe(400);
    });

    it('/api/v1/buscarusuario Busqueda de un rut no existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=18.498.899-2').expect(400);
        expect(res.statusCode).toEqual(400);
        expect(res.body.Detalle).toBe(`Usuario no existe`);
    });

    it('/api/v1/buscarusuario Busqueda de un rut con mal formato', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=18.498.899-3').expect(400);
        expect(res.statusCode).toEqual(400);
        expect(res.body.Detalle).toBe(`El Rut ingresado 18498899-3 es invalido`);
    });

    it('/api/v1/buscardireccion Busqueda de una direccion no existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscardireccion?usuarioId=202').expect(400);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/buscardireccion Busqueda de una direccion con id nu numerico en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscardireccion?usuarioId=202o').expect(400);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario Ejecutar servicio sin Objeto con datos', async () => {
        const res = await request(server.app).post('/api/v1/crearusuario');
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario Ejecutar servicio sin datos en objeto', async () => {
        const res = await request(server.app).post('/api/v1/crearusuario').send({});
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario Enviar datos en servicio con solo el rut', async () => {
        const json = { rut: '14143456-9' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario Enviar dato con el nombre colocando numeros y rut con formato erroneo', async () => {
        const json = { rut: '14143456-9', nombre: 'Lu876' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario Enviar dato con el nombre colocando numeros', async () => {
        const json = { rut: '14143456-k', nombre: 'Lu876' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/crearusuario Enviar registo son el rut erroneo', async () => {
        const json = { rut: '14143456-9', nombre: 'Lus' };
        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/creardireccion Enviar registro sin el objeto', async () => {
        const res = await request(server.app).post('/api/v1/creardireccion');
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/creardireccion enivar registro con objeto y sin los datos pertinentes a la direccion', async () => {
        const res = await request(server.app).post('/api/v1/creardireccion').send({});
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/creardireccion Enviar registro sin enviar la Calle', async () => {
        const json = { numero:"13", ciudad:"El Carmen", usuarioId:"22" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });
	
    it('/api/v1/creardireccion enviar registro sin el numero', async () => {
        const json = { calle:"Av Roma Dinamarca 765", ciudad:"El Carmen", usuarioId:"22" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

	
    it('/api/v1/creardireccion enviar registro sin la ciudad', async () => {
        const json = { calle:"Av Roma Dinamarca 765", numero:"13", usuarioId:"22" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/creardireccion enviar registro sin el usurioId', async () => {
        const json = { calle:"Av Roma Dinamarca 765", numero:"13", ciudad:"El Carmen" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/creardireccion enviar registro sin la ciudad y usuarioId', async () => {
        const json = { calle:"Av Roma Dinamarca 765", numero:"13"};
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/creardireccion enviar registro sin el numero y usuarioId', async () => {
        const json = { calle:"Av Roma Dinamarca 765", ciudad:"El Carmen" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });
	
    it('/api/v1/creardireccion enviar registro sin el numeri y la ciudad', async () => {
        const json = { calle:"Av Roma Dinamarca 765", usuarioId:"22" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });
	
    it('/api/v1/creardireccion enviar registro sin la calle y el usuarioId', async () => {
        const json = { numero:"13", ciudad:"El Carmen" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });
	
	it('/api/v1/creardireccion envio de registro sin la calle y el numero', async () => {
        const json = { numero:"13", usuarioId:"22" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });
	
	it('/api/v1/creardireccion envio de registro sin la calle y el numero', async () => {
        const json = { ciudad:"El Carmen", usuarioId:"22" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });
	
	it('/api/v1/creardireccion envio de registro con solo la calle', async () => {
        const json = { calle:"Av Roma Dinamarca 765" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

	it('/api/v1/creardireccion  envio de registro con solo el numero', async () => {
        const json = { numero:"13" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });
	
	it('/api/v1/creardireccion  envio de registro con solo la ciudad', async () => {
        const json = { ciudad:"El Carmen" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

	it('/api/v1/creardireccion  envio de registro con solo el usuarioId', async () => {
        const json = { usuarioId:"22" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

	it('/api/v1/creardireccion enviao de registro al validar si numero contiene numero', async () => {
        const json = { numero:"22o" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/creardireccion envio de registro con solo el numero', async () => {
        const json = { numero:"22" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });
	
	it('/api/v1/creardireccion envio de regisro al validar solo si existe usuarioId', async () => {
        const json = { usuarioId:"220" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/creardireccion envio de registro si usuarioId contiene letras', async () => {
        const json = { usuarioId:"220iiii" };
        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/creardireccion request que se encarga de enviar un usuarioId que no existe en la tabla de Usuario', async () => {

        const json = {
            calle:"Av Roma Dinamarca 765",
            numero:"13",
            ciudad:"El Carmen",
            usuarioId:"29"
        }

        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        expect(res.statusCode).toEqual(400);
        expect(res.body.Respuesta).toBe('false');
        expect(res.body.Detalle).toBe(`Registro no se encuentra en nuestra base de datos de usuario`);
    });

    it('/api/v1/actualizardireccion request que se encarga de enviar un usuarioId que no existe en tabla Usuario', async () => {

        const json = {
            "id":"3",
            "calle":"Av edgardo mateluna cerda",
            "numero":"4",
            "ciudad":"algarrobo",
            "usuarioId":"220"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
        expect(res.body.Respuesta).toBe('true');
        expect(res.body.Detalle).toBe(`Registro no se encuentra en nuestra base de datos de usuario`);
    });

    it('/api/v1/actualizardireccion Request que se encarga de enviar un id no existente en tabla Direccion', async () => {

        const json = {
            "id":"387",
            "calle":"Av edgardo mateluna cerda",
            "numero":"4",
            "ciudad":"algarrobo",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
        expect(res.body.Respuesta).toBe('true');
        expect(res.body.Detalle).toBe(`Registro no se encuentra en nuestra base de datos de direccion`);
    });

    it('/api/v1/actualizardireccion Request que se encarga de validar el id de la tabla Direccion', async () => {

        const json = {
            "id":"387o",
            "calle":"Av edgardo mateluna cerda",
            "numero":"4",
            "ciudad":"algarrobo",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion request que se encarga de enviar el campo calle vacio', async () => {

        const json = {
            "id":"3",
            "calle":"",
            "numero":"4",
            "ciudad":"algarrobo",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion request que se encarga de enviar el parametro o campo numero con una letra i', async () => {

        const json = {
            "id":"3",
            "calle":"lolo",
            "numero":"i",
            "ciudad":"algarrobo",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion request que se encarga de enviar el parametro o campo ciudad vacio', async () => {

        const json = {
            "id":"3",
            "calle":"hyu nui",
            "numero":"7",
            "ciudad":"",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion request que se encarga de enviar el parametro o campo usuarioId con una letra', async () => {

        const json = {
            "id":"3",
            "calle":"hyu nui",
            "numero":"7",
            "ciudad":"algarrobo",
            "usuarioId":"22i"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion Request que enviar el id con una letra y la calle vacia', async () => {

        const json = {
            "id":"3a",
            "calle":"",
            "numero":"7",
            "ciudad":"algarrobo",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion Request que enviar el id de direccion con letra y campo numero con letra a', async () => {

        const json = {
            "id":"3a",
            "calle":"kkkkk",
            "numero":"a",
            "ciudad":"algarrobo",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion request que envia el id de la direccion con letra y campo numero vacio', async () => {

        const json = {
            "id":"3a",
            "calle":"kkkkk",
            "numero":"",
            "ciudad":"algarrobo",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion request que envia el id de la direccion con letra y la ciudad vacio', async () => {

        const json = {
            "id":"3a",
            "calle":"kkkkk",
            "numero":"765",
            "ciudad":"",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion request que se encarga de enviar el id de la direccion con letra y usuarioId vacio', async () => {

        const json = {
            "id":"3a",
            "calle":"kkkkk",
            "numero":"765",
            "ciudad":"la sasa",
            "usuarioId":""
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/actualizardireccion request que se encarga de enviar el id de la direccion y usuarioId con letra', async () => {

        const json = {
            "id":"3a",
            "calle":"kkkkk",
            "numero":"765",
            "ciudad":"la sasa",
            "usuarioId":"we"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/eliminardireccion Request se encarga de validar si id de la direccion es letra', async () => {

        const json = {
            id:'2w'
        }

        const res = await request(server.app).post('/api/v1/eliminardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });

    it('/api/v1/eliminardireccion Request se encarga de validar si id de la direccion viene vacio', async () => {

        const json = {
            id:''
        }

        const res = await request(server.app).post('/api/v1/eliminardireccion').send(json);
        expect(res.statusCode).toEqual(400);
    });
});


describe('Pruebas con resultado exitoso', () => {

    const server = new Server();

    it('/health should return 200', async () => {
        const res = await request(server.app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('UP');
        expect(res.body.message).toBe('OK');
        expect(res.body.uptime).toBeGreaterThan(0);
        expect(res.body.timestamp).toBeGreaterThan(0);
    });

    it('/health.json should return 200', async () => {
        const res = await request(server.app).get('/health.json');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('UP');
        expect(res.body.message).toBe('OK');
        expect(res.body.uptime).toBeGreaterThan(0);
        expect(res.body.timestamp).toBeGreaterThan(0);
    });

    it('/status should return 200', async () => {
        const res = await request(server.app).get('/status');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('UP');
        expect(res.body.message).toBe('OK');
        expect(res.body.uptime).toBeGreaterThan(0);
        expect(res.body.timestamp).toBeGreaterThan(0);
    });

    it('/api/v1/buscarusuario Busqueda de un rut existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=14143456-k').expect(200);
        expect(res.statusCode).toEqual(200);
    });

    it('/api/v1/buscarusuario Busqueda de un nombre existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?nombre=luis peña').expect(200);
        expect(res.statusCode).toEqual(200);
    });

    it('/api/v1/buscarusuario Busqueda de un primer apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?primer_apellido=peñaloza').expect(200);
        expect(res.statusCode).toEqual(200);
    });
    
    it('/api/v1/buscarusuario Busqueda de un segundo apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?segundo_apellido=naranjo').expect(200);
        expect(res.statusCode).toEqual(200);
    });

    it('/api/v1/buscarusuario Busqueda de un rut y nombre existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=14143456-k&nombre=luis peña').expect(200);
        expect(res.statusCode).toEqual(200);
    });

    it('/api/v1/buscarusuario Busqueda de un rut y primer apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=14143456-k&primer_apellido=peñaloza').expect(200);
        expect(res.statusCode).toEqual(200);
    });
	
    it('/api/v1/buscarusuario Busqueda de un rut y segundo apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=14143456-k&segundo_apellido=naranjo').expect(200);
        expect(res.statusCode).toEqual(200);
    });
	
    it('/api/v1/buscarusuario Busqueda de un nombre y primer apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?nombre=luis peña&primer_apellido=peñaloza').expect(200);
        expect(res.statusCode).toEqual(200);
    });
	
    it('/api/v1/buscarusuario Busqueda de un nombre y segundo apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?nombre=luis peña&segundo_apellido=naranjo').expect(200);
        expect(res.statusCode).toEqual(200);
    });

    it('/api/v1/buscarusuario Busqueda de un primer apellido y segundo apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?primer_apellido=peñaloza&segundo_apellido=naranjo').expect(200);
        expect(res.statusCode).toEqual(200);
    });
    
	it('/api/v1/buscarusuario Busqueda de un nombre y primer apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=14143456-k&nombre=luis peña&primer_apellido=peñaloza').expect(200);
        expect(res.statusCode).toEqual(200);
    });
    
	it('/api/v1/buscarusuario Busqueda de un rut, nombre y segundo apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=14143456-k&nombre=luis peña&segundo_apellido=naranjo').expect(200);
        expect(res.statusCode).toEqual(200);
    });
	
	it('/api/v1/buscarusuario Busqueda de un rut, nombre, primer_apellido y segundo apellido existente en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario?rut=14143456-k&nombre=luis peña&primer_apellido=peñaloza&segundo_apellido=naranjo').expect(200);
        expect(res.statusCode).toEqual(200);
    });

    it('/api/v1/buscardireccion Busqueda de una direccion existente por medio de usuarioId en DB', async () => {

        const res= await request(server.app).get('/api/v1/buscardireccion?usuarioId=22').expect(200);
        expect(res.statusCode).toEqual(200);
    });

    it('/api/v1/buscarusuario Trae todos los registros de la DB Tabla Usuario', async () => {

        const res= await request(server.app).get('/api/v1/buscarusuario');
        expect(res.statusCode).toEqual(200);
        expect(res.body.Detalle).toBe(`Usuario encontrado con Exito`);
    });

    it('/api/v1/crearusuario Crea un usuario o trae como informacion que registro ya existe', async () => {

        const json2 = {
            "rut":"3.656.539-K",
            "nombre":"victor",
            "primer_apellido":"galindo",
            "segundo_apellido":"perez"
        }

        const res = await request(server.app).post('/api/v1/crearusuario').send(json2);
        if(res.statusCode==200){expect(res.statusCode).toEqual(200);}else{expect(res.statusCode).toEqual(400);}
        if(res.statusCode==200){expect(res.body.Respuesta).toBe('true');}else{expect(res.body.Respuesta).toBe('false');}
        if(res.statusCode==200){expect(res.body.Detalle).toBe(`Registro Insertado de forma Exitosa`);}else{expect(res.body.Detalle).toBe(`Registro ya existe en nuestra base de datos`);}
        
    });

    it('/api/v1/crearusuario Se registra al usuario por medio del rut y su nombre', async () => {

        const json = {
            rut:"3.656.539-K",
            nombre:"victor"
        }

        const res = await request(server.app).post('/api/v1/crearusuario').send(json);
        if(res.statusCode==200){expect(res.statusCode).toEqual(200);}else{expect(res.statusCode).toEqual(400);}
        if(res.statusCode==200){expect(res.body.Respuesta).toBe('true');}else{expect(res.body.Respuesta).toBe('false');}
        if(res.statusCode==200){expect(res.body.Detalle).toBe(`Registro Insertado de forma Exitosa`);}else{expect(res.body.Detalle).toBe(`Registro ya existe en nuestra base de datos`);}
    });

    it('/api/v1/creardireccion se registra la direccion y en caso negativo, esta ya esta registrada', async () => {

        const json = {
            calle:"Av Roma Dinamarca 765",
            numero:"13",
            ciudad:"El Carmen",
            usuarioId:"22"
        }

        const res = await request(server.app).post('/api/v1/creardireccion').send(json);
        if(res.statusCode==200){expect(res.statusCode).toEqual(200);}else{expect(res.statusCode).toEqual(400);}
        if(res.statusCode==200){expect(res.body.Respuesta).toBe('true');}else{expect(res.body.Respuesta).toBe('false');}
        if(res.statusCode==200){expect(res.body.Detalle).toBe(`Registro Insertado de forma Exitosa`);}else{expect(res.body.Detalle).toBe(`Registro ya existe en nuestra base de datos`);}
    });

    it('/api/v1/actualizardireccion Se encarga de actualizar los datos de la direccion', async () => {

        const json = {
            "id":"3",
            "calle":"Av edgardo mateluna cerda",
            "numero":"4",
            "ciudad":"algarrobo",
            "usuarioId":"22"
        }

        const res = await request(server.app).post('/api/v1/actualizardireccion').send(json);
        expect(res.statusCode).toEqual(200);
        expect(res.body.Respuesta).toBe('true');
        expect(res.body.Detalle).toBe(`Registro Actualizado de forma Exitosa`);
    });

    it('/api/v1/eliminardireccion Request que se encarga de eliminar el registro en tabla direccion y en caso contrario este ya esta eliminado', async () => {

        const json = {
            id:2
        }

        const res = await request(server.app).post('/api/v1/eliminardireccion').send(json);
        if(res.statusCode==200){expect(res.statusCode).toEqual(200);}else{expect(res.statusCode).toEqual(400);}
        if(res.statusCode==200){expect(res.body.Respuesta).toBe('true');}else{expect(res.body.Respuesta).toBe('false');}
    });
});