const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Si los archivos HTML están en la carpeta 'public'

const config = {
    server: 'localhost', 
    database: 'MOVIMIENTOSMA',
    port: 19780, 
    options: {
        encrypt: true, // Esto depende de si necesitas o no cifrado
        trustServerCertificate: true // Si estás usando certificados autofirmados
    },
    authentication: {
        type: 'ntlm',
        options: {
            domain: 'SMASAC', // Dominio del usuario
            userName: 'jose.cardenas', // Nombre de usuario sin el dominio
            password: 'Smasac1230.' // Contraseña del usuario
        }
    }
};


app.get('/consulta', async (req, res) => {
    const { parametro1, parametro2 } = req.query;

    console.log('Consultando con parámetros:', parametro1, parametro2);  // Loguear parámetros recibidos

    try {
        await sql.connect(config);

        const result = await sql.query`
            SELECT SEDE, FECHA, MEES, NROSAP, OBJETO, N_ARTICULO, DESCRIPCION, LOTSMA, 
                   LOTPROVEEDOR, CANTIDAD, OT, OC, NOMALMACEN, COMENTARIO, USUARIO
            FROM MOVPRUEBA
            WHERE N_ARTICULO = ${parametro1} AND LOTSMA = ${parametro2}`;

        console.log('Resultado de la consulta:', result);  // Loguear el resultado de la consulta

        if (result.recordset.length > 0) {
            res.json({ data: result.recordset });
        } else {
            res.json({ data: [] });
        }
    } catch (err) {
        console.error('Error en la consulta SQL:', err);
        res.status(500).send('Error en la consulta');
    } finally {
        await sql.close();  // Cierra la conexión a la base de datos
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

