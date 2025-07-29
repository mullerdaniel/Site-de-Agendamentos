const data = document.getElementById('data');
const horario = document.getElementById('horario');
const profissional = document.getElementById('profissional');
const btnAgendar = document.getElementById('btn-agendar');

function verificarCampos() {
  if (data.value && horario.value && profissional.value) {
    btnAgendar.disabled = false;
  } else {
    btnAgendar.disabled = true;
  }
}

data.addEventListener('change', verificarCampos);
horario.addEventListener('change', verificarCampos);
profissional.addEventListener('change', verificarCampos);

function mostrarAgendamento() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('form-agendamento').style.display = 'block';
}

function mostrarMeusAgendamentos() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('meus-agendamentos').style.display = 'block';
  carregarAgendamentos();
}

function voltarHome() {
  document.getElementById('form-agendamento').style.display = 'none';
  document.getElementById('meus-agendamentos').style.display = 'none';
  document.getElementById('home').style.display = 'block';

  data.value = '';
  horario.value = '';
  profissional.value = '';
  verificarCampos();
}

function agendar() {
  const novoAgendamento = {
    data: data.value,
    horario: horario.value,
    profissional: profissional.value
  };

  let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  agendamentos.push(novoAgendamento);
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

  alert('Agendamento realizado com sucesso!');
  voltarHome();
}

function carregarAgendamentos() {
  const container = document.getElementById('lista-agendamentos');
  container.innerHTML = '';

  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  if (agendamentos.length === 0) {
    container.innerHTML = '<p>Nenhum agendamento encontrado.</p>';
  } else {
    agendamentos.forEach(item => {
      const div = document.createElement('div');
      div.className = 'agendamento';
      div.innerText = `Data: ${item.data} | Horário: ${item.horario} | Profissional: ${item.profissional}`;
      container.appendChild(div);
    });
  }
}
