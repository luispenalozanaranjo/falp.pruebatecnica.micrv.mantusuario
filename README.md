# falp.pruebatecnica.micrv.mantusuario

Los endpoint del servicio

1.- crearusuario: 'localhost:<puerto asignado>/api/v1/crearusuario'                TIPO = POST

Ejemplo:

{
    "rut":"11.774.331-4",
    "nombre":"pancho",
    "primer_apellido":"villa",
    "segundo_apellido":"suarez"
}

2.- buscarusuario: 'localhost:<puerto asignado>/api/v1/buscarusuario'              TIPO = GET

Ejemplo:

localhost:<puerto asignado>/api/v1/buscarusuario?rut=14143456-k&nombre=luis&primer_apellido=peñaloza&segundo_apellido=suarez

3.- creardireccion: 'localhost:<puerto asignado>/api/v1/creardireccion'            TIPO = POST

Ejemplo:

{
    "calle":"Av Roma Dinamarca 765",
    "numero":"13",
    "ciudad":"La palestra",
    "usuarioId":"24"
}

4.- buscardireccion: 'localhost:<puerto asignado>/api/v1/buscardireccion'          TIPO = GET

Ejemplo:

http://localhost:<puerto asignado>/api/v1/buscardireccion?usuarioId=25

5.- eliminardireccion: 'localhost:<puerto asignado>/api/v1/eliminardireccion'      TIPO = POST

Ejemplo:

{
    "id":"28"
}

6.- actualizardireccion: 'localhost:<puerto asignado>/api/v1/actualizardireccion'  TIPO = POST

Ejemplo:

{
    "id":"3",
    "calle":"nhki",
    "numero":"2",
    "ciudad":"algarrobo",
    "usuarioId":"23"
}
