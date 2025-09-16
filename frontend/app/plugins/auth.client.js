export default defineNuxtPlugin(() => {
  // Initialize admin auth on client startup
  const { initAuth } = useAdminAuth()
  initAuth()
})