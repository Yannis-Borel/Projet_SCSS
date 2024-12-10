<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useCookie } from '#app' // Assurez-vous d'utiliser le bon import si vous n'êtes pas sur Nuxt.

// Interfaces pour les types
interface Habit {
  id: number;
  title: string;
  description?: string;
}

interface DashboardData {
  username: string;
  globalHabits: Habit[];
  personalHabits: Habit[];
}

// Données réactives pour le tableau de bord
const data = ref<DashboardData>({
  username: '',
  globalHabits: [],
  personalHabits: [],
});

// État pour le formulaire de modification
const editingHabit = ref<Habit | null>(null);

// Données pour le formulaire d'ajout d'habitude
const title = ref<string>('');
const description = ref<string>('');
const error = ref<string>('');

// Fonction pour charger les données du dashboard
const fetchDashboardData = async () => {
  try {
    const jwt = useCookie('api_tracking_jwt')?.value;
    if (!jwt) throw new Error('Token JWT manquant');

    const response = await fetch('http://localhost:4000/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement du dashboard');
    }

    data.value = await response.json();
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Fonction pour supprimer une habitude
const deleteHabit = async (habitId: number) => {
  try {
    const jwt = useCookie('api_tracking_jwt')?.value;
    if (!jwt) throw new Error('Token JWT manquant');

    const response = await fetch(`http://localhost:4000/habits/${habitId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'habitude');
    }

    await fetchDashboardData();
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Fonction pour commencer la modification d'une habitude
const startEditHabit = (habit: Habit) => {
  editingHabit.value = { ...habit };
};

// Fonction pour mettre à jour une habitude
const updateHabit = async () => {
  if (!editingHabit.value) {
    alert('Aucune habitude à mettre à jour.');
    return;
  }

  if (!editingHabit.value.title) {
    alert('Le titre est requis');
    return;
  }

  try {
    const jwt = useCookie('api_tracking_jwt')?.value;
    if (!jwt) throw new Error('Token JWT manquant');

    const response = await fetch(`http://localhost:4000/habits/${editingHabit.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        title: editingHabit.value.title,
        description: editingHabit.value.description,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de l\'habitude');
    }

    editingHabit.value = null;
    await fetchDashboardData();
  } catch (error) {
    console.error('Erreur:', error);
    alert((error as Error).message);
  }
};

// Fonction pour tracker une habitude
const trackHabit = async (habitId: number, completed: boolean) => {
  try {
    const jwt = useCookie('api_tracking_jwt')?.value;
    if (!jwt) throw new Error('Token JWT manquant');

    const response = await fetch(`http://localhost:4000/tracking/${habitId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        completed: completed,
        date: new Date().toISOString().split('T')[0],
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors du tracking de l\'habitude');
    }

    await fetchDashboardData();
  } catch (error) {
    console.error('Erreur:', error);
    alert((error as Error).message);
  }
};

// Fonction pour ajouter une habitude
const addHabit = async () => {
  error.value = '';

  if (!title.value) {
    error.value = 'Le titre est requis';
    return;
  }

  try {
    const jwt = useCookie('api_tracking_jwt')?.value;
    if (!jwt) throw new Error('Token JWT manquant');

    const response = await fetch('http://localhost:4000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la création de l\'habitude');
    }

    title.value = '';
    description.value = '';
    await fetchDashboardData();
  } catch (err) {
    error.value = (err as Error).message;
  }
};

// Charger les données au montage du composant
onMounted(fetchDashboardData);
</script>

<template>
  <div class="dashboard-container">
    <h1>Mon dashboard</h1>

    <!-- Formulaire d'ajout d'habitude -->
    <div class="habit-form-container">
      <h2>Ajouter une nouvelle habitude</h2>
      <form class="habit-form" @submit.prevent="addHabit">
        <div class="form-group">
          <label for="title">Titre de l'habitude</label>
          <input id="title" v-model="title" type="text" placeholder="Ex: Lecture quotidienne" required >
        </div>
        <div class="form-group">
          <label for="description">Description (optionnel)</label>
          <textarea id="description" v-model="description" placeholder="Décrivez votre habitude en détail"/>
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <button type="submit" class="submit-btn">Ajouter l'habitude</button>
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
        <li v-for="habit in data.personalHabits" :key="habit.id" class="personal-habit-item">
          <template v-if="editingHabit && editingHabit.id === habit.id">
            <div class="edit-form">
              <input v-model="editingHabit.title" placeholder="Titre" required >
              <textarea v-model="editingHabit.description" placeholder="Description"/>
              <div class="edit-buttons">
                <button class="save-btn" @click="updateHabit">Enregistrer</button>
                <button class="cancel-btn" @click="editingHabit = null">Annuler</button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="habit-details">
              <span>{{ habit.title }} : {{ habit.description }}</span>
              <div class="habit-actions">
                <button class="track-btn track-success" @click="trackHabit(habit.id, true)">✓ Terminé</button>
                <button class="track-btn track-fail" @click="trackHabit(habit.id, false)">✗ Non fait</button>
                <button class="edit-btn" @click="startEditHabit(habit)">Modifier</button>
                <button class="delete-btn" @click="deleteHabit(habit.id)">Supprimer</button>
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