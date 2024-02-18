<script lang="ts">
  import { cn } from '$lib/utils/misc'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { load } from './+page.server'

  export let data: Awaited<ReturnType<typeof load>>
  export let containerStyles: HTMLAttributes<HTMLDivElement>['class'] = ''
</script>

<div class={cn('flex flex-col items-center justify-center p-4', containerStyles)}>
  <div class="max-w-[700px]">
    <h1>{data.movement?.title}</h1>
    <div class="min-h-96 flex flex-col justify-center items-center">
      <img
        class="max-h-96 w-full object-fill"
        src={data.movement?.images[0].src}
        alt={data.movement?.images[0].altText}
      />
    </div>
  </div>
</div>
