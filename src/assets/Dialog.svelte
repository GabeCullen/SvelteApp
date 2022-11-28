<script lang="ts">
import { createEventDispatcher, onMount } from "svelte";
import { fade } from "svelte/transition";
import Overlay from "./helpers/Overlay.svelte";
import ResizeObserver from 'resize-observer-polyfill'

export let showCloseButton: string | undefined = undefined
// Read-only
export let overlay: HTMLElement = undefined as any
export let dialogWindow: HTMLElement = undefined as any
export let fillHeight = false
export let maxWidth = "1200px"
export let centerDialog = false
export let margin = "0px"
export let contentStyle = ""

let marginTop = 0
function updateMarginTop() {
	if (centerDialog) {
		if (dialogWindow.clientHeight > 0 && dialogWindow.clientHeight > 0) {
			marginTop = Math.max(0, Math.floor(overlay.clientHeight/2 - dialogWindow.clientHeight/2))
		}
	} else {
		marginTop = 0
	}
}

const dispatch = createEventDispatcher<{close: {}}>()

let resizeObserver = new ResizeObserver(updateMarginTop)

onMount(() => {
	resizeObserver.observe(overlay)
	resizeObserver.observe(dialogWindow)

	updateMarginTop()

	return () => {
		resizeObserver.disconnect()
	}
})
</script>

<Overlay lockScroll interactive bind:overlay on:clickAway={() => dispatch("close")} on:escapePressed={() => dispatch("close")}>
	<div slot="background" class="background" transition:fade={{duration: 200}}></div>

	<div class="window_container" transition:fade|local={{duration: 200}} class:fill_height={fillHeight} style="margin-top: {marginTop}px">
		<div class="window"
			on:mousedown={(e) => e.stopPropagation()}
			on:click={(e) => e.stopPropagation()}
			bind:this={dialogWindow}
			style="max-width: min({maxWidth}, 100%); margin: 0 {margin}"
		>
			<div class="content_parent">
				{#if showCloseButton !== undefined}
					<div class="exit_row">
						<button class="shine_button smallcaps exit_button" on:click={() => dispatch("close")}>{showCloseButton}</button>
					</div>
				{/if}

				<div class="content" style={contentStyle}>
					<slot />
				</div>
			</div>
		</div>
	</div>
</Overlay>

<style>
.window_container {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	transition: height 0.5s;
}

.background {
	background: #e6e6e6;
	opacity: 0.6;
	width: 100%;
	height: 100%;
}

.window {
	display: flex;
	flex-direction: column;
	background: rgb(255, 255, 255);
	padding: 0;
	min-height: calc(100% - 40px);
	width: 100%;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.content_parent {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.content {
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	margin: 0px;
	margin-top: 10px;
}

.exit_row {
	display: flex;
	justify-content: stretch;
	padding: 10px;
}

.exit_button {
	width: 100%;
	cursor: pointer;
}

.fill_height {
	height: 100%;
}

.window {
	min-height: 100%;
}
.content_parent {
	flex: 1;
}
.content {
	flex: 1;
}
</style>