// ============================
//  Puerto
// ============================
process.env.PORT = 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = '1d';


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

// if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/api';
// } else {
//     urlDB = process.env.MONGO_URI;
// }
process.env.URLDB = urlDB;