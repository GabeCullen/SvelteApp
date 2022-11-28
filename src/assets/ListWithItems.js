import { writable } from 'svelte/store'

export let lists = writable(
	[
		{
			"name": "Todo",
			"items": [
				{ "id": 9990, "done": false, "description": "write some docs" },
				{ "id": 9991, "done": false, "description": "start writing blog post" }
			]
		},
		{
			"name": "Doing",
			"items": [
				{ "id": 9992, "done": false, "description": "Drag items from one list to another" }
			]
		},
		{
			"name": "Done",
			"items": []
		}
	]
)