# Canvas-Chart-sunxia54

This library focus on creating a chart with canvas animation. With this library,
developers can easily turn there data into a chart with 100% java script, which will be 
stable and can work on different browsers.

#How to use
To use this library,  CanvasChart.js should be included in the html. To create a chart, 
you should call function new_canvas(). There are several parameters of this function.

useage:    

    new_canvas(div,width,height,speed,lines,
    background,autoredraw,colorPanel,zoomPanel,speedPanel,dataPanel)

#API:

div: the destination div that will contain the canvas created.

width: the width of the canvas created.

height: the height of the canvas created.

speed: the speed of the drawing animation (recommend to start with 5).

lines: a list that contains all the information needed for each line.

[line1,line2..]

Each line should be an object, which contains

    {

        name: the name of the line,

        shape: line/curve/dot

        data: all the data points of the line,which should be a list of 
        tuples, for example

        [[0,0],[100,100],[150,300],[200,200]]

        color: color of the line 


    }

background: an object that contains needed parameters for creating background line of the canvas.
    
    {
        x: the start x-axis position of legend, int
        y: the height of each legend, int
        xedge: the edge of x-axis, int
        yedge: the edge of y-axis, int
        xgap: the gap between horizional lines, int
        ygap: the gap between vertical lines, int
        xname: name of x-axis, string
        yname: name of y-axis, string
    }
 
 autoredraw: Will redraw the chart after all lines finished if true. Default false.
 
 colorPanel:Open the color select panel for user if true. Default false.
 
 zoomPanel:Open the zoom panel for user if true. Default false.
 
 speedPanel:Open the speed control panel for user if true. Default false.
 
 dataPanel:Open the realtime data display panel for user if true. Default fasle.
 
 