<script lang="ts">
	import HorizontalCard from "$lib/components/horizontal-card.svelte";
import type { load } from "./+page.server";
	export let data: Awaited<ReturnType<typeof load>>;
</script>

<ul class="flex flex-col md:flex-row justify-center gap-4">
	{#each data.danceStyles as danceStyle}
		<HorizontalCard title={danceStyle.name} imgSrc={`/api/style-image/${danceStyle.img?.id}`} />
	{/each}
</ul>
