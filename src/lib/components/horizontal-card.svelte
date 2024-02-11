<script lang="ts">
  export let title: string
  export let imgSrc: string
  export let url: string
</script>

<a href={url} aria-label="Description of the link">
  <div class="relative flex flex-col bg-primary shadow-md bg-clip-border rounded-xl">
    <figure class="figure-container">
      <img class="rounded-t-xl" src={imgSrc} loading="lazy" alt="Shoes" />
    </figure>
    <div class="px-4 py-4 bg-primary rounded-b-xl">
      <p class="font-bold text-gray-50">{title}</p>
    </div>
  </div>
</a>
