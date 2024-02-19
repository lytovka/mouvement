<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog'
  import { page } from '$app/stores'
  import { goto, preloadData, pushState } from '$app/navigation'
  import MovementPage from './[movementId]/+page.svelte'
  import SearchBar from '$lib/components/search-bar.svelte'
  import type { load } from './+page'

  export let data: Awaited<ReturnType<typeof load>>
  let dialogOpen = false

  const onImageClick = async (event: MouseEvent & { currentTarget: HTMLAnchorElement }) => {
    if (event.metaKey || event.ctrlKey) return
    event.preventDefault()
    const { href } = event.currentTarget
    const result = await preloadData(href)
    if (result.type === 'loaded' && result.status === 200) {
      pushState(href, { movement: result.data })
    } else {
      goto(href)
    }
  }

  //@ts-expect-error add `movement` to state
  $: if ($page.state.movement) {
    dialogOpen = true
  } else {
    dialogOpen = false
  }
</script>

<div class="px-8 py-4 md:container md:mx-auto">
  <div class="container mb-20 mt-36 flex flex-col items-center justify-center gap-6">
    <h1 class="text-h1">Epic Dance Steps</h1>
    <SearchBar />
  </div>
  <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[repeat(3,_minmax(250px,_1fr))]">
    {#each data.movements as movement}
      <a
        href={`${$page.url.pathname}/${movement.slug}`}
        on:click={onImageClick}
        class="group relative flex flex-col bg-primary shadow-md bg-clip-border rounded-xl"
      >
        <figure class="relative">
          <div class="md:h-64 figure-container overflow-hidden rounded-t-xl">
            <img
              class="h-auto w-auto object-cover transition-all ease-in-out duration-500 group-hover:scale-105"
              src={movement.images[0].src}
              loading="lazy"
              alt={movement.images[0].altText}
            />
          </div>
        </figure>
        <div class="px-4 py-4 bg-primary rounded-b-xl">
          <p class="text-p text-gray-50">{movement.title}</p>
        </div>
      </a>
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
  <Dialog.Portal>
    <Dialog.Content class="h-min md:min-w-[700px]">
      <MovementPage containerStyles="block p-0" data={$page.state.movement} />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
