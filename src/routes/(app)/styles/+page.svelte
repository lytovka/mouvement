<script lang="ts">
  import HorizontalCard from '$lib/components/horizontal-card.svelte'
  import type { load } from './+page.server'
  import * as Dialog from "$lib/components/ui/dialog";

  export let data: Awaited<ReturnType<typeof load>>
</script>

<div>
  <ul class="px-8 py-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each data.danceStyles as danceStyle}
      <HorizontalCard
        title={danceStyle.name}
        imgSrc={`/api/style-images/${danceStyle.img?.id}`}
        url={`/styles/${danceStyle.slug}`}
      />
    {/each}
  </ul>
  <Dialog.Root>
    <Dialog.Trigger >Open</Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </Dialog.Description>
      </Dialog.Header>
    </Dialog.Content>
  </Dialog.Root>
</div>
