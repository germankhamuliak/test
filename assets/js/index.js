const point = document.querySelector('.line .point');
const line = document.querySelector('.line');
const rangeWidth = line.getBoundingClientRect().width; 
const selected = document.querySelector('.selector')
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let counter = 0;
slider.addEventListener('click', (e) => {
	if (e.target.closest('.right') && counter < slides.length - 1) {
		counter++;
		slides.forEach(e => {
			e.style.left = -(counter * document.querySelector('.slide').getBoundingClientRect().width) + 'px';
		})
	}
	if (e.target.closest('.left') && counter > 0) {
		counter--;
		slides.forEach(e => {
			e.style.left = -(counter * document.querySelector('.slide').getBoundingClientRect().width) + 'px';
		});
	}
});

selected.addEventListener('click', (e) => {
    selected.classList.toggle('show');
    if (e.target.closest('label')) {
        document.querySelector('.selected').innerHTML = e.target.closest('label').innerHTML;
        selected.classList.toggle('show');
    }
})

document.addEventListener('click', e => {
	if (!e.target.closest('.selector') && selected.classList.contains('show')) {
		selected.classList.remove('show');
	}
});

line.addEventListener('click', (e) => { 
    point.style.left = e.layerX + 'px'; 
    document.querySelector('.value input').value = Math.round((e.layerX / rangeWidth) * 100)
});

point.addEventListener('mousedown', (e) => { 
    const rangePickerRect = point.getBoundingClientRect(); 
    let shiftX = e.clientX - rangePickerRect.left; 
    moveAt(e.clientX, shiftX); 
    function onMouseMove(e) { 
        moveAt(e.clientX, shiftX); 
    } 
    document.addEventListener('mousemove', onMouseMove); 
    document.onmouseup = () => { 
        document.removeEventListener('mousemove', onMouseMove); 
    }; 
    point.style.left = document.querySelector('.value input').value * 100 / rangeWidth;
});
function moveAt(clientX, shiftX) { 
    if (clientX - document.querySelector('.wrapper').getBoundingClientRect().left  < 0 || clientX - document.querySelector('.wrapper').getBoundingClientRect().left > rangeWidth) { 
        if (clientX - document.querySelector('.wrapper').getBoundingClientRect().left  < 0) { 
            point.style.left = 0 + 'px'; 
        } else { 
            point.style.left = rangeWidth - 12  + 'px'; 
        } 
    } else { 
        point.style.left = clientX - shiftX - document.querySelector('.wrapper').getBoundingClientRect().left + 12 + 'px'; 
        value();
    } 
};
function value() {
    document.querySelector('.value input').value = Math.round(((clientX - shiftX - document.querySelector('.wrapper').getBoundingClientRect().left + 12) / rangeWidth) * 100);
}