'use strict';

const btnClass = '.product__btn-add';
const itemsList = Array.prototype.slice.call(document.querySelectorAll('.product__item'));
const totalPrice = document.querySelector('.output__total-price');
const outputList = document.querySelector('.output__list');
const limit = document.querySelector('.budget-number').getAttribute('data-number');

const addItemToBasket = (item) => {
	const clonedItem = item.cloneNode(true);
	const btn = clonedItem.querySelector('.product__btn-add');
	const price = clonedItem.querySelector('.product__price').getAttribute('data-price');
	const newPrice = Number.parseInt(totalPrice.textContent) + Number.parseInt(price);

	if( newPrice >= limit ) {
		alert('Sorry, вы исчерпали бюджет')
	} else {
		outputList.appendChild(clonedItem);
		btn.textContent = 'Убрать из корзины';
		totalPrice.textContent = newPrice;
		btn.addEventListener('click', removeItemFromBasket.bind( null, clonedItem ));
	}
}

const removeItemFromBasket = (item) => {
	const price = item.querySelector('.product__price').getAttribute('data-price');

	outputList.removeChild(item);
	totalPrice.textContent =  Number.parseInt(totalPrice.textContent) - Number.parseInt(price);
}

const initListenerToBasketItem = (btn, item) => {
	btn.addEventListener('click', addItemToBasket.bind( null, item ));
}

itemsList.map(a => initListenerToBasketItem(a.querySelector(btnClass), a));