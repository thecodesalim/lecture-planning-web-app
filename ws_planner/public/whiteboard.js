//const socket = io();
const svg = d3.select('svg');
let drawing = false;

/**
 * Drawing on canvas
 */
function draw(){
  if (drawing === false)
    return;

  const coords = d3.mouse(this);

  // Object of mouse oordinate
  const data ={
    x: coords[0],
    y: coords[1]
  }
  // Send coordinates to server
  socket.emit('draw', data)
  // Event trigger on drawing
  socket.on('draw', (data)=> {
    svg.append('circle').attr('cx', data.x).attr("cy", data.y).attr('r', 5).style("fill", "black");
  });
  
  svg.append('circle').attr('cx', coords[0]).attr("cy", coords[1]).attr('r', 5).style("fill", "black");
}

svg.on("mousedown", () => {
  console.log('down');
  drawing = true;
});

svg.on("mouseup", () => {
  console.log('up');
  drawing = false;
});

svg.on("mousemove", draw);
