document.addEventListener('click', (event) => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id;
		remove(id).then(() => {
			event.target.closest('li').remove();
		});
	}
	else if (event.target.dataset.type === 'edit') {
		const id = event.target.dataset.id;
		title = prompt('Введите новое название');
		if (title) {
			const id = event.target.dataset.id;
			updatedNote = {id, title};
			edit(updatedNote);
			const newText = document.createTextNode(title);
			const listItem = event.target.closest('li');
			for (let node of listItem.childNodes) {
			    if (node.nodeType === Node.TEXT_NODE) {
			        listItem.removeChild(node);
			    }
			}
			listItem.insertBefore(newText, listItem.firstChild);
		}
	}
})


async function edit(updatedNote) {
	await fetch('/', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(updatedNote)
	});
}

async function remove(id) {
	await fetch(`/${id}`, {method: 'DELETE'})
}