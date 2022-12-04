<script lang="ts">
import { flip } from 'svelte/animate';
import Dialog from '../assets/Dialog.svelte';
import type { ListItem } from './shared'
import { updateLists, formatDate, addList, addItem, removeList, removeItem, moveItem, moveList, localStorageSetup } from './shared'

localStorageSetup()

let lists = JSON.parse(localStorage.getItem("lists"))
// updateLists()

let uid = 1;
let hoveringOverList;
let isBeingDragged = false
let selectedItem: ListItem
let dialogIsOpen: boolean = false

function dragStart(event, listIndex, itemIndex) {
	isBeingDragged = true
	// The data we want to make available when the element is dropped
	// is the index of the item being dragged and
	// the index of the list from which it is leaving.
	const data = {listIndex, itemIndex};
	event.dataTransfer.setData('text/plain', JSON.stringify(data));
}
	
function drop(event, listIndex) {
	isBeingDragged = false

	event.preventDefault();
	const json = event.dataTransfer.getData("text/plain");
	const data = JSON.parse(json);

	// Remove the item from one list.
	// Splice returns an array of the deleted elements, just one in this case.
	// const [item] = lists[data.listIndex].items.splice(data.itemIndex, 1);
	
	// // Add the item to the drop target list.
	// lists[listIndex].items.push(item);
	// lists = lists;

	moveItem(data.listIndex, data.itemIndex, listIndex, 0)
	
	hoveringOverList = null;
}

// function addList(input) {
// 	let list = { name: input.value, items: [] }

// 	addList(list)
// 	input.value = '';
// }

function addItemToList(input, listIndex) {
	// let item = {
	// 	id: uid++,
	// 	createdAt: new Date(),
	// 	belongsTo: lists[listIndex].name,
	// 	title: input.value,
	// 	description: ""
	// }

	// addItem(item, listIndex)
	// input.value = '';
}

// function removeItem(listIndex, itemIndex) {
// 	removeItem(listIndex, itemIndex)
	
// 	hoveringOverList = null;
// }

function openDialog(event, listIndex, itemIndex) {
	let item = lists[listIndex].items[itemIndex]
	
	selectedItem = {
		id: item.id,
		createdAt: item.createdAt,
		belongsTo: item.belongsTo,
		title: item.title,
		description: item.description
	}

	dialogIsOpen = true
}
</script>
<div class="root">
	<p style="text-align:center">Drag items from one list to another.</p>
	<input
		placeholder="what needs to be done?"
		on:keydown={e => e.key === 'Enter' && addList(e.target)}
	>

	<div class="list-outer">
		{#each lists as list, listIndex (list)}
			<div class="list-inner" animate:flip>
				<b>{list.name}</b>
				<ul
					class:hovering={hoveringOverList === list.name}
					on:dragenter={() => hoveringOverList = list.name}
					on:dragleave={() => hoveringOverList = null}
					on:drop={event => drop(event, listIndex)}
					on:dragover={(event) => event.preventDefault()}
				>
					{#each list.items as item, itemIndex (item)}
						<div class="item" animate:flip>
							<li
								draggable={true}
								class:dragging={isBeingDragged}
								on:click={event => openDialog(event, listIndex, itemIndex)}
								on:dragstart={event => dragStart(event, listIndex, itemIndex)}
							>
								{item.title}
								<button class="deleteButton" on:click={event => removeItem(listIndex, itemIndex)}></button>
							</li>
						</div>
					{/each}
				</ul>
				<input
					placeholder="+"
					on:keydown={e => e.key === 'Enter' && addItem(e.target, listIndex)}
				>
			</div>
		{/each}
	</div>


	<!-- {#if dialogIsOpen}
		<Dialog showCloseButton="Close" on:close={() => dialogIsOpen = false} centerDialog={true} maxWidth="1000px">
			<div class="popup">
				<div style="display:flex;justify-content: space-between; align-items: center;">
					<h2>{selectedItem.title}</h2>
					<p>{formatDate(Date.parse(selectedItem.createdAt))}</p>
				</div>
				
				<div>Status: {selectedItem.belongsTo}</div>
				<p>{selectedItem.description}</p>
			</div>
		</Dialog>
	{/if} -->
</div>
<style lang="scss">
.root {
	width: 100%;
}

.popup {
	padding: 20px;
	display: flex;
	flex-direction: column;

}

.list-outer {
	display: flex;
	gap: 20px;
}

.dragging {
	cursor: grab;
}

.list-inner {
	flex: 1;
}

.hovering {
	border-color: orange;
}

.item {
	display: inline; /* required for flip to work */
}

li {
	background-color: lightgray;
	cursor: pointer;
	display: inline-block;
	margin-right: 10px;
	padding: 10px;
	display: flex;
	align-items: center;
	gap: 5px;
	justify-content: space-between;
}

li:hover {
	background: orange;
	color: white;
}

ul {
	border: solid lightgray 1px;
	display: flex; /* required for drag & drop to work when .item display is inline */
	flex-direction: column;
	gap: 8px;
	height: 40px; /* needed when empty */
	padding: 10px;
	height: 70vh;
}

button {
	width: 30px;
	height: 30px;
	background: no-repeat 50% 50% url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
	cursor: pointer;
	border: none;
}

.deleteButton:hover {
	transform: scale(1.1);
}
</style>