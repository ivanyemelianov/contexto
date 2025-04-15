<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    
    <AuthForm v-if="!user" />
    
    <div v-else class="text-center space-y-4">
      <h2 class="text-xl font-semibold text-gray-700">Welcome, {{ user.email }}</h2>
      <button 
        @click="logout" 
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
      <StoryList />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import AuthForm from './components/AuthForm.vue'
import StoryList from './components/StoryList.vue'

const user = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })
})

const logout = async () => {
  await signOut(auth)
}
</script>