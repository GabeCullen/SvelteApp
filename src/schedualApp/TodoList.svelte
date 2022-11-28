<script>
// Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
import {flip} from 'svelte/animate';
// import lists from '../assets/listsWithItems.json'

let lists = [
	{
		"name": "Todo",
		"items": [
			{ "id": 9990, "done": false, "title": "Clean up color scheme", "description": "" },
			{ "id": 9991, "done": false, "title": "Click on item to view in dialog", "description": "" },
			{ "id": 9994, "done": false, "title": "Edit title and add/edit description", "description": "" },
			{ "id": 9995, "done": false, "title": "Click on item to view in dialog", "description": "" }
		]
	},
	{
		"name": "Doing",
		"items": [
			{ "id": 9992, "done": false, "title": "Drag items from one list to another", "description": "" }
		]
	},
	{
		"name": "Done",
		"items": [
			{ "id": 9993, "done": true, "title": "Drag items from one list to another", "description": "" }
		]
	}
]
let uid = 1;
let hoveringOverList;

function dragStart(event, listIndex, itemIndex) {
	// The data we want to make available when the element is dropped
	// is the index of the item being dragged and
	// the index of the list from which it is leaving.
	const data = {listIndex, itemIndex};
	event.dataTransfer.setData('text/plain', JSON.stringify(data));
}
	
function drop(event, listIndex) {
	event.preventDefault();
	const json = event.dataTransfer.getData("text/plain");
	const data = JSON.parse(json);
	
	// Remove the item from one list.
	// Splice returns an array of the deleted elements, just one in this case.
	const [item] = lists[data.listIndex].items.splice(data.itemIndex, 1);
	
	// Add the item to the drop target list.
	lists[listIndex].items.push(item);
	lists = lists;
	
	hoveringOverList = null;
}

function add(input) {
	const todo = {
		id: uid++,
		done: false,
		title: input.value,
		description: ""
	};

	lists[0].items.push(todo);
	lists = lists;
	input.value = '';
}

function remove(listIndex, itemIndex) {
	const [item] = lists[listIndex].items.splice(itemIndex, 1);
	
	lists = lists;
	
	hoveringOverList = null;
}
</script>
<div class="root">
	<p style="text-align:center">Drag items from one list to another.</p>
	<input
		placeholder="what needs to be done?"
		on:keydown={e => e.key === 'Enter' && add(e.target)}
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
					ondragover="return false"
				>
					{#each list.items as item, itemIndex (item)}
						<div class="item" animate:flip>
							<li
								draggable={true}
								on:dragstart={event => dragStart(event, listIndex, itemIndex)}
							>
								{item.title}
								<button on:click={event => remove(listIndex, itemIndex)}></button>
							</li>
						</div>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
<style>
.root {
	width: 100%;
}

.list-outer {
	display: flex;
	gap: 20px;
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
	cursor: grab;
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
</style>