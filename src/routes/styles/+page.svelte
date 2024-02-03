<script lang="ts">
  import HorizontalCard from '$lib/components/horizontal-card.svelte'
  import type { load } from './+page.server'
  export let data: Awaited<ReturnType<typeof load>>
</script>

<div class="mt-4">
  <ul class="flex flex-col md:flex-row justify-center gap-4">
    {#each data.danceStyles as danceStyle}
      <HorizontalCard
        title={danceStyle.name}
        imgSrc={`/api/style-images/${danceStyle.img?.id}`}
        url={`/styles/${danceStyle.slug}`}
      />
    {/each}
  </ul>
</div>
