

var div = document.getElementById('chart0');


let lines = [
    {
        name: 'slow',
        shape: 'line',
        data: [[0,0],[150,100],[200,400],[250,200],[300,320],[350,213],[400,362],[450,373],[500,120],[550,180],[600,280],[650,350]],
        color:'#ffa39e'
    },
    {
        name: 'regular',
        shape: 'curve',
        data: [[0,0],[200,100],[300,200],[370,330],[450,420],[500,340],[580,260],[625,100]],
        color:'#bae637'
    },
    {
        name: 'fast',
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
    x:1000,
    y:30,
    xedge:40,
    yedge:30,
    xgap:15,
    ygap:15,
    xname:'test x name',
    yname: 'test y name'
};
new_canvas(div,1200,500, 5,lines,background,autoredraw=true);

