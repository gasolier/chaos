let cells = new Array();
let original_cells = new Array();
let mode = 'setup';
let edge_vals = {'x0': 1e20, 'x1': 0, 'y0': 1e20, 'y1': 0};
let current_point = null;

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.class('canvas');
	canvas.mouseClicked(add_point);
	fill(0);
}

function draw() {
	clear();

	if (mode == 'draw_points') { 
		while (n > 0) {
			new_point(); 
			n--;
		} 
	}

	Array.prototype.forEach.call(cells, function(point) {
			ellipse(point.x, point.y, 2, 2);
		}
	)
}

function add_point () {
	if (mode == 'setup') {
		let new_point = {'x': mouseX, 'y':mouseY};
		
		edge_vals.x0 = min(new_point.x, edge_vals.x0);
		edge_vals.x1 = max(new_point.x, edge_vals.x1);
		edge_vals.y0 = min(new_point.y, edge_vals.y0);
		edge_vals.y1 = max(new_point.y, edge_vals.y1);

		cells.push(new_point);
		original_cells.push(new_point)
	}
}

function new_point() {
	let aim = original_cells[Math.floor(Math.random() * original_cells.length)];
	let new_point = {'x': (aim.x + current_point.x) / 2, 'y': (aim.y + current_point.y) / 2};
	cells.push(new_point);
	current_point = new_point;
}

document.getElementById('change_mode').onclick = function () { 
	cells = [];
	n = iters.value;
	current_point = {'x': random(edge_vals.x0, edge_vals.x1), 'y': random(edge_vals.y0, edge_vals.y1)};
	mode = 'draw_points'; 
};