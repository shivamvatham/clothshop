<script setup>
definePageMeta({
  layout: false,
  middleware: 'admin'
})

await navigateTo('/admin/login')
</script>