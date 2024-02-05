<script lang="ts">
  import type { load } from './+page.server'

  export let data: Awaited<ReturnType<typeof load>>
</script>

<h1>{data.movement?.name}</h1>
<p>{data.movement?.content}</p>
