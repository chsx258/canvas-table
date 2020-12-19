function new_canvas(div,width,height,speed, lines,background,autoredraw=false,colorPanel=false,
                    zoomPanel=false,speedPanel=false, dataPanel = false) {
    //paras
    let num = -1;
    let p = 0;
    let i = 0;
    let linenumber = 0;
    let colors = ['blue','black','red','green','yellow'];
    let anid = 0;
    let canvas = document.createElement('canvas');
    let ori_speed = speed;
    let sendBack = 0;
    let xNow = 0;
    let yNow = 0;
        // let ori_lines  = function(lines){
        //     let ans = {};
        //     for (let k in lines){
        //         ans[k] = typeof lines[k] === 'object' ? ori_lines(lines[k]):lines[k]
        //     }
        //     return ans
        // }
    let ori_lines = JSON.parse(JSON.stringify(lines));
    div.appendChild(canvas);
    canvas.width= width;
    canvas.height=height;
    let paper = canvas.getContext('2d');

    let zPanel = document.createElement("div");
    div.appendChild(zPanel);
    let sPanel = document.createElement("div");
    div.appendChild(sPanel);
    //the form that allows user to change a certain line
    let form = document.createElement('form');
    if (colorPanel){
        div.appendChild(form);
    }
    let label = document.createElement('label');
    form.appendChild(label);
    label.innerText='reshape this line';
    let lineelcter = document.createElement('select');
    form.appendChild(lineelcter);


    for (let m=0;m<lines.length;m++){
        let option1 = document.createElement('option');
        lineelcter.appendChild(option1);
        option1.value= m;
        option1.innerText=lines[m].name;
    }

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
    let optionDot = document.createElement('option');
    shapeselecter.appendChild(optionDot);
    optionDot.value = 'dot';
    optionDot.innerText = 'dot';


    // let blankline = document.createElement('br');
    //
    // form.appendChild(blankline);
    let submit = document.createElement('button');

    form.appendChild(submit);
    submit.value = 'Redraw';
    submit.innerText = 'Redraw';

    form.addEventListener('submit',function(e){
        var event = e || window.event;
        event.preventDefault();
        redraw(event);
    });

    // let resetline = document.createElement("button");
    // resetline.innerText = 'reset color and shape';
    // resetline.addEventListener("click", resetlines);
    //
    //
    // function resetlines(){
    //     lines = JSON.parse(JSON.stringify(ori_lines));
    //     redraw(event)
    // }
    // div.appendChild(resetline);


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

    // button that allows user to zoom in x or y axis
    // button1 extend xaxis
    // button2 shrink xaxis
    // button3 extend xaxis
    // button4 shrink xaxis
    // button5 reset the axis

    //button 6-8 controlls the speed
    //button6 speed system up
    //button7 slowdown the system
    //button8 reset the system speed to original speed
    let button1 = document.createElement("button");
    let button2 = document.createElement("button");
    let button3 = document.createElement("button");
    let button4 = document.createElement("button");
    let button5 = document.createElement("button");
    let button6 = document.createElement("button");
    let button7 = document.createElement('button');
    let button8 = document.createElement('button');
    if (zoomPanel){
        zPanel.appendChild(button1);
        zPanel.appendChild(button2);
        zPanel.appendChild(button3);
        zPanel.appendChild(button4);
        zPanel.appendChild(button5);
    }

    if (speedPanel) {
        sPanel.appendChild(button6);
        sPanel.appendChild(button7);
        sPanel.appendChild(button8);
    }
    button1.innerText = 'extend x axis';
    button2.innerText = 'shrink x axis';
    button3.innerText = 'extend y axis';
    button4.innerText = 'shrink y axis';
    button5.innerText = 'reset axis';
    button6.innerText = 'speed up';
    button7.innerText = 'slow down';
    button8.innerText = 'reset speed';


    button1.addEventListener('click',extendx);
    button2.addEventListener('click',shrinkx);
    button3.addEventListener('click',extendy);
    button4.addEventListener("click", shrinky);
    button5.addEventListener("click", reset);
    button6.addEventListener("click", speedup);
    button7.addEventListener('click',slowdown);
    button8.addEventListener("click", resetspeed);

    function extendx() {
        console.log('button1');
        paper.scale(1.3,1);
        redraw(event);
    }

    function  shrinkx() {
        paper.scale(1/1.3,1);
        redraw(event);
    }

    function extendy() {
        paper.scale(1,1.3);
        redraw(event);

    }

    function  shrinky() {
        paper.scale(1,1/1.3);
        redraw(event);

    }

    function reset(){
        paper.setTransform(1,0,0,1,0,0);
        redraw(event);
    }

    function speedup() {
        speed +=2;
        redraw(event);
    }

    function slowdown() {
        speed -=1;
        redraw(event);
    }
    function resetspeed() {
        speed = ori_speed;
        redraw(event);
    }


    let dPanel = document.createElement("div");
    if (dataPanel){
        div.appendChild(dPanel);
    }

    let dataForm = document.createElement('form');
    dPanel.appendChild(dataForm);
    let lineelcter2 = document.createElement('select');
    dataForm.appendChild(lineelcter2);


    for (let m=0;m<lines.length;m++){
        let option1 = document.createElement('option');
        lineelcter2.appendChild(option1);
        option1.value= m;
        option1.innerText=lines[m].name;
    }
    let submit1 = document.createElement('button');

    submit1.value = 'Reset Color and Shape';
    submit1.innerText = 'Reset Color and Shape';

    form.addEventListener('submit',function(e){
        var event = e || window.event;
        event.preventDefault();
    });



    let text = document.createElement("textarea");
    dPanel.appendChild(text);
    text.rows = 10;
    text.cols = 30;
    text.innerText = 'x: '+xNow+" y: "+yNow;

    //form.appendChild(submit1);




    // start drawing
    init();
    function init(){
        cancelAnimationFrame(anid);
        paper.clearRect(0,0,1500,750);
        p = 0;
        num = 0;
        console.log('init');
        backgrounds(background.x,background.y,background.xedge,background.yedge,background.xgap,background.ygap,
        background.xname, background.yname);

        draw();
    }

    function nextpoint() {
        p = 0;
        num += 1;
        console.log('nextpoint');
        draw();

    }

    function draw() {
        let flag = 0;
        for (let j=0;j<lines.length;j++){
            if (num < lines[j].data.length-1){
                flag += 1;
                if (num === lines[j].data.length-1){cancelAnimationFrame(anid);}
                if (lines[j].shape ==='curve')
                {drawcurve(lines[j].data[num], lines[j].data[num + 1], p, 0.2, lines[j].color);}
                if (lines[j].shape ==='line')
                {drawline(lines[j].data[num],lines[j].data[num+1],p, lines[j].color);}
                if (lines[j].shape ==='dot')
                {drawdotline(lines[j].data[num],lines[j].data[num+1],p, lines[j].color);}
                sendBack = lineelcter2.value;
                if (j == sendBack && (p % 10) <((p - speed/10)%10)){
                    xNow = (lines[j].data[num+1][0] - lines[j].data[num][0])*p/100+lines[j].data[num][0];
                    yNow = (lines[j].data[num+1][1] - lines[j].data[num][1])*p/100+lines[j].data[num][1];
                    text.innerText = 'data for: '+lines[j].name+ "\r\n" +'                  x: '+xNow+
                        "                           y: "+yNow;
                }
            }
        }
        p += speed/10;
        if (flag === 0){
            if (autoredraw){init();}
            console.log('sleep');
        }
        else if (p <= 100) {
            anid = requestAnimationFrame(draw);
        } else {
            nextpoint();
        }
    }

    function drawline(start, end, p, color) {
        paper.strokeStyle = color;
        paper.lineWidth = 4;

        paper.beginPath();
        paper.moveTo(start[0]+background.xedge, canvas.height-start[1]-background.yedge);
        for (i = 0; i < p / 100; i += 0.005) {
            var x = start[0] + (end[0] - start[0]) * i+background.xedge;
            var y = canvas.height-(start[1] + (end[1] - start[1]) * i)-background.yedge;
            paper.lineTo(x, y);
            paper.stroke();

        }
    }

    function drawdotline(start, end, p, color) {
        paper.strokeStyle = color;
        paper.lineWidth = 4;

        paper.beginPath();
        paper.moveTo(start[0]+background.xedge, canvas.height-start[1]-background.yedge);
        for (i = 0; i < p / 100; i += 0.005) {
            var x = start[0] + (end[0] - start[0]) * i+background.xedge;
            var y = canvas.height-(start[1] + (end[1] - start[1]) * i)-background.yedge;
            paper.lineTo(x, y);
            paper.stroke();
            i += 0.02;
            paper.moveTo(start[0] + (end[0] - start[0]) * i+background.xedge,canvas.height-(start[1] + (end[1] - start[1]) * i)-background.yedge);
        }
    }

    function drawcurve(start, end, p, curveness, color) {
        paper.strokeStyle = color;
        paper.lineWidth = 4;

        var middlepoint = [(start[0] + end[0]) / 2 - (start[1] - end[1]) * curveness,
            (start[1] + end[1]) / 2 - (end[0] - start[0]) * curveness];
        paper.beginPath();
        paper.moveTo(start[0]+background.xedge, canvas.height-start[1]-background.yedge);

        for (i = 0; i < p / 100; i += 0.005) {
            var x = quadraticBezier(start[0], middlepoint[0], end[0], i)+background.xedge;
            var y = canvas.height-(quadraticBezier(start[1], middlepoint[1], end[1], i))-background.yedge;
            paper.lineTo(x, y);
            paper.stroke();
        }


    }
    // this part of count the bezier curve uses the idea of this blog :https://juejin.cn/post/6844903829989769223
    function quadraticBezier(p0, p1, p2, t) {
        var k = 1 - t;
        return k * k * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

    }

    //get the current y-axis of a select line
    function showydata(){


    }

    //get the current x-axis of the system
    function showxdata() {

    }






    //@para x: the start x position of legend
    //@para y: the start y position of legend
    //@para xedge: the edge of x axis
    //@para ydege: the edge of y axis
    function backgrounds(x,y,xedge,yedge,xgap,ygap,xname,yname) {
        console.log('background rendered');

        paper.fillStyle = "rgba(123,123,123,0.3)";
        paper.strokeStyle = "rgba(123,123,123,0.3)";
        paper.lineWidth = 0.5;
        paper.beginPath();

        for (i = 0; i <= canvas.width; i = i + 2*xgap) {
            paper.moveTo(xedge+i, yedge);
            paper.lineTo(xedge+i, height);
        }
        paper.closePath();
        paper.stroke();
        paper.beginPath();

        for (i = 0; i <= canvas.height; i = i + 2*ygap) {
            paper.moveTo(xedge, canvas.height-yedge-i);
            paper.lineTo(width, canvas.height-yedge-i);
        }
        paper.closePath();
        paper.stroke();
        //legend
        for (let j=0;j<lines.length;j++){
            paper.beginPath();
            paper.moveTo(x,y);
            paper.strokeStyle = lines[j].color;
            paper.lineTo(x+100,y);
            y += 50;
            paper.closePath();
            paper.stroke();
            paper.fillStyle = lines[j].color;
            paper.font = '20px Verdana';
            let text = lines[j].name;
            paper.textAlign = 'center';

            paper.fillText(text,x+30,y-55);
        }
        //axis
        paper.fillStyle = "rgba(100,123,160,0.7)";
        paper.strokeStyle = "rgba(100,123,160,0.7)";
        paper.lineWidth = 1;
        let xnum = (canvas.width-xedge-xedge)/xgap;
        let ynum = (canvas.height-yedge-yedge)/ygap;

        for (let i = 1; i<xnum; i++){
            paper.beginPath();
            if (i %5 === 0){
                paper.moveTo(xedge + i * xgap, canvas.height-yedge-12);
                paper.lineTo(xedge+i*xgap, canvas.height-yedge);
                paper.stroke();
                paper.textAlign = 'center';
                paper.fillText(i*xgap,xedge+i*xgap,canvas.height-yedge+20)
            }
            else{
                paper.moveTo(xedge + i * xgap, canvas.height-yedge-7);
                paper.lineTo(xedge+i*xgap, canvas.height-yedge);
                paper.stroke();
            }
        }

        for (let i = 1; i<ynum; i++){
            paper.beginPath();
            if (i %5 === 0){
                paper.moveTo( xedge, canvas.height-yedge-i*ygap);
                paper.lineTo(xedge+12, canvas.height-yedge-i*ygap);
                paper.stroke();
                paper.textAlign = 'end';
                paper.fillText(i*ygap,xedge,canvas.height-yedge-i*ygap+9)
            }
            else{
                paper.moveTo(xedge, canvas.height-yedge-i*ygap);
                paper.lineTo(xedge+7, canvas.height-yedge-i*ygap);
                paper.stroke();
            }
        }
        paper.fillStyle = "rgba(100,123,160,0.7)";
        paper.strokeStyle = "rgba(100,123,160,0.7)";
        paper.lineWidth = 1;
        paper.beginPath();
        paper.moveTo(xedge,canvas.height-yedge);
        paper.lineTo(canvas.width-xedge,canvas.height-yedge);
        paper.stroke();
        paper.moveTo(xedge,canvas.height-yedge);
        paper.lineTo(xedge,yedge);
        paper.stroke();

        paper.moveTo(canvas.width/2,0);
        paper.textAlign='end'
        paper.font = '20px Verdana';
        paper.fillText(xname,canvas.width-xedge,canvas.height-yedge-12);
        paper.textAlign='start'
        paper.fillText(yname,xedge,yedge);
    }
}
