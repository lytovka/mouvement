<script lang="ts">
  import HorizontalCard from '$lib/components/horizontal-card.svelte'
  import type { load } from './+page.server'

  export let data: Awaited<ReturnType<typeof load>>
  console.log(data)
</script>

<div>
  <ul class="px-8 py-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each data.styles as danceStyle}
      <HorizontalCard
        title={danceStyle.name}
        imgSrc={`/styles/${danceStyle.path}.png`}
        url={`/${danceStyle.path}`}
      />
    {/each}
  </ul>
</div>
