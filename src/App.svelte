<script lang="ts">
// import HomeDashboard from "./HomeDashboard.svelte";
// import TemperatureControl from "./TemperatureControl.svelte";

import TodoList from "./schedualApp/TodoList.svelte";
</script>

<div class="root">
	
<div>
	<TodoList/>
</div>
	
	<!-- <div>
		<HomeDashboard />
	</div> -->
	<!-- <div >
		<TemperatureControl />
	</div> -->
</div>

<style>
.root {
	justify-content: space-between;
	height: 100%;
	width: 100%;
	background-color: #15161a;
	color: white;
}

.root > div {
	/* margin: 50px auto ; */
}
</style>