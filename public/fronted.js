document.getElementById('consultaForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevenir la recarga de la página al enviar el formulario

    // Obtener los valores de los inputs
    const codigo = document.getElementById('parametro1').value;
    const lote = document.getElementById('parametro2').value;

    // Validar que ambos campos estén completos
    if (!codigo || !lote) {
        alert("Por favor, complete ambos campos.");
        return;
    }

    // Crear un arreglo para los meses en español
    const mesesEnEspanol = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"
    ];

    // Hacer la solicitud GET al servidor con los parámetros correctos
    try {
        const response = await fetch(`/consulta?parametro1=${codigo}&parametro2=${lote}`);
        console.log(response);  // Loguear la respuesta

        if (!response.ok) {
            alert("Error al realizar la consulta");
            return;
        }

        const result = await response.json();  // Obtener los datos en formato JSON
        let data = result.data;  // Acceder a la propiedad 'data' en el objeto JSON

        // Obtener los filtros seleccionados
        const filtroMesSelect = document.getElementById('filtroMes');
        const filtroObjetoSelect = document.getElementById('filtroObjeto');

        // Limpiar los selectores de filtro
        filtroMesSelect.innerHTML = '';
        filtroObjetoSelect.innerHTML = '';

        // Añadir la opción "Todos" al filtro de meses
        const optionTodosMes = document.createElement('option');
        optionTodosMes.value = '';
        optionTodosMes.textContent = 'Todos';
        filtroMesSelect.appendChild(optionTodosMes);

        // Añadir la opción "Todos" al filtro de objetos
        const optionTodosObjeto = document.createElement('option');
        optionTodosObjeto.value = '';
        optionTodosObjeto.textContent = 'Todos';
        filtroObjetoSelect.appendChild(optionTodosObjeto);

        // Obtener valores únicos para llenar los filtros
        const mesesUnicos = new Set();
        const objetosUnicos = new Set();

        data.forEach(row => {
            const fecha = new Date(row.FECHA);
            const mes = mesesEnEspanol[fecha.getMonth()];
            mesesUnicos.add(mes);
            objetosUnicos.add(row.OBJETO);
        });

        // Llenar el filtro de meses
        mesesUnicos.forEach(mes => {
            const option = document.createElement('option');
            option.value = mes;
            option.textContent = mes;
            filtroMesSelect.appendChild(option);
        });

        // Llenar el filtro de objetos
        objetosUnicos.forEach(objeto => {
            const option = document.createElement('option');
            option.value = objeto;
            option.textContent = objeto;
            filtroObjetoSelect.appendChild(option);
        });

        // Función para aplicar filtros
        const aplicarFiltros = () => {
            let filteredData = data;

            const filtroMes = filtroMesSelect.value;
            const filtroObjeto = filtroObjetoSelect.value;

            // Filtrar por mes solo si no se selecciona "Todos"
            if (filtroMes) {
                filteredData = filteredData.filter(row => {
                    const fecha = new Date(row.FECHA);
                    const mes = mesesEnEspanol[fecha.getMonth()];
                    return mes === filtroMes;
                });
            }

            // Filtrar por objeto solo si no se selecciona "Todos"
            if (filtroObjeto) {
                filteredData = filteredData.filter(row => row.OBJETO === filtroObjeto);
            }

            // Obtener el cuerpo de la tabla donde insertaremos los resultados
            const tablaCuerpo = document.getElementById('tablaCuerpo');
            tablaCuerpo.innerHTML = '';  // Limpiar la tabla antes de insertar los nuevos datos

            // Ordenar los datos por fecha
            filteredData.sort((a,b) => new Date(a.FECHA)-new Date(b.FECHA));

            // Crear un string para almacenar las filas de la tabla
            let rows = '';

            // Insertar los resultados en la tabla
            if (filteredData.length > 0) {
                filteredData.forEach(row => {
                    // Convertir la fecha a un objeto Date
                    const fecha = new Date(row.FECHA);
                    // Obtener el mes en español
                    const mes = mesesEnEspanol[fecha.getMonth()]; // 0-11 para enero-diciembre
                    // Formatear la fecha
                    const fechaFormateada = `${fecha.getDate()}${mes}${fecha.getFullYear()}`;

                    rows += `
                        <tr>
                            <td>${row.SEDE}</td>
                            <td>${fechaFormateada}</td> <!-- Usar la fecha formateada -->
                            <td>${mes}</td> <!-- Usar el mes en español -->
                            <td>${row.NROSAP}</td>
                            <td>${row.OBJETO}</td>
                            <td>${row.N_ARTICULO}</td>
                            <td>${row.DESCRIPCION}</td>
                            <td>${row.LOTSMA}</td>
                            <td>${row.LOTPROVEEDOR}</td>
                            <td>${row.CANTIDAD}</td>
                            <td>${row.OT}</td>
                            <td>${row.OC}</td>
                            <td>${row.NOMALMACEN}</td>
                            <td>${row.COMENTARIO}</td>
                            <td>${row.USUARIO}</td>
                        </tr>
                    `;
                });
                // Asignar las filas al cuerpo de la tabla de una sola vez
                tablaCuerpo.innerHTML = rows;
            } else {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = 15;
                td.textContent = 'No se encontraron resultados.';
                tr.appendChild(td);
                tablaCuerpo.appendChild(tr);
            }
        };

        // Aplicar los filtros por defecto
        aplicarFiltros();

        // Añadir eventos para aplicar filtros al cambiar de valor
        filtroMesSelect.addEventListener('change', aplicarFiltros);
        filtroObjetoSelect.addEventListener('change', aplicarFiltros);

        // Función para descargar la tabla en formato XLS
        document.getElementById('downloadBtn').addEventListener('click', () => {
            const table = document.getElementById('resultadosTabla'); // Asegúrate de que este sea el ID correcto de la tabla
            if (!table || table.rows.length <= 1) { // Verificar si la tabla tiene datos
                alert("No hay datos para descargar.");
                return;
            }
            const ws = XLSX.utils.table_to_sheet(table);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
            XLSX.writeFile(wb, 'resultados.xlsx');
        });

    } catch (error) {
        console.error("Error en la solicitud:", error);  // Loguear el error si ocurre
        alert("Hubo un problema con la solicitud.");
    }
});
