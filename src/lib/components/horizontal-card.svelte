<script lang="ts">
  export let title: string = 'Hip-Hop'
  export let imgSrc: string = ''
</script>

<a href="your-link-url" aria-label="Description of the link" class=" w-96">
  <div class="flex flex-col bg-base-100">
    <figure><img class="rounded-t-xl" src={imgSrc} alt="Shoes" /></figure>
    <div class="px-4 py-4 bg-primary rounded-b-xl">
      <p class="font-bold text-primary-content">{title}</p>
    </div>
  </div>
</a>
