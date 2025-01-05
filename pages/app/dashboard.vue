<script setup lang="ts">
import { computed } from 'vue';
import type { PersonalHabit, DashboardPayload } from '~/@types/dashboard';
import useTrackingApi from '~/composables/useTrackingApi';

type ExtendedPersonalHabit = PersonalHabit & {
  status?: 'completed' | 'not_done';
};

const { data, refresh } = await useAsyncData<DashboardPayload>('dashboard', async () => {
  const response = await useTrackingApi('/dashboard', {
    method: 'GET',
  });
  if (!response) throw new Error('Erreur lors du chargement du tableau de bord');
  return response;
});

const personalHabits = computed((): ExtendedPersonalHabit[] => {
  return (
    data.value?.personalHabits.map((habit) => ({
      ...habit,
      status: 'not_done',
    })) || []
  );
});

const addHabit = async (title: string, description: string) => {
  try {
    const response = await useTrackingApi('/habits', {
      method: 'POST',
      body: { title, description },
    });

    if (!response) throw new Error("Erreur lors de la création de l'habitude");
    await refresh();
  } catch (err) {
    console.error('Erreur:', err);
    alert((err as Error).message);
  }
};

const updateHabit = async (habit: ExtendedPersonalHabit) => {
  try {
    const response = await useTrackingApi(`/habits/${habit.id}`, {
      method: 'PUT',
      body: {
        title: habit.title,
        description: habit.description || '',
      },
    });

    if (!response) throw new Error("Erreur lors de la mise à jour de l'habitude");
    await refresh();
  } catch (err) {
    console.error('Erreur:', err);
    alert((err as Error).message);
  }
};

const deleteHabit = async (habitId: number) => {
  try {
    const response = await useTrackingApi(`/habits/${habitId}`, {
      method: 'DELETE',
    });

    if (!response) throw new Error("Erreur lors de la suppression de l'habitude");
    await refresh();
  } catch (err) {
    console.error('Erreur:', err);
  }
};

const trackHabit = async (habitId: number, completed: boolean) => {
  try {
    const response = await useTrackingApi(`/tracking/${habitId}`, {
      method: 'POST',
      body: {
        completed: completed.toString(),
        date: new Date().toISOString().split('T')[0],
      },
    });

    if (!response) throw new Error("Erreur lors du tracking de l'habitude");
    
    const habit = personalHabits.value.find((h) => h.id === habitId);
    if (habit) {
      habit.status = completed ? 'completed' : 'not_done';
    }

    await refresh();
  } catch (err) {
    console.error('Erreur:', err);
    alert((err as Error).message);
  }
};
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard__title">Mon dashboard</h1>
    <AddHabitForm @add-habit="addHabit" />
    <HabitList
      :habits="personalHabits"
      @update="updateHabit"
      @delete="deleteHabit"
      @track="trackHabit"
    />
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  $self: &;

  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  &__title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
</style>