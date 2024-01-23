<script lang="ts">
import {twoTimesTwo} from "$lib/index"
import { onMount } from "svelte";

console.log("Hello!!", twoTimesTwo())

let count = 0

const handleButtonClick = () => {
	count = count + 1
	console.log("Button clicked:", count)
}

</script>

<h1 class="text-3xl font-bold underline">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button class="btn" on:click={handleButtonClick}>Hello daisyUI</button>

