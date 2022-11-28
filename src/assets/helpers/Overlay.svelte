<script lang="ts" context="module">
export const allInteractiveOverlays: Writable<Symbol[]> = writable([])
</script>

<script lang="ts">
import {sassPlugin} from "esbuild-sass-plugin"
import { onMount, tick } from "svelte";
import { createEventDispatcher } from "svelte";
import { get, writable } from "svelte/store";
import type { Writable } from "svelte/store";

const dispatch = createEventDispatcher<{clickAway: {}, escapePressed: {}}>()

export let noMouse = false
export let interactive = false
export let lockScroll = false

let root: HTMLElement
export let overlay: HTMLElement = undefined as any

const overlaySymbol = Symbol()

// This is used to make sure the user both pressed and released outside the dialog, rather than
// clicking inside the dialog then dragging to outside the dialog.
let allowClickAway = false

function onKeyPress(event: KeyboardEvent) {
	let allInteractiveOverlaysValue = get(allInteractiveOverlays)
	if (event.key === "Escape") {
		let index = allInteractiveOverlaysValue.indexOf(overlaySymbol)
		
		if (index === allInteractiveOverlaysValue.length - 1) {
			dispatch("escapePressed")
		}
	}
}

onMount(() => {
	let parent = root.closest("[data-overlay-parent]")
	if (parent === null) parent = document.body
	let sibling = parent.querySelector(":scope > [data-overlay-sibling]")
	if (sibling !== null) {
		if (sibling) {
			parent.insertBefore(overlay, sibling)
		} else {
			parent.appendChild(overlay)
		}
	} else {
		parent.appendChild(overlay)
	}

	if (interactive) {
		allInteractiveOverlays.update(allDialogs => {
			allDialogs.push(overlaySymbol)
			return allDialogs
		})

		document.addEventListener("keydown", onKeyPress)
	}

	if (lockScroll) {
		document.documentElement.classList.add("lock-scroll")
	}

	return () => {
		root.appendChild(overlay)

		if (interactive) {
			allInteractiveOverlays.update(allDialogs => {
				allDialogs = allDialogs.filter(d => d !== overlaySymbol)

				if (lockScroll) {
					if (allDialogs.length < 1) {
						document.documentElement.classList.remove("lock-scroll")
					}
				}

				return allDialogs
			})

			document.removeEventListener("keydown", onKeyPress)
		}
	}
})
</script>

<div bind:this={root} class="Overlay root">
	<!-- Leave the cullen class on this div, as it is required to allow all the stuff in global.css apply to the stuff in the dialog -->
	<div bind:this={overlay} class="overlay cullen" class:no_mouse={noMouse}
		on:mousedown={() => allowClickAway = true}
		on:click={() => {
			if (allowClickAway) tick().then(() => dispatch("clickAway"))
			allowClickAway = false
		}}
	>
		{#if $$slots.background}
			<div class="overlay_fill">
				<slot name="background" />
			</div>
		{/if}

		<div class="overlay_content">
			<slot />
		</div>
	</div>
</div>

<style>
.root {
	position: absolute;
}

.root > .overlay {
	visibility: hidden;
}

.overlay {
	position: fixed;
	overflow: hidden;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 20000;
}

.overlay_fill {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

.overlay_content {
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	overscroll-behavior: contain;
}

.no_mouse {
	pointer-events: none;
}
</style>