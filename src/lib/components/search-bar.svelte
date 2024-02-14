<script lang="ts">
  import { page } from '$app/stores'
  import { SearchIcon } from 'lucide-svelte'
  import { Button } from './ui/button'
  import { Input } from './ui/input'
  import { goto } from '$app/navigation'

  let query = $page.url.searchParams.get('q') ?? ''

  async function handleInput(e: Event) {
    query = (e.target as HTMLInputElement).value.trim()
    const searchParam = query ? `?${new URLSearchParams({q: encodeURIComponent(query)})}` : null
    await goto(searchParam ? searchParam: $page.url.pathname, {
      noScroll: true,
      keepFocus: true
    })
  }
</script>

<div class="w-full max-w-[700px]">
  <form
    method="GET"
    action={$page.url.toString()}
    class="flex flex-row items-center justify-center gap-2"
  >
    <Input type="search" name="q" placeholder="Search" value={query} on:input={handleInput} />
    <Button type="submit"><SearchIcon /></Button>
  </form>
</div>
