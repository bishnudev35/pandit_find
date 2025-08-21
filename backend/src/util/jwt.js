import jwt from 'jsonwebtoken';

const jwtSign=(payload, secret) => {
    if (!payload || !secret) {  
        throw new Error('Payload and secret are required for JWT signing');}
        
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return token;}
    export default jwtSign;
