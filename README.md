
# **Consulta Web con SQL Express**  

Este proyecto es una aplicación web desarrollada con **HTML, CSS y JavaScript**, que realiza consultas directas a una base de datos SQL Express. La aplicación permite a los usuarios buscar información utilizando varios filtros (meses, tipo de objeto, entre otros) y exportar los resultados en formato **Excel**.  

## **Características**
- Consulta directa a SQL Express desde una API Node.js.
- Filtros por **mes** y **tipo de objeto**.
- Búsqueda por **código** y **lote**.
- Exportación del resultado en formato **Excel**.
- Diseño responsivo utilizando **Bootstrap**.

---

## **Requisitos previos**
- **Node.js** (versión LTS recomendada).
- **SQL Server Express** (con puerto y autenticación configurados).
- **npm** (incluido con Node.js).
- Conexión a una red que permita acceder a la instancia de SQL Express.
  
---

## **Instalación y configuración**

### 1. **Clonar el repositorio**
```bash
git clone https://github.com/josecarde2407/Web-Consultas.git
cd Web-Consultas
```

### 2. **Instalar las dependencias**
Dentro del directorio del proyecto, ejecuta:
```bash
npm install express mssql xlsx
```

### 3. **Configuración de la conexión SQL Express**  
Modifica el archivo JavaScript (`fronted.js` o tu archivo de backend) con los parámetros correctos para conectar a tu base de datos:

```javascript
const config = {
    server: 'localhost',
    database: 'MOVIMIENTOSMA',
    port: 19780,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    authentication: {
        type: 'ntlm',
        options: {
            domain: 'SMASAC',
            userName: 'jose.cardenas',
            password: 'Smasac1230.'
        }
    }
};
```

### 4. **Ejecutar el servidor**
```bash
node fronted.js
```
El servidor estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## **Estructura del Proyecto**
```
/public
│  ├── index.html        # Interfaz principal del usuario
│  ├── styles.css        # Estilos CSS personalizados
│  └── fronted.js        # Lógica del backend con Express y SQL
│
/node_modules            # Dependencias del proyecto
README.md                # Documentación del proyecto
package.json             # Configuración del proyecto
```

---

## **Uso**
1. **Acceder a la interfaz** en: [http://localhost:3000](http://localhost:3000).
2. **Rellenar los campos** de búsqueda (código, lote, mes, tipo de objeto).
3. **Consultar** los resultados haciendo clic en "Consultar".
4. **Descargar** los resultados como archivo Excel utilizando el botón "Descargar Resultados".

---

## **Tecnologías utilizadas**
- **Frontend**: HTML5, CSS3, Bootstrap 4.5, JavaScript.
- **Backend**: Node.js con Express.
- **Base de datos**: SQL Server Express.
- **Exportación a Excel**: Librería XLSX.js.

---

## **Consideraciones importantes**
- Asegúrate de que el **puerto TCP (19780)** esté abierto y accesible para las conexiones remotas.
- Si usas autenticación NTLM, verifica que el usuario y contraseña tengan los permisos adecuados en la base de datos.
- **Certificados autofirmados** deben ser permitidos si la base de datos no utiliza uno válido.

---

## **Problemas comunes**
- **Error de conexión**: Verifica que SQL Server Express esté corriendo y que el puerto esté abierto.
- **Acceso denegado**: Asegúrate de que las credenciales proporcionadas sean correctas.
- **No muestra resultados**: Asegúrate de que los parámetros de búsqueda coincidan con los datos en la base de datos.

---

## **Licencia**
Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

---

Si necesitas más ayuda o tienes problemas para configurar el proyecto, no dudes en crear un **issue** en el repositorio o contactarme.
