var div = document.getElementById('mycanvas');


let lines = [
    {
        name: 'line1',
        shape: 'line',
        data: [[0,0],[150,100],[200,400],[250,200],[300,320],[350,213],[400,362],[450,373],[500,120],[550,180],[600,280],[650,350]],
        color:'#ffa39e'
    },
    {
        name: 'line2',
        shape: 'curve',
        data: [[0,0],[300,300],[400,100],[500,430],[600,420],[700,140]],
        color:'#bae637'
    },
    {
        name: 'line3',
        shape: 'dot',
        data: [[0,0],[300,420],[400,150],[500,360],[600,420],[700,140]],
        color:'#9254de',
    },
];

//@para x: the start x-axis position of legend
// y: the height of each legend
// xedge,yedge: the edges of the axis
// xgap,ygap: the gap of backgroundlines
let background = {
    x:800,
    y:30,
    xedge:100,
    yedge:30,
    xgap:15,
    ygap:15
};
new_canvas(div,1200,500, 5,lines,background,true,true,true,true,true);
