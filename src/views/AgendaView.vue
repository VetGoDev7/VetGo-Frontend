<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:19003/api'

const currentUser = ref(null)
const isAuthenticated = ref(false)
const isAdmin = ref(false)

const veterinarios = ref([])
const pets = ref([])
const servicos = ref([])
const agendamentos = ref([])

const submitError = ref('')
const successMessage = ref('')
const filters = ref({ data: '', veterinario: null, pet: null, status: '' })
const showNovoAgendamento = ref(false)
const novoAgendamento = ref({ data_hora: '', pet: '', veterinario: '', servico: '' })
const loading = ref(false)
const actionLoading = ref(false)

const showError = (msg) => { submitError.value = msg }
const showSuccess = (msg) => { successMessage.value = msg }

const setupAuth = () => {
  const token = localStorage.getItem('token')
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']
}

const formatDateTime = (dt) => dt ? new Date(dt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—'
const getStatusDisplay = (status) => status ? status.charAt(0).toUpperCase() + status.slice(1) : '—'

const fecharModal = () => {
  showNovoAgendamento.value = false
  novoAgendamento.value = { data_hora: '', pet: '', veterinario: '', servico: '' }
}

const fetchCurrentUser = async () => {
  setupAuth()
  try {
    const res = await axios.get(`${API_URL}/usuarios/me/`)
    currentUser.value = res.data
    isAuthenticated.value = true
    isAdmin.value = !!(res.data.is_staff || res.data.is_superuser)
  } catch (err) {
    currentUser.value = null
    isAuthenticated.value = false
    isAdmin.value = false
    showError('Não foi possível carregar informações do usuário.')
  }
}

const fetchDadosAuxiliares = async () => {
  setupAuth()
  try {
    const [vRes, sRes] = await Promise.all([
      axios.get(`${API_URL}/veterinarios/`).catch(() => ({ data: [] })),
      axios.get(`${API_URL}/servicos/`).catch(() => ({ data: [] }))
    ])

    let petsRes = []
    if (currentUser.value?.tutor?.id) {
      petsRes = await axios.get(`${API_URL}/pets/?tutor=${currentUser.value.tutor.id}`).catch(() => ({ data: [] }))
    }

    veterinarios.value = vRes.data.results || vRes.data || []
    pets.value = (petsRes.data.results || petsRes.data || []).map(p => ({
      ...p,
      tutor_nome: p.tutor?.nome_completo || p.tutor?.nome || 'Sem tutor'
    }))
    servicos.value = sRes.data.results || sRes.data || []
  } catch {
    veterinarios.value = []
    pets.value = []
    servicos.value = []
    showError('Erro ao carregar dados auxiliares.')
  }
}

const fetchAgendamentos = async () => {
  loading.value = true
  setupAuth()
  try {
    const res = await axios.get(`${API_URL}/agendamentos/`)
    agendamentos.value = res.data.results || res.data || []
  } catch {
    agendamentos.value = []
    showError('Não foi possível carregar agendamentos.')
  } finally {
    loading.value = false
  }
}

const criarAgendamento = async () => {
  actionLoading.value = true
  setupAuth()
  try {
    await axios.post(`${API_URL}/agendamentos/`, novoAgendamento.value)
    showSuccess('Agendamento criado com sucesso!')
    fecharModal()
    await fetchAgendamentos()
  } catch (err) {
    showError(err.response?.data?.non_field_errors?.[0] || 'Falha ao criar agendamento.')
  } finally {
    actionLoading.value = false
  }
}

const confirmarAgendamento = async (id) => {
  actionLoading.value = true
  setupAuth()
  try {
    await axios.patch(`${API_URL}/agendamentos/${id}/`, { status: 'confirmado' })
    showSuccess('Agendamento confirmado!')
    await fetchAgendamentos()
  } catch {
    showError('Erro ao confirmar agendamento.')
  } finally {
    actionLoading.value = false
  }
}

const cancelarAgendamento = async (id) => {
  actionLoading.value = true
  setupAuth()
  try {
    await axios.patch(`${API_URL}/agendamentos/${id}/`, { status: 'cancelado' })
    showSuccess('Agendamento cancelado!')
    await fetchAgendamentos()
  } catch {
    showError('Erro ao cancelar agendamento.')
  } finally {
    actionLoading.value = false
  }
}

const deletarAgendamento = async (id) => {
  actionLoading.value = true
  setupAuth()
  try {
    await axios.delete(`${API_URL}/agendamentos/${id}/`)
    showSuccess('Agendamento excluído!')
    await fetchAgendamentos()
  } catch {
    showError('Erro ao deletar agendamento.')
  } finally {
    actionLoading.value = false
  }
}

const clearFilters = () => { filters.value = { data: '', veterinario: null, pet: null, status: '' } }

const filteredAgendamentos = computed(() => {
  return agendamentos.value.filter(a => {
    const matchData = !filters.value.data || a.data_hora?.startsWith(filters.value.data)
    const matchVet = !filters.value.veterinario || a.veterinario_info?.id === filters.value.veterinario
    const matchPet = !filters.value.pet || a.pet_info?.id === filters.value.pet
    const matchStatus = !filters.value.status || a.status === filters.value.status
    return matchData && matchVet && matchPet && matchStatus
  })
})

onMounted(async () => {
  setupAuth()
  await fetchCurrentUser()
  if (isAuthenticated.value) {
    await fetchDadosAuxiliares()
    await fetchAgendamentos()
    
  }
})
</script>



<template>
  <div class="agendamentos-container">
    <h1>Agendamentos</h1>

    <div v-if="submitError" class="alert alert-error">{{ submitError }}</div>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

    <div class="filters">
      <div class="filter-group">
        <label>Status:</label>
        <select v-model="filters.status">
          <option value="">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
      <button @click="clearFilters" class="btn-clear">Limpar Filtros</button>
    </div>

    <div class="actions">
      <button v-if="isAuthenticated" @click="showNovoAgendamento = true" class="btn-primary">Novo Agendamento</button>
    </div>

    <div class="agendamentos-list">
      <div v-if="loading" class="loading">Carregando...</div>
      <div v-else-if="agendamentos.length === 0" class="no-data">Nenhum agendamento encontrado.</div>

      <div v-else class="agendamentos-grid">
        <div v-for="agendamento in filteredAgendamentos" :key="agendamento.id" class="agendamento-card">
          <div class="agendamento-header">
            <h3>{{ formatDateTime(agendamento.data_hora) }}</h3>
            <span :class="`status status-${agendamento.status}`">{{ getStatusDisplay(agendamento.status) }}</span>
          </div>

          <div class="agendamento-info">
            <div><strong>Pet:</strong> {{ agendamento.pet_info?.nome || '—' }}</div>
            <div><strong>Veterinário:</strong> {{ agendamento.veterinario_info?.nome_completo || '—' }}</div>
            <div><strong>Serviço:</strong> {{ agendamento.servico_info?.nome || '—' }}</div>
            <div><strong>Tutor:</strong> {{ agendamento.tutor_info?.nome_completo || agendamento.tutor_info?.nome || '—' }}</div>
          </div>

          <div class="agendamento-actions">
            <button
              v-if="isAdmin && agendamento.status === 'pendente'"
              @click="confirmarAgendamento(agendamento.id)"
              class="btn-success"
            >Confirmar</button>

            <button
              v-if="isAdmin && agendamento.status !== 'cancelado'"
              @click="cancelarAgendamento(agendamento.id)"
              class="btn-danger"
            >Cancelar</button>

            <button
              v-if="isAdmin && agendamento.status === 'cancelado'"
              @click="deletarAgendamento(agendamento.id)"
              class="btn-trash"
            >Excluir</button>
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
            <label>Data e Hora:</label>
            <input type="datetime-local" v-model="novoAgendamento.data_hora" required>
          </div>

          <div class="form-group">
            <label>Pet:</label>
            <select v-model="novoAgendamento.pet" required>
              <option value="">Selecione um pet</option>
              <option v-for="pet in pets" :key="pet.id" :value="pet.id">{{ pet.nome }} ({{ pet.tutor_nome }})</option>
            </select>
          </div>

          <div class="form-group">
            <label>Veterinário:</label>
            <select v-model="novoAgendamento.veterinario" required>
              <option value="">Selecione</option>
              <option v-for="vet in veterinarios" :key="vet.id" :value="vet.id">{{ vet.nome_completo || vet.nome }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Serviço:</label>
            <select v-model="novoAgendamento.servico" required>
              <option value="">Selecione um serviço</option>
              <option v-for="serv in servicos" :key="serv.id" :value="serv.id">{{ serv.nome }}</option>
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
