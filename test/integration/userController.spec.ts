import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Server from '../../src/models/server';

dotenv.config();
const app = new Server().getApp();

describe('Controlador de Usuarios en el metodo GET de la URL /api/users', () => {

    test('Debería devolver la lista de usuarios', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

afterAll(async () => {
    mongoose.connection.close();
});