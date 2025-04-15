<template>
    <div class="space-y-4 w-full max-w-xs bg-white p-6 rounded shadow">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div v-if="errorMessage" class="text-red-500 mt-2">
            {{ errorMessage }}
        </div>

        <button 
          type="submit"
          class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {{ isRegister ? 'Register' : 'Login' }}
        </button>
      </form>
  
      <div class="text-center text-sm">
        <span>
          {{ isRegister ? 'Already have an account?' : "Don't have an account?" }}
        </span>
        <button 
          @click="isRegister = !isRegister" 
          class="text-blue-600 hover:underline ml-1"
        >
          {{ isRegister ? 'Login' : 'Register' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '@/firebase'
  
  const email = ref('')
  const password = ref('')
  const isRegister = ref(false)

  const errorMessage = ref('')

  
  const handleSubmit = async () => {
    try {
        if (isRegister.value) {
            await createUserWithEmailAndPassword(auth, email.value, password.value)
        } else {
            await signInWithEmailAndPassword(auth, email.value, password.value)
        }
    } catch (err) {
        console.error(err)
        if (err.code === 'auth/user-not-found') {
        errorMessage.value = 'No user found with this email.'
        } else if (err.code === 'auth/wrong-password') {
        errorMessage.value = 'Incorrect password.'
        } else if (err.code === 'auth/email-already-in-use') {
        errorMessage.value = 'Email is already in use.'
        } else if (err.code === 'auth/invalid-email') {
        errorMessage.value = 'Invalid email address.'
        } else if (err.code === 'auth/weak-password') {
        errorMessage.value = 'Password should be at least 6 characters.'
        } else {
        errorMessage.value = 'Something went wrong. Please try again.'
        }
    }
    
  }
  </script>
  