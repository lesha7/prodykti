let name   = document.querySelector('#name');
let price  = document.querySelector('#price');
let amount = document.querySelector('#amount');
let add    = document.querySelector('#add');
let table  = document.querySelector('#table');
let total  = document.querySelector('#total');

add.addEventListener('click', function() {
	let tr = document.createElement('tr');
	
	allowEdit(createCell(tr, name.value, 'name'));
	allowEdit(createCell(tr, price.value, 'price'));
	allowEdit(createCell(tr, amount.value, 'amount'));
	
	createCell(tr, price.value * amount.value, 'cost');
	
	createCell(tr, 'удалить', 'remove').addEventListener('click', function() {
		this.parentElement.parentElement.removeChild(this.parentElement);
		recountTotal();
	});
	
	table.appendChild(tr);
	recountTotal();
});

function createCell(tr, value, name) {
	let td = document.createElement('td');
	td.textContent = value;
	td.classList.add(name);
	tr.appendChild(td);
	
	return td;
}

function allowEdit(td) {
	td.addEventListener('dblclick', function() {
		let text = td.textContent
		td.textContent = '';
		
		let input = document.createElement('input');
		input.value = text;
		input.focus();
		td.appendChild(input);
		
		input.addEventListener('keydown', function(event) {
			if (event.key == 'Enter') {
				td.textContent = this.value;
				
				if (td.classList.contains('price') || td.classList.contains('amount')) {
					let tr = td.parentElement;
					let price = tr.querySelector('.price');
					let amount = tr.querySelector('.amount');
					let cost = tr.querySelector('.cost');
					
					cost.textContent = price.textContent * amount.textContent;
					recountTotal();
				}
			}
		});
	});
}

function recountTotal() {
	let costs = table.querySelectorAll('.cost');
	
	if (costs) {
		let sum = 0;
		
		for (let cost of costs) {
			sum += +cost.textContent;
		}
		
		total.textContent = sum;
	}
}
