
function new_canvas(div,width,height,speed, lines) {
    //paras
    let num = -1;
    let p = 0;
    let i = 0;
    let linenumber = 0;
    let colors = ['blue','black','red','green','yellow'];
    let anid = 0;
    let canvas = document.createElement('canvas');


    div.appendChild(canvas);
    canvas.width= width;
    canvas.height=height;
    let paper = canvas.getContext('2d');



    let form = document.createElement('form');
    div.appendChild(form);
    let label = document.createElement('label');
    form.appendChild(label);
    label.innerText='reshape this line';
    let lineelcter = document.createElement('select');
    form.appendChild(lineelcter);
    for (let m=0;m<lines.length;m++){
        let option1 = document.createElement('option');
        lineelcter.appendChild(option1);
        option1.value= m;
        option1.innerText='line'+m;}
    let colorselecter = document.createElement('select');
    form.appendChild(colorselecter);
    for (let c=0;c<colors.length;c++){
        let option = document.createElement('option');
        colorselecter.appendChild(option);
        option.value = colors[c];
        option.innerText = colors[c];
    }
    let shapeselecter = document.createElement('select');
    form.appendChild(shapeselecter);
    let option = document.createElement('option');
    shapeselecter.appendChild(option);
    option.value = 'curve';
    option.innerText = 'curve';
    let option2 = document.createElement('option');
    shapeselecter.appendChild(option2);
    option2.value = 'line';
    option2.innerText = 'line';
    let blankline = document.createElement('br');
    form.appendChild(blankline);
    let submit = document.createElement('button');
    form.appendChild(submit);
    submit.value = 'Redraw';
    submit.innerText = 'Redraw';
    form.addEventListener('submit',function(e){
        var event = e || window.event;
        event.preventDefault();
        redraw(event);
    });


    function redraw(event) {
        console.log(event);
        let id = lineelcter.value;
        console.log(id);
        let color = colorselecter.value;
        console.log(color);
        let shape = shapeselecter.value;
        console.log(shape);
        lines[id].color = color;
        lines[id].shape = shape;
        paper.clearRect(0, 0, 1500, 750);
        init();
    }

    init();
    function init(){
        cancelAnimationFrame(anid);
        paper.clearRect(0,0,1500,750);
        p = 0;
        num = 0;
        console.log('init');
        draw();
    }

    function nextpoint() {
        p = 0;
        num += 1;
        console.log('nextpoint');
        draw();

    }

    function draw() {
        console.log('background rendered');
        for (let j=0;j<lines.length;j++){
            if (num === lines[j].data.length-1){cancelAnimationFrame(anid);}
            if (lines[j].shape ==='curve')
            {drawcurve(lines[j].data[num], lines[j].data[num + 1], p, 0.2, lines[j].color);}
            if (lines[j].shape ==='line')
            {drawline(lines[j].data[num],lines[j].data[num+1],p, lines[j].color);}}
        p += speed/10;
        backgroundliens();
        if (p <= 100) {
            anid = requestAnimationFrame(draw);
        } else {
            nextpoint();
        }
    }

    function drawline(start, end, p, color) {
        paper.strokeStyle = color;
        paper.lineWidth = 6;

        paper.beginPath();
        paper.moveTo(start[0], start[1]);
        for (i = 0; i < p / 100; i += 0.005) {
            var x = start[0] + (end[0] - start[0]) * i;
            var y = start[1] + (end[1] - start[1]) * i;
            paper.lineTo(x, y);
        }
        paper.stroke();
    }

    function drawcurve(start, end, p, curveness, color) {
        paper.strokeStyle = color;
        paper.lineWidth = 6;

        var middlepoint = [(start[0] + end[0]) / 2 - (start[1] - end[1]) * curveness,
            (start[1] + end[1]) / 2 - (end[0] - start[0]) * curveness];
        paper.beginPath();
        paper.moveTo(start[0], start[1]);
        for (i = 0; i < p / 100; i += 0.005) {
            var x = quadraticBezier(start[0], middlepoint[0], end[0], i);
            var y = quadraticBezier(start[1], middlepoint[1], end[1], i);
            paper.lineTo(x, y);
        }
        paper.stroke();
    }
    function quadraticBezier(p0, p1, p2, t) {
        var k = 1 - t;
        return k * k * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

    }

    // this part of count the bezier curve uses the idea of this blog :https://juejin.cn/post/6844903829989769223

    function backgroundliens() {
        paper.strokeStyle = 'grey';
        paper.lineWidth = 1;
        paper.beginPath();
        for (i = 0; i <= 1500; i = i + 50) {
            paper.moveTo(i, 0);
            paper.lineTo(i, 500);
        }
        paper.closePath();
        paper.stroke();
        paper.beginPath();
        for (i = 0; i <= 500; i = i + 50) {
            paper.moveTo(0, i);
            paper.lineTo(1500, i);
        }
        paper.closePath();
        paper.stroke();
    }
}
