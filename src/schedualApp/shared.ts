export type ListItem = {
	id: number
	createdAt: Date
	belongsTo: string
	title: string
	description: string
}


// format Dates to DD/MMM
export function formatDate(date: Date) {
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	let month = date.getMonth()
	return (
	[
		date.getDate(),
		months[month],
		date.getFullYear(),
	].join('/')
	);
}



// local storage setup
export function localStorageSetup() {
	if (!localStorage.lists){
		let listDefault = [
			{
				name: 'todo',
				items: []
			}, 
			{
				name: 'doing',
				items: []
			}, 
			{
				name: 'done',
				items: []
			}
		]
		localStorage.setItem("lists", JSON.stringify(listDefault))
	}

	if(!localStorage.uid) {
		let uid = 13

		localStorage.setItem("uid", JSON.stringify(uid))
	}

}

//updating the uid in storage after an item is added
export function updateUID(id) {
	let newid = ++id
	localStorage.setItem("uid", JSON.stringify(newid))
}

//updating the lists array in both localStorage and localy
export function updateLists(updatedLists){
	localStorage.setItem("lists", JSON.stringify(updatedLists))
}


//add item to a list in local storage
export function addItem(input, listIndex) {
	let myLists = JSON.parse(localStorage.getItem("lists"));
	let uid = JSON.parse(localStorage.getItem("uid"));

	let item = {
		id: uid,
		createdAt: new Date(),
		belongsTo: myLists[listIndex].name,
		title: input.value,
		description: ""
	}

	input.value = '';

	myLists[listIndex].items.push(item)

	updateUID(uid)
	updateLists(myLists)
}


//remove an item from a list in local storage
export function removeItem(listIndex, itemIndex) {
	let myLists = JSON.parse(localStorage.getItem("lists") || "[]");
	let deletedItem = myLists[listIndex].items.splice(itemIndex, 1);

	updateLists(myLists)
}


//add list to the lists array in local storage
export function addList(input) {
	let myLists = JSON.parse(localStorage.getItem("lists") || "[]");

	let list = { name: input.value, items: [] }

	myLists.push(list)

	input.value = '';
	updateLists(myLists)
}








//
export function removeList(listIndex) {
	let myLists = JSON.parse(localStorage.getItem("lists") || "[]");

	console.log(myLists)
	myLists[0].items.push(listIndex)

	updateLists(myLists)
}


// 
export function moveItem(listIndex, itemIndex, newListIndex, newItemIndex) {

	//TODO:: add ability to move item order in same list

	let myLists = JSON.parse(localStorage.getItem("lists") || "[]");

	// Remove the item from one list.
	// Splice returns an array of the deleted elements, just one in this case.
	const [item] = myLists[listIndex].items.splice(itemIndex, 1);
	
	// Add the item to the drop target list.
	myLists[newListIndex].items.push(item);

	localStorage.setItem("lists", JSON.stringify(myLists))


}


//TODO: add ability to move lists order around
export function moveList(listIndex, newListIndex) {

}