<script>
export default {
  name: 'AuthRedirect',
  beforeCreate() {
    let redirectPath = this.$route.query.sysRedirectPath
    if (redirectPath) {
      redirectPath = decodeURIComponent(redirectPath)
    } else {
      redirectPath = '/login'
    }
    const query = { ...this.$route.query }
    const params = { ...this.$route.params }
    delete query.sysRedirectPath
    const redirecInfo = {
      path: redirectPath,
      query,
      params,
    }
    this.$router.replace(redirecInfo)
  },
  render: (h) => h(),
}
</script>
