'use strict';
const header = document.querySelector('header');
const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
	header.classList.toggle('active');
});

document.addEventListener('click', e => {
	if (!e.target.closest('nav') && !e.target.closest('.burger') && header.classList.contains('active')) {
		header.classList.remove('active');
	}
});

