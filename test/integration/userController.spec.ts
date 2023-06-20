import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Server from '../../src/models/server';

dotenv.config();
const app = new Server().getApp();

let tokenAdmin = '';
let tokenUser = '';
let userAdminId = '';
let usernameAdmin = '';

beforeAll(async () => {
    const response = await request(app).post('/api/login').send({
        username: 'testadmin',
        password: 'testadmin'
    });
    tokenAdmin = response.body.token;
    userAdminId = response.body.user._id;
    usernameAdmin = response.body.user.username;

    const response2 = await request(app).post('/api/login').send({
        username: 'testuser',
        password: 'testuser'
    });
    tokenUser = response2.body.token;
});

describe('Controlador de Usuarios en el metodo GET de la URL /api/users', () => {

    test('Debería devolver un error 401 si el token no existe', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('No hay token en la petición');
    });

    test('Debería devolver un error 401 si el token es incorrecto', async () => {
        const response = await request(app).get('/api/users').set('Authorization', 'token');
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Token no válido');
    });

    test('Debería devolver un error 403 si el token no es de un usuario administrador', async () => {
        const response = await request(app).get('/api/users').set('Authorization', tokenUser);
        expect(response.status).toBe(403);
        expect(response.body.msg).toBe('No tiene permisos para realizar esta acción');
    });

    test('Debería devolver un array de usuarios', async () => {
        const response = await request(app).get('/api/users').set('Authorization', tokenAdmin);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
    });

});

describe('Controlador de Usuarios en el metodo GET de la URL /api/users/:id', () => {

    test('Debería devolver un error 401 si el token no existe', async () => {
        const response = await request(app).get('/api/users/' + userAdminId);
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('No hay token en la petición');
    });

    test('Debería devolver un error 401 si el token es incorrecto', async () => {
        const response = await request(app).get('/api/users/' + userAdminId).set('Authorization', 'token');
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Token no válido');
    });

    test('Debería devolver un error 403 si el token no es de un usuario administrador', async () => {
        const response = await request(app).get('/api/users/' + userAdminId).set('Authorization', tokenUser);
        expect(response.status).toBe(403);
        expect(response.body.msg).toBe('No tiene permisos para realizar esta acción');
    });

    test('Debería devolver un error 400 si no provee de un id valido', async () => {
        const response = await request(app).get('/api/users/id-no-valido').set('Authorization', tokenAdmin);
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('No es un Id válido');
    });

    test('Debería devolver un error 404 si el usuario no se encuentra en la base de datos', async () => {
        const char = userAdminId.charAt(userAdminId.length - 1);
        const id = char + userAdminId.substring(0, userAdminId.length - 1);
        const response = await request(app).get('/api/users/' + id).set('Authorization', tokenAdmin);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe('No existe el usuario con el id: ' + id);
    });

    test('Debería devolver un usuario', async () => {
        const response = await request(app).get('/api/users/' + userAdminId).set('Authorization', tokenAdmin);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
    });

});

describe('Controlador de Usuarios en el metodo POST de la URL /api/users', () => {

    test('Debería devolver un error 401 si el token no existe', async () => {
        const response = await request(app).post('/api/users');
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('No hay token en la petición');
    });

    test('Debería devolver un error 401 si el token es incorrecto', async () => {
        const response = await request(app).post('/api/users').set('Authorization', 'token');
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Token no válido');
    });

    test('Debería devolver un error 403 si el token no es de un usuario administrador', async () => {
        const response = await request(app).post('/api/users').set('Authorization', tokenUser);
        expect(response.status).toBe(403);
        expect(response.body.msg).toBe('No tiene permisos para realizar esta acción');
    });

    test('Debería devolver un error 400 si no se provee el username', async () => {
        const response = await request(app).post('/api/users').set('Authorization', tokenAdmin).send({});
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('El username es obligatorio');
    });

    test('Debería devolver un error 400 si ya existe un usuario con ese username', async () => {
        const response = await request(app).post('/api/users').set('Authorization', tokenAdmin).send({
            username: usernameAdmin
        });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe(`El nombre de usuario ${usernameAdmin} ya existe en la BD`);
    });

    test('Debería devolver un error 400 si no se provee el password', async () => {
        const response = await request(app).post('/api/users').set('Authorization', tokenAdmin).send({
            username: 'test',
        });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('El password es obligatorio');
    });

    test('Debería devolver un error 400 si no se provee el rol', async () => {
        const response = await request(app).post('/api/users').set('Authorization', tokenAdmin).send({
            username: 'test',
            password: 'test',
        });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('El rol es obligatorio');
    });

    test('Debería devolver un error 400 si no se provee un rol válido', async () => {
        const response = await request(app).post('/api/users').set('Authorization', tokenAdmin).send({
            username: 'test',
            password: 'test',
            role: 'ROLE_TEST'
        });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('El rol ROLE_TEST no esta permitido');
    });
});

describe('Controlador de Usuarios en el metodo PUT de la URL /api/users/:id', () => {

    test('Debería devolver un error 401 si el token no existe', async () => {
        const response = await request(app).put('/api/users/' + userAdminId);
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('No hay token en la petición');
    });

    test('Debería devolver un error 401 si el token es incorrecto', async () => {
        const response = await request(app).put('/api/users/' + userAdminId).set('Authorization', 'token');
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Token no válido');
    });

    test('Debería devolver un error 403 si el token no es de un usuario administrador', async () => {
        const response = await request(app).put('/api/users/' + userAdminId).set('Authorization', tokenUser);
        expect(response.status).toBe(403);
        expect(response.body.msg).toBe('No tiene permisos para realizar esta acción');
    });

    test('Debería devolver un error 400 si no provee de un id valido', async () => {
        const response = await request(app).put('/api/users/id-no-valido').set('Authorization', tokenAdmin);
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('No es un Id válido');
    });

    test('Debería devolver un error 400 si el usuario no se encuentra en la base de datos', async () => {
        const char = userAdminId.charAt(userAdminId.length - 1);
        const id = char + userAdminId.substring(0, userAdminId.length - 1);
        const response = await request(app).put('/api/users/' + id).set('Authorization', tokenAdmin);
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe(`El usuario con el id ${id} no existe en la BD`);
    });

});

describe('Controlador de Usuarios en el metodo DELETE de la URL /api/users/:id', () => {

    test('Debería devolver un error 401 si el token no existe', async () => {
        const response = await request(app).delete('/api/users/' + userAdminId);
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('No hay token en la petición');
    });

    test('Debería devolver un error 401 si el token es incorrecto', async () => {
        const response = await request(app).delete('/api/users/' + userAdminId).set('Authorization', 'token');
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Token no válido');
    });

    test('Debería devolver un error 403 si el token no es de un usuario administrador', async () => {
        const response = await request(app).delete('/api/users/' + userAdminId).set('Authorization', tokenUser);
        expect(response.status).toBe(403);
        expect(response.body.msg).toBe('No tiene permisos para realizar esta acción');
    });

    test('Debería devolver un error 400 si no provee de un id valido', async () => {
        const response = await request(app).delete('/api/users/id-no-valido').set('Authorization', tokenAdmin);
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('No es un Id válido');
    });

    test('Debería devolver un error 400 si el usuario no se encuentra en la base de datos', async () => {
        const char = userAdminId.charAt(userAdminId.length - 1);
        const id = char + userAdminId.substring(0, userAdminId.length - 1);
        const response = await request(app).delete('/api/users/' + id).set('Authorization', tokenAdmin);
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe(`El usuario con el id ${id} no existe en la BD`);
    });

});


afterAll(async () => {
    mongoose.connection.close();
});