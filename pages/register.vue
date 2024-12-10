<script lang="ts" setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

async function onSubmit(event: SubmitEvent) {
    event.preventDefault()
    console.log('form has submitted', { username: username.value, password: password.value })
}
</script>

<template>
    <div>
        <h1>Page d'inscription</h1>
        username : {{ username }}
        password : {{ password }}

        <form @submit="onSubmit">
            <div>
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username">
            </div>
            <div>
                <label for="password">Mot de passe</label>
                <input type="password" id="password" v-model="password">
            </div>
            <div>
                <button type="submit">S'inscrire</button>
            </div>
        </form>
    </div>
</template>
