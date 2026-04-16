function getData() {
  return JSON.parse(localStorage.getItem("data")) || { pacientes: [] };
}

function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

/* PACIENTE */
function guardarPaciente(e) {
  e.preventDefault();

  let data = getData();

  data.pacientes.push({
    id: Date.now(),
    nombre: nombre.value,
    apellido: apellido.value,
    cedula: cedula.value,
    familiares: [],
    salud: [],
    internamientos: []
  });

  saveData(data);
  renderPacientes();

  e.target.reset();
}

/* LISTA PACIENTES */
function renderPacientes() {
  let lista = document.getElementById("listaPacientes");
  if (!lista) return;

  let data = getData();
  lista.innerHTML = "";

  data.pacientes.forEach(p => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${p.nombre}
      <button onclick="eliminarPaciente(${p.id})">Eliminar</button>
    `;

    lista.appendChild(li);
  });
}

function eliminarPaciente(id) {
  let data = getData();
  data.pacientes = data.pacientes.filter(p => p.id != id);
  saveData(data);
  renderPacientes();
}

/* SELECT */
function cargarSelect() {
  let select = document.getElementById("pacienteSelect");
  if (!select) return;

  let data = getData();
  select.innerHTML = "";

  data.pacientes.forEach(p => {
    let op = document.createElement("option");
    op.value = p.id;
    op.textContent = p.nombre;
    select.appendChild(op);
  });
}

/* FAMILIARES */
function addFamiliar() {
  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  p.familiares.push({
    nombre: famNombre.value,
    parentesco: parentesco.value,
    edad: edadFam.value
  });

  saveData(data);
  renderFamiliares();

  famNombre.value = "";
  parentesco.value = "";
  edadFam.value = "";
}

function renderFamiliares() {
  let lista = document.getElementById("listaFamiliares");
  if (!lista) return;

  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  lista.innerHTML = "";

  p.familiares.forEach((f, i) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${f.nombre} (${f.parentesco})
      <button onclick="deleteFamiliar(${i})">Eliminar</button>
    `;

    lista.appendChild(li);
  });
}

function deleteFamiliar(i) {
  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  p.familiares.splice(i, 1);

  saveData(data);
  renderFamiliares();
}

/* SALUD */
function addSalud() {
  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  p.salud.push({
    enfermedad: enfermedad.value,
    tiempo: tiempo.value + " " + tipoTiempo.value,
    fecha: fechaDiagnostico.value
  });

  saveData(data);
  renderSalud();

  enfermedad.value = "";
  tiempo.value = "";
  fechaDiagnostico.value = "";
}

function renderSalud() {
  let lista = document.getElementById("listaSalud");
  if (!lista) return;

  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  lista.innerHTML = "";

  p.salud.forEach((s, i) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${s.enfermedad} - ${s.tiempo} (${s.fecha})
      <button onclick="deleteSalud(${i})">Eliminar</button>
    `;

    lista.appendChild(li);
  });
}

function deleteSalud(i) {
  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  p.salud.splice(i, 1);

  saveData(data);
  renderSalud();
}

/* INTERNAMIENTOS */
function addInternamiento() {
  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  p.internamientos.push({
    fecha: fecha.value,
    centro: centro.value,
    diagnostico: diagnostico.value
  });

  saveData(data);
  renderInternamientos();

  fecha.value = "";
  centro.value = "";
  diagnostico.value = "";
}

function renderInternamientos() {
  let lista = document.getElementById("listaInternamientos");
  if (!lista) return;

  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  lista.innerHTML = "";

  p.internamientos.forEach((i, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${i.fecha} - ${i.centro}
      <button onclick="deleteInternamiento(${index})">Eliminar</button>
    `;

    lista.appendChild(li);
  });
}

function deleteInternamiento(i) {
  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  p.internamientos.splice(i, 1);

  saveData(data);
  renderInternamientos();
}

/* TABLA */
function mostrarTabla() {
  let data = getData();
  let p = data.pacientes.find(x => x.id == pacienteSelect.value);

  tablaBody.innerHTML = `
    <tr>
      <td>${p.nombre}</td>
      <td>${p.cedula}</td>
      <td>${p.familiares.map(f => f.nombre).join("<br>")}</td>
      <td>${p.salud.map(s => s.enfermedad + " (" + s.fecha + ")").join("<br>")}</td>
      <td>${p.internamientos.map(i => i.centro).join("<br>")}</td>
    </tr>
  `;
}

/* INIT */
window.onload = () => {
  cargarSelect();
  renderPacientes();
  renderFamiliares();
  renderSalud();
  renderInternamientos();
};