<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const API_URL = 'http://127.0.0.1:19003/api'

const agendamentos = ref([])
const veterinarios = ref([])
const pets = ref([])
const showNovoAgendamento = ref(false)
const submitError = ref(null)
const successMessage = ref(null)
const loading = ref(false)

const filters = ref({ status: '' })

const novoAgendamento = ref({
  data_hora: '',
  pet: '',
  veterinario: '',
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
  try { return new Date(dt).toLocaleString('pt-BR') } 
  catch (error) { return dt }
}

const getStatusDisplay = (status) => {
  const map = { pendente: 'Pendente', confirmado: 'Confirmado', cancelado: 'Cancelado' }
  return map[status] || status
}

const clearFilters = () => {
  filters.value = { status: '' }
  fetchAgendamentos()
}

const resetNovoAgendamento = () => {
  novoAgendamento.value = { data_hora: '', pet: '', veterinario: '', servico: '' }
}

const fecharModal = () => {
  showNovoAgendamento.value = false
  resetNovoAgendamento()
  submitError.value = null
}


const fetchAgendamentos = async () => {
  loading.value = true
  try {
    const { data } = await axios.get(`${API_URL}/agendamentos/`, { params: filters.value })
    agendamentos.value = data.map(a => ({
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
    const [v, p] = await Promise.all([
      axios.get(`${API_URL}/veterinarios/`).then(res => res.data).catch(() => []),
      axios.get(`${API_URL}/pets/`).then(res => res.data).catch(() => [])
    ])
    veterinarios.value = v
    pets.value = p
  } catch (error) {
    console.error(error)
    showError('Erro ao carregar dados auxiliares.')
  }
}

const criarAgendamento = async () => {
  submitError.value = null
  try {
    const payload = {
      data_hora: novoAgendamento.value.data_hora,
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
    showError('Erro ao criar agendamento.')
  }
}

const confirmarAgendamento = async (id) => {
  try {
    await axios.patch(`${API_URL}/agendamentos/${id}/`, { status: 'confirmado' })
    await fetchAgendamentos()
    showSuccess('Agendamento confirmado!')
  } catch (error) {
    console.error(error)
    showError('Erro ao confirmar agendamento.')
  }
}

const cancelarAgendamento = async (id) => {
  if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return
  try {
    await axios.patch(`${API_URL}/agendamentos/${id}/`, { status: 'cancelado' })
    await fetchAgendamentos()
    showSuccess('Agendamento cancelado!')
  } catch (error) {
    console.error(error)
    showError('Erro ao cancelar agendamento.')
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
    
    <div v-if="submitError" class="alert alert-error">
      {{ submitError }}
    </div>

    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <div class="filters">
      <div class="filter-group">
        <label for="status">Status:</label>
        <select id="status" v-model="filters.status" @change="fetchAgendamentos">
          <option value="">Todos os status</option>
          <option value="pendente">Pendente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <button @click="clearFilters" class="btn-clear">Limpar Filtros</button>
    </div>

    <div class="actions">
      <button @click="showNovoAgendamento = true" class="btn-primary">
        Novo Agendamento
      </button>
      <button @click="fetchProximosAgendamentos" class="btn-secondary">
        Próximos Agendamentos
      </button>
    </div>

    <div class="agendamentos-list">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        Carregando agendamentos...
      </div>
      
      <div v-else-if="agendamentos.length === 0" class="no-data">
        <p>Nenhum agendamento encontrado.</p>
      </div>

      <div v-else class="agendamentos-grid">
        <div v-for="agendamento in agendamentos" :key="agendamento.id" class="agendamento-card">
          <div class="agendamento-header">
            <h3>{{ formatDateTime(agendamento.data_hora) }}</h3>
            <span :class="`status status-${agendamento.status}`">
              {{ getStatusDisplay(agendamento.status) }}
            </span>
          </div>
          
          <div class="agendamento-info">
            <div class="info-row">
              <strong>Pet:</strong> 
              <span>{{ agendamento.pet_info?.nome || 'N/A' }}</span>
            </div>
            <div class="info-row">
              <strong>Veterinário:</strong> 
              <span>{{ agendamento.veterinario_info?.nome_completo || 'N/A' }}</span>
            </div>
            <div class="info-row">
              <strong>Serviço:</strong> 
              <span>{{ agendamento.servico_info?.nome || 'N/A' }}</span>
            </div>
            <div class="info-row">
              <strong>Tutor:</strong> 
              <span>{{ agendamento.tutor_info?.nome || 'N/A' }}</span>
            </div>
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
            <input 
              type="datetime-local" 
              id="nova_data_hora" 
              v-model="novoAgendamento.data_hora" 
              required
              :min="new Date().toISOString().slice(0, 16)"
            >
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
            <label for="novo_veterinario">Veterinário:</label>
            <select id="novo_veterinario" v-model="novoAgendamento.veterinario" required>
              <option value="">Selecione um veterinário</option>
              <option v-for="vet in veterinarios" :key="vet.id" :value="vet.id">
                {{ vet.nome_completo }} - {{ vet.especialidade }}
              </option>
            </select>
          </div>

          <div class="form-actions">
            <button type="button" @click="fecharModal" class="btn-secondary">
              Cancelar
            </button>
            <button type="submit" class="btn-primary">
              Criar Agendamento
            </button>
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

.agendamento-header h3 {
  margin: 0;
  color: #333;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
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

.agendamento-info {
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0;
}

.info-row strong {
  color: #555;
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
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.btn-close:hover {
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #7cab75;
  box-shadow: 0 0 0 2px rgba(124, 171, 117, 0.25);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid transparent;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}

.alert-success {
  background: #d1edff;
  color: #0c5460;
  border-color: #b3d9ff;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #7cab75;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-data {
  text-align: center;
  padding: 4rem;
  color: #6c757d;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .agendamentos-grid {
    grid-template-columns: 1fr;
  }
  
  .info-row {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>