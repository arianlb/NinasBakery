import jsonwebtoken from "jsonwebtoken";

export const jwt = (uid: string, role: string, username: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => { 
        const payload = { uid, role, username };
        jsonwebtoken.sign(payload, process.env.JWT_SECRET || 'CualquierMierdadSecreta7', (err, token) => {
            if (err) {
                reject("No se pudo generar el token");
            } else {
                resolve(token);
            }
        });
    });
}