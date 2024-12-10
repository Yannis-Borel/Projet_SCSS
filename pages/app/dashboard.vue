<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// Réactif pour stocker les données du dashboard
const data = ref({
  username: '',
  globalHabits: [],
  personalHabits: []
})

// État pour le formulaire de modification
const editingHabit = ref(null)

// Fonction pour charger les données du dashboard
const fetchDashboardData = async () => {
  try {
    const response = await fetch('http://localhost:4000/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du dashboard')
    }
    
    data.value = await response.json()
  } catch (error) {
    console.error('Erreur:', error)
  }
}

// Fonction pour supprimer une habitude
const deleteHabit = async (habitId) => {
  try {
    const response = await fetch(`http://localhost:4000/habits/${habitId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'habitude')
    }
    
    await fetchDashboardData()
  } catch (error) {
    console.error('Erreur:', error)
  }
}

// Fonction pour commencer la modification d'une habitude
const startEditHabit = (habit) => {
  editingHabit.value = { ...habit }
}

// Fonction pour mettre à jour une habitude
const updateHabit = async () => {
  if (!editingHabit.value.title) {
    alert('Le titre est requis')
    return
  }

  try {
    const response = await fetch(`http://localhost:4000/habits/${editingHabit.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
      },
      body: JSON.stringify({
        title: editingHabit.value.title,
        description: editingHabit.value.description
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de l\'habitude')
    }

    // Réinitialiser le mode édition
    editingHabit.value = null

    // Recharger les données
    await fetchDashboardData()
  } catch (error) {
    console.error('Erreur:', error)
    alert(error.message)
  }
}

// Fonction pour tracker une habitude
const trackHabit = async (habitId, completed) => {
  try {
    const response = await fetch(`http://localhost:4000/tracking/${habitId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
      },
      body: JSON.stringify({
        completed: completed,
        date: new Date().toISOString().split('T')[0] // Date du jour au format YYYY-MM-DD
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors du tracking de l\'habitude')
    }

    // Recharger les données pour mettre à jour les statistiques
    await fetchDashboardData()
  } catch (error) {
    console.error('Erreur:', error)
    alert(error.message)
  }
}

// Formulaire d'ajout d'habitude
const title = ref('')
const description = ref('')
const error = ref('')

const addHabit = async () => {
  error.value = ''

  if (!title.value) {
    error.value = 'Le titre est requis'
    return
  }

  try {
    const response = await fetch('http://localhost:4000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la création de l\'habitude')
    }

    // Réinitialiser le formulaire
    title.value = ''
    description.value = ''

    // Recharger les données
    await fetchDashboardData()
  } catch (err) {
    error.value = err.message
  }
}

// Charger les données au montage du composant
onMounted(fetchDashboardData)
</script>

<template>
  <div class="dashboard-container">
    <h1>Mon dashboard</h1>
    
    <!-- Formulaire d'ajout d'habitude -->
    <div class="habit-form-container">
      <h2>Ajouter une nouvelle habitude</h2>
      
      <form @submit.prevent="addHabit" class="habit-form">
        <div class="form-group">
          <label for="title">Titre de l'habitude</label>
          <input 
            id="title"
            v-model="title" 
            type="text" 
            placeholder="Ex: Lecture quotidienne"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="description">Description (optionnel)</label>
          <textarea 
            id="description"
            v-model="description"
            placeholder="Décrivez votre habitude en détail"
          ></textarea>
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button type="submit" class="submit-btn">
          Ajouter l'habitude
        </button>
      </form>
    </div>

    <!-- Habitudes globales -->
    <div class="habits-section">
      <h2>Habitudes globales</h2>
      <ul v-if="data.globalHabits.length">
        <li v-for="habit in data.globalHabits" :key="habit.id">
          {{ habit.title }} : {{ habit.description }}
        </li>
      </ul>
      <p v-else>Aucune habitude globale disponible</p>
    </div>

    <!-- Habitudes personnelles -->
    <div class="habits-section">
      <h2>Mes habitudes personnelles</h2>
      <ul v-if="data.personalHabits.length">
        <li 
          v-for="habit in data.personalHabits" 
          :key="habit.id" 
          class="personal-habit-item"
        >
          <!-- Mode édition -->
          <template v-if="editingHabit && editingHabit.id === habit.id">
            <div class="edit-form">
              <input 
                v-model="editingHabit.title" 
                placeholder="Titre" 
                required
              />
              <textarea 
                v-model="editingHabit.description" 
                placeholder="Description"
              ></textarea>
              <div class="edit-buttons">
                <button @click="updateHabit" class="save-btn">Enregistrer</button>
                <button @click="editingHabit = null" class="cancel-btn">Annuler</button>
              </div>
            </div>
          </template>
          
          <!-- Mode normal -->
          <template v-else>
            <div class="habit-details">
              <span>{{ habit.title }} : {{ habit.description }}</span>
              <div class="habit-actions">
                <button 
                  @click="trackHabit(habit.id, true)" 
                  class="track-btn track-success"
                >
                  ✓ Terminé
                </button>
                <button 
                  @click="trackHabit(habit.id, false)" 
                  class="track-btn track-fail"
                >
                  ✗ Non fait
                </button>
                <button 
                  @click="startEditHabit(habit)" 
                  class="edit-btn"
                >
                  Modifier
                </button>
                <button 
                  @click="deleteHabit(habit.id)" 
                  class="delete-btn"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </template>
        </li>
      </ul>
      <p v-else>Vous n'avez pas encore d'habitudes personnelles</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.habits-section {
  margin-top: 20px;
}

.habit-form-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.habit-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.personal-habit-item {
  background-color: #f9f9f9;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 10px;
}

.habit-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.habit-actions {
  display: flex;
  gap: 10px;
}

.track-btn, .edit-btn, .delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.track-success {
  background-color: #4CAF50;
  color: white;
}

.track-fail {
  background-color: #f44336;
  color: white;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-buttons {
  display: flex;
  gap: 10px;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>