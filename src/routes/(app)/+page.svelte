<script lang="ts">
  import HorizontalCard from '$lib/components/horizontal-card.svelte'
  import type { load } from './+page.server'

  export let data: Awaited<ReturnType<typeof load>>
</script>

<div>
  <ul class="px-8 py-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each data.danceStyles as danceStyle}
      <HorizontalCard
        title={danceStyle.name}
        imgSrc={`/api/style-images/${danceStyle.img?.id}`}
        url={`/${danceStyle.slug}`}
      />
    {/each}
  </ul>
</div>
