document.addEventListener('click', async (event) => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id;
		await remove(id).then(() => {
			event.target.closest('li').remove();
		});
	}
	else if (event.target.dataset.type === 'edit') {
		const id = event.target.dataset.id;
		const listItem = event.target.closest('li');
		const value = listItem.innerText.split('\n')[0];

		createUpdatedLi(id, value, listItem);
	}
	else if (event.target.dataset.type === 'cancel') {
		const id = event.target.dataset.id;
		const value = event.target.dataset.cancel;
		const listItem = event.target.closest('li');

		createDefaultLi(id, value, listItem);
	}
	else if (event.target.dataset.type === 'save') {
		const id = event.target.dataset.id;
		const input = document.querySelector('.input');
		const value = input.value;
		const listItem = event.target.closest('li');

		const updatedNote = {id, title: value};
		await edit(updatedNote).then(() => {
			createDefaultLi(id, value, listItem);
		});
	}
})


async function edit(updatedNote) {
	fetch('/', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(updatedNote)
	});
}

async function remove(id) {
	fetch(`/${id}`, {method: 'DELETE'})
}

function createDefaultLi(id, value, listItem) {
	listItem.innerHTML = '';
	listItem.innerText = value;

	const buttonDiv = document.createElement('div');
	const button1 = document.createElement('button');
	const button2 = document.createElement('button');

	buttonDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');
	button1.classList.add('btn', 'btn-primary',  'm-2');
	button1.innerText = 'Обновить';
	button1.setAttribute('data-id', id);
	button1.setAttribute('data-type', 'edit');
	button2.setAttribute('data-id', id);
	button2.setAttribute('data-type', 'remove');
	button2.classList.add('btn', 'btn-danger');
	button2.innerText = '×';

	buttonDiv.appendChild(button1);
	buttonDiv.appendChild(button2);
	listItem.appendChild(buttonDiv);

}

function createUpdatedLi(id, value, listItem) {
		const input = document.createElement('input');
		const buttonDiv = document.createElement('div');
		const button1 = document.createElement('button');
		const button2 = document.createElement('button');

		input.classList.add('input');
		buttonDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');
		button1.classList.add('btn', 'btn-success',  'm-2');
		button1.innerText = 'Сохранить';
		button1.setAttribute('data-id', id);
		button1.setAttribute('data-type', 'save');
		button2.setAttribute('data-id', id);
		button2.setAttribute('data-type', 'cancel');
		button2.setAttribute('data-cancel', value);
		button2.classList.add('btn', 'btn-danger');
		button2.innerText = 'Отменить';

		buttonDiv.appendChild(button1);
		buttonDiv.appendChild(button2);


		input.value = value;
		listItem.innerHTML = '';
		listItem.appendChild(input);
		listItem.appendChild(buttonDiv);
}
