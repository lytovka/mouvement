<script lang="ts">
  import type { load } from './+page.server'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Play } from 'lucide-svelte'
  import { page } from '$app/stores'
  import { goto, preloadData, pushState } from '$app/navigation'
  import MovementPage from './[movementId]/+page.svelte'

  export let data: Awaited<ReturnType<typeof load>>
  let dialogOpen = false

  const onImageClick = async (event: MouseEvent & { currentTarget: HTMLAnchorElement }) => {
    if (event.metaKey || event.ctrlKey) return
    event.preventDefault()
    const { href } = event.currentTarget
    const result = await preloadData(href)
    console.log('preloaded data')
    if (result.type === 'loaded' && result.status === 200) {
      pushState(href, { movement: result.data })
    } else {
      goto(href)
    }
  }

  //@ts-expect-error add `movement` to state
  $: if ($page.state.movement) {
    console.log('opened!!!')
    dialogOpen = true
  } else {
    dialogOpen = false
    console.log('closed!!!')
  }
</script>

<div class="px-8 py-4">
  <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
    {#each data.movements as movement}
      <div class="relative flex flex-col bg-gray-900 shadow-md bg-clip-border rounded-xl">
        <figure>
          <a
            href={`${$page.url.pathname}/${movement.id}`}
            on:click={onImageClick}
            class="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-100/60"
          >
            <Play />
          </a>
          <img
            class="rounded-t-xl"
            src={`/api/movement-images/${movement.images[0].id}/png`}
            alt={movement.images[0].altText}
          />
        </figure>
        <div class="px-4 py-4 bg-primary rounded-b-xl">
          <p class="font-bold text-gray-50">{movement.name}</p>
        </div>
      </div>
    {/each}
  </ul>
</div>

<Dialog.Root
  open={dialogOpen}
  onOpenChange={open => {
    if (!open) {
      history.back()
    }
  }}
>
  <Dialog.Content>
    <MovementPage data={$page.state.movement} />
  </Dialog.Content>
</Dialog.Root>
