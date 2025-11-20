<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const API_URL = 'http://127.0.0.0:19003/api'

const agendamentos = ref([])
const veterinarios = ref([])
const pets = ref([])
const servicos = ref([])
const showNovoAgendamento = ref(false)
const submitError = ref(null)
const successMessage = ref(null)
const loading = ref(false)
const filters = ref({ status: '' })

const novoAgendamento = ref({
  data_hora: '',
  pet: '',
  veterinario: '',
  servico: ''
})

const showSuccess = (msg) => {
  successMessage.value = msg
  setTimeout(() => (successMessage.value = null), 3000)
}

const showError = (msg) => {
  submitError.value = msg
  setTimeout(() => (submitError.value = null), 5000)
}

const formatDateTime = (dt) => {
  if (!dt) return 'N/A'
  try {
    return new Date(dt).toLocaleString('pt-BR')
  } catch {
    return dt
  }
}

const getStatusDisplay = (status) => {
  const map = {
    pendente: 'Pendente',
    confirmado: 'Confirmado',
    cancelado: 'Cancelado'
  }
  return map[status] || status
}

const clearFilters = () => {
  filters.value = { status: '' }
  fetchAgendamentos()
}

const resetNovoAgendamento = () => {
  novoAgendamento.value = {
    data_hora: '',
    pet: '',
    veterinario: '',
    servico: ''
  }
}

const fecharModal = () => {
  showNovoAgendamento.value = false
  resetNovoAgendamento()
  submitError.value = null
}

/* ------------------------------
      FUNÇÃO CORRIGIDA
--------------------------------*/
const fetchAgendamentos = async () => {
  loading.value = true
  try {
    const { data } = await axios.get(`${API_URL}/agendamentos/`, {
      params: filters.value
    })

    const lista = data.results || []

    agendamentos.value = lista.map(a => ({
      id: a.id,
      data_hora: a.data_hora,
      status: a.status,
      pet_info: a.pet || null,
      veterinario_info: a.veterinario || null,
      servico_info: a.servico || null,
      tutor_info: a.pet?.tutor || null
    }))
  } catch (error) {
    console.error(error)
    showError('Erro ao carregar agendamentos.')
    agendamentos.value = []
  } finally {
    loading.value = false
  }
}

const fetchDadosAuxiliares = async () => {
  try {
    const [vRes, pRes, sRes] = await Promise.all([
      axios.get(`${API_URL}/veterinarios/`).catch(() => ({ data: [] })),
      axios.get(`${API_URL}/pets/`).catch(() => ({ data: [] })),
      axios.get(`${API_URL}/servicos/`).catch(() => ({ data: [] }))
    ])

    veterinarios.value = vRes.data.results || vRes.data
    pets.value = (pRes.data.results || pRes.data).map(p => ({
      ...p,
      tutor_nome: p.tutor?.nome || 'Sem tutor'
    }))
    servicos.value = sRes.data.results || sRes.data
  } catch (error) {
    console.error(error)
    showError('Erro ao carregar dados auxiliares.')
  }
}

const criarAgendamento = async () => {
  submitError.value = null

  if (
    !novoAgendamento.value.data_hora ||
    !novoAgendamento.value.pet ||
    !novoAgendamento.value.veterinario ||
    !novoAgendamento.value.servico
  ) {
    showError('Todos os campos são obrigatórios.')
    return
  }

  try {
    const payload = {
      data_hora: new Date(novoAgendamento.value.data_hora).toISOString(),
      pet: parseInt(novoAgendamento.value.pet),
      veterinario: parseInt(novoAgendamento.value.veterinario),
      servico: parseInt(novoAgendamento.value.servico),
      status: 'pendente'
    }

    await axios.post(`${API_URL}/agendamentos/`, payload)

    fecharModal()
    await fetchAgendamentos()
    showSuccess('Agendamento criado com sucesso!')

    await nextTick()
    router.push({ name: 'Agendamentos' })

  } catch (error) {
    console.error(error)
    showError(
      error.response?.data
        ? `Erro: ${JSON.stringify(error.response.data)}`
        : 'Erro ao criar agendamento.'
    )
  }
}

const confirmarAgendamento = async (id) => {
  try {
    await axios.patch(`${API_URL}/agendamentos/${id}/`, { status: 'confirmado' })
    fetchAgendamentos()
    showSuccess('Agendamento confirmado!')
  } catch {
    showError('Erro ao confirmar agendamento.')
  }
}

const cancelarAgendamento = async (id) => {
  if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return
  try {
    await axios.patch(`${API_URL}/agendamentos/${id}/`, { status: 'cancelado' })
    fetchAgendamentos()
    showSuccess('Agendamento cancelado!')
  } catch {
    showError('Erro ao cancelar agendamento.')
  }
}


const deletarAgendamento = async (id) => {
  if (!confirm('Tem certeza que deseja excluir definitivamente este agendamento?')) return
  
  try {
    await axios.delete(`${API_URL}/agendamentos/${id}/`)
    fetchAgendamentos()
    showSuccess('Agendamento excluído com sucesso!')
  } catch (error) {
    console.error(error)
    showError('Erro ao excluir agendamento.')
  }
}

const fetchProximosAgendamentos = async () => {
  loading.value = true
  try {
    const hoje = new Date().toISOString().split('T')[0]

    const { data } = await axios.get(`${API_URL}/agendamentos/`, {
      params: { data_inicio: hoje }
    })

    agendamentos.value = data.results || []
    showSuccess('Exibindo próximos agendamentos!')
  } catch {
    showError('Erro ao carregar próximos agendamentos.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAgendamentos()
  fetchDadosAuxiliares()
})
</script>


<template>
  <div class="agendamentos-container">
    <h1>Agendamentos</h1>
    
    <div v-if="submitError" class="alert alert-error">{{ submitError }}</div>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

    <div class="filters">
      <div class="filter-group">
        <label for="status">Status:</label>
        <select id="status" v-model="filters.status" @change="fetchAgendamentos">
          <option value="">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
      <button @click="clearFilters" class="btn-clear">Limpar Filtros</button>
    </div>

    <div class="actions">
      <button @click="showNovoAgendamento = true" class="btn-primary">Novo Agendamento</button>
      <button @click="fetchProximosAgendamentos" class="btn-secondary">Próximos Agendamentos</button>
    </div>

    <div class="agendamentos-list">
      <div v-if="loading" class="loading"><div class="spinner"></div> Carregando...</div>
      <div v-else-if="agendamentos.length === 0" class="no-data"><p>Nenhum agendamento encontrado.</p></div>

      <div v-else class="agendamentos-grid">
        <div v-for="agendamento in agendamentos" :key="agendamento.id" class="agendamento-card">
          <div class="agendamento-header">
            <h3>{{ formatDateTime(agendamento.data_hora) }}</h3>
            <span :class="`status status-${agendamento.status}`">{{ getStatusDisplay(agendamento.status) }}</span>
          </div>

          <div class="agendamento-info">
            <div><strong>Pet:</strong> {{ agendamento.pet_info?.nome || 'N/A' }}</div>
            <div><strong>Veterinário:</strong> {{ agendamento.veterinario_info?.nome_completo || 'N/A' }}</div>
            <div><strong>Serviço:</strong> {{ agendamento.servico_info?.nome || 'N/A' }}</div>
            <div><strong>Tutor:</strong> {{ agendamento.tutor_info?.nome || 'N/A' }}</div>
          </div>
          <div class="agendamento-actions">

          
            <button 
              v-if="agendamento.status === 'pendente'" 
              @click="confirmarAgendamento(agendamento.id)" 
              class="btn-success"
            >
              Confirmar
            </button>

            <button 
              v-if="agendamento.status !== 'cancelado'" 
              @click="cancelarAgendamento(agendamento.id)" 
              class="btn-danger"
            >
              Cancelar
            </button>

            <button 
              v-if="agendamento.status === 'cancelado'" 
              @click="deletarAgendamento(agendamento.id)" 
              class="btn-trash"
              title="Excluir"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>

    <div v-if="showNovoAgendamento" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <div class="modal-header">
          <h2>Novo Agendamento</h2>
          <button @click="fecharModal" class="btn-close">&times;</button>
        </div>
        
        <form @submit.prevent="criarAgendamento">
          <div class="form-group">
            <label for="nova_data_hora">Data e Hora:</label>
            <input type="datetime-local" id="nova_data_hora" v-model="novoAgendamento.data_hora" required>
          </div>

          <div class="form-group">
            <label for="novo_pet">Pet:</label>
            <select id="novo_pet" v-model="novoAgendamento.pet" required>
              <option value="">Selecione um pet</option>
              <option v-for="pet in pets" :key="pet.id" :value="pet.id">
                {{ pet.nome }} ({{ pet.tutor_nome || 'Sem tutor' }})
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="novo_vet">Veterinário:</label>
            <select id="novo_vet" v-model="novoAgendamento.veterinario" required>
              <option value="">Selecione</option>
              <option v-for="vet in veterinarios" :key="vet.id" :value="vet.id">
                {{ vet.nome_completo }} - {{ vet.especialidade }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="novo_servico">Serviço:</label>
            <select id="novo_servico" v-model="novoAgendamento.servico" required>
              <option value="">Selecione um serviço</option>
              <option v-for="serv in servicos" :key="serv.id" :value="serv.id">
                {{ serv.nome }}
              </option>
            </select>
          </div>

          <div class="form-actions">
            <button type="button" @click="fecharModal" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
.agendamentos-container {
  padding: 20px;
  max-width: 1200px;
  font-family: 'Arial', sans-serif;
  margin: 0 auto;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  align-items: end;
}

.filter-group {
  flex-direction: column;
  gap: 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-primary {
  background: #7cab75;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success {
  background: #7cab75;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-clear {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  height: fit-content;
}


.btn-trash {
  background: #ff4444;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-trash svg {
  stroke: white;
}

.btn-trash:hover {
  background: #cc0000;
  transform: scale(1.05);
  transition: 0.2s;
}

.agendamentos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.agendamento-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.agendamento-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.status-pendente {
  background: #fff3cd;
  color: #856404;
}

.status-confirmado {
  background: #d1ecf1;
  color: #0c5460;
}

.status-cancelado {
  background: #f8d7da;
  color: #721c24;
}

.agendamento-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
}



.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal {
  background: #ffffff;
  padding: 30px;
  border-radius: 14px;
  width: 450px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.25);
  animation: modalShow 0.25s ease-out;
  font-family: Arial, sans-serif;
  position: relative;
}

/* Animação suave */
@keyframes modalShow {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
  font-size: 22px;
  color: #2d2d2d;
}

/* Botão X */
.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #444;
  cursor: pointer;
  transition: 0.2s;
}

.btn-close:hover {
  color: #7cab75;
}



.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cfcfcf;
  background: #fafafa;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #7cab75;
  outline: none;
}



.form-actions {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-primary {
  background: #7cab75 !important;
  color: white;
  padding: 10px 22px;
  border-radius: 6px;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 600;
}

.btn-primary:hover {
  background: #6e9f68 !important;
}

.btn-secondary {
  background: #6c757d !important;
  color: white;
  padding: 10px 22px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.btn-secondary:hover {
  opacity: 0.85;
}

</style>
