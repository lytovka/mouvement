<script lang="ts">
  import type { load } from './+page.server'

  export let data: Awaited<ReturnType<typeof load>>
</script>

<h1>{data.movement?.name}</h1>
<div class="h-96">
  <img src={`/api/movement-images/${data.movement?.images[0].id}/webp`} alt={data.movement?.images[0].altText} />
</div>
<p>{data.movement?.content}</p>
