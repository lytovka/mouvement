<script lang="ts">
  import type { load } from './+page.server'
  import { page } from '$app/stores'
    import HorizontalCard from '$lib/components/horizontal-card.svelte'

  console.log(page)
  export let data: Awaited<ReturnType<typeof load>>
</script>

<div class="mt-4">
  <ul class="flex flex-col md:flex-row justify-center gap-4">
    {#each data.movements as movement}
      <HorizontalCard
        title={movement.name}
        imgSrc={`/api/movement-images/${movement.images[0].id}`}
        url={`/styles/${movement.id}`}
      />
    {/each}
  </ul>
</div>
