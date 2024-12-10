<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// Réactif pour stocker les données du dashboard
const data = ref({
  username: '',
  globalHabits: [],
  personalHabits: []
})

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
    
    // Rechargement des données après suppression
    await fetchDashboardData()
  } catch (error) {
    console.error('Erreur:', error)
  }
}

// Charger les données au montage du composant
onMounted(fetchDashboardData)

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
          {{ habit.title }} : {{ habit.description }}
          <button 
            @click="deleteHabit(habit.id)" 
            class="delete-btn"
          >
            Supprimer
          </button>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  border-radius: 4px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>