<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog'
  import { Play } from 'lucide-svelte'
  import { page } from '$app/stores'
  import { goto, preloadData, pushState } from '$app/navigation'
  import { throttle } from '$lib/utils/misc'
  import MovementPage from './[movementId]/+page.svelte'
  import SearchBar from '$lib/components/search-bar.svelte'
  import type { load } from './+page'

  export let data: Awaited<ReturnType<typeof load>>
  let dialogOpen = false
  let isMoreDataFetching = false

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

  async function loadMorePosts() {
    if (isMoreDataFetching) return
    isMoreDataFetching = true

    const cursor = data.movements.at(-1)?.id
    if (!cursor) {
      isMoreDataFetching = false
      return
    }

    try {
      console.log($page)
      const u = new URL(`${$page.url.origin}/api/movements/${$page.params.name}`)
      const q = $page.url.searchParams.get('q')
      q && u.searchParams.set('q', q)
      u.searchParams.set('cursor', cursor)
      const response = await fetch(u, { method: 'GET' })
      const newData = await response.json()
      data.movements = [...data.movements, ...newData.movements]
    } catch (error) {
      console.error(error)
    } finally {
      isMoreDataFetching = false
    }
  }

  const throttledHandleScroll = throttle(function handleScroll() {
    const threshold = 500 // How close to the bottom you must be to load more posts (in pixels)
    const position = scrollY + innerHeight // How far the user has scrolled
    const bottom = document.body.scrollHeight // The total scrollable height
    if (position + threshold >= bottom) {
      loadMorePosts()
    }
  }, 2000)

  //@ts-expect-error add `movement` to state
  $: if ($page.state.movement) {
    dialogOpen = true
  } else {
    dialogOpen = false
  }

  $: innerHeight = 0
  $: scrollY = 0
</script>

<svelte:window bind:innerHeight bind:scrollY on:scroll={throttledHandleScroll} />

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
          <div
            class="z-10 flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-100/60"
          >
            <Play />
          </div>
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
