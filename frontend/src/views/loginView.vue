<template>
  <div>
    <span>Studio Ghibli Tier List</span>
    <Container @drop="onDrop">
      <Draggable v-for="(item, i) in items" :key="item.id">
        <div>{{ i + 1 }} -> {{ item.data }}</div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
export default {
  name: 'app',
  components: { Container, Draggable },
  data() {
    return {
      items: [
        { id: 1, data: 'Princess Mononoke' },
        { id: 2, data: 'Spirited Away' },
        { id: 3, data: 'My Neighbor Totoro' },
        { id: 4, data: "Howl's Moving Castle" },
      ],
    }
  },
  methods: {
    onDrop(dropResult) {
      this.items = this.applyDrag(this.items, dropResult)
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult

      if (removedIndex === null && addedIndex === null) return arr
      const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
      }
      return result
    },
  },
}
</script>
