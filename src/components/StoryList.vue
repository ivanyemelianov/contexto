<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

const stories = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "stories"))
  stories.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
})
</script>

<template>
  <h1 class="text-xl font-bold mb-4">Story List</h1>
  <ul>
    <li v-for="story in stories" :key="story.id">
      {{ story.title }}
    </li>
  </ul>
</template>
