import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Server from '../../src/models/server';

dotenv.config();
const app = new Server().getApp();

describe('Controlador de Login en el metodo POST de la URL /api/login', () => {

    test('Deberia devolver el usuario y el token', async () => {
        const response = await request(app).post('/api/login').send({
            username: 'testuser',
            password: 'testuser'
        });
        expect(response.status).toBe(200);
        expect(response.body.user).toHaveProperty('_id');
        expect(response.body.token).toBeDefined();
    });

    test('Deberia devolver un error 400 si el email no existe', async () => {
        const response = await request(app).post('/api/login').send({
            password: 'testuser'
        });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('El username es obligatorio');
    });

    test('Deberia devolver un error 400 si el password no existe', async () => {
        const response = await request(app).post('/api/login').send({
            username: 'testuser'
        });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('El password es obligatorio');
    });

    test('Deberia devolver un error 404 si el password es incorrecto', async () => {
        const response = await request(app).post('/api/login').send({
            username: 'testuser',
            password: 'incorrecto'
        });
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe('Username o Password incorrecto');
    });

    test('Deberia devolver un error 404 si el username es incorrecto', async () => {
        const response = await request(app).post('/api/login').send({
            username: 'incorrecto',
            password: 'testuser'
        });
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe('Username o Password incorrecto');
    });
});

afterAll(async () => {
    mongoose.connection.close();
});