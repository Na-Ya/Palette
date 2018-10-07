const d3 = require('d3');
const d3Color = require('d3-color');

const width = window.innerWidth,
	height = window.innerHeight;

const nodes = [];

const generateColor = palette => {
	const currColor = palette[Math.floor(Math.random() * palette.length)];
	return currColor;
};

const getRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};
const firstColors = ['#247BA0', '#CC2936', '#F39237'];
let newColors = new Array(3).fill(0).map(ele => getRandomColor());
const sizes = [3, 7, 11];

const getRandomSize = sizeArr => {
	return sizeArr[Math.floor(Math.random() * sizeArr.length)];
};
const svg = d3
	.select('body')
	.append('svg')
	.attr('width', width)
	.attr('height', height);

const force = d3.layout
	.force()
	.charge(-15)
	.friction(1)
	.size([width, height])
	.nodes(nodes)
	.on('tick', tick)
	.start();

function tick() {
	svg
		.selectAll('circle')
		.attr('cx', function(d) {
			return d.x;
		})
		.attr('cy', function(d) {
			return d.y;
		});
}

const interval = setInterval(function() {
	const d = {
		x: width / 2 + 2 * Math.random() - 1,
		y: height / 2 + 2 * Math.random() - 1
	};

	svg
		.append('circle')
		.data([d])
		.attr('r', 1e-6)
		.attr('fill', generateColor(newColors))
		.transition()
		.ease(Math.sqrt)
		.attr('r', getRandomSize(sizes))
		.duration(2000);

	if (nodes.push(d) > 300) {
		clearInterval(interval);
		setTimeout(() => {
			force
				.charge(-40)
				.friction(0.9)
				.start();
			newColors = new Array(3).fill(0).map(ele => getRandomColor());
			svg
				.selectAll('circle')
				.attr('fill', function(d) {
					return generateColor(newColors);
				})
				.attr('r', () => getRandomSize(sizes));
			setTimeout(() => {
				force
					.charge(-20)
					.friction(1)
					.start();
			}, 500);
		}, 300);

		setInterval(() => {
			// setTimeout(() => {
			force
				.charge(-40)
				.friction(0.9)
				.start();
			newColors = new Array(3).fill(0).map(ele => getRandomColor());
			svg
				.selectAll('circle')
				.attr('fill', function(d) {
					return generateColor(newColors);
				})
				.attr('r', () => getRandomSize(sizes));
			// }, 300);

			setTimeout(() => {
				force
					.charge(-20)
					.friction(1)
					.start();
			}, 500);
		}, 3500);
	}
	force.start();
}, 30);
