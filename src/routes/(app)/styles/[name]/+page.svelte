<script lang="ts">
  import type { load } from './+page.server'
  import { page } from '$app/stores'
    import HorizontalCard from '$lib/components/horizontal-card.svelte'

  console.log(page)
  export let data: Awaited<ReturnType<typeof load>>
</script>

<div class="px-8 py-4">
  <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
    {#each data.movements as movement}
      <HorizontalCard
        title={movement.name}
        imgSrc={`/api/movement-images/${movement.images[0].id}/png`}
        url={`/styles/${movement.id}`}
      />
    {/each}
  </ul>
</div>
