const RESOLUTION = 800;

window.onload = () => {
    let canvas = document.getElementById("canvas");
    canvas.width = RESOLUTION;
    canvas.height = RESOLUTION;
    let ctxt = canvas.getContext("2d");

    let polygon = generateConvexPolygon(10);

    ctxt.setTransform(RESOLUTION, 0, 0, RESOLUTION, 0, 0);

    ctxt.lineWidth = 0.004;
    ctxt.beginPath();
    ctxt.moveTo(polygon[0][0], polygon[0][1]);
    for(let i=1;i<polygon.length;i++) {
        ctxt.lineTo(polygon[i][0], polygon[i][1]);
    }
    ctxt.closePath();
    ctxt.stroke();

    ctxt.strokeStyle = "#AAAA";
    for(let i=3;i<polygon.length;i++) {
        ctxt.beginPath();
        ctxt.moveTo(polygon[1][0], polygon[1][1]);
        ctxt.lineTo(polygon[i][0], polygon[i][1]);
        ctxt.stroke();
    }

    for(let point of polygon) {
        ctxt.beginPath();
        ctxt.arc(point[0], point[1], 0.01, 0, 2 * Math.PI);
        ctxt.fill();
    }
}

function generateConvexPolygon(size) {
    let result = [];
    // ellipse parameters
    let width = Math.random() * 0.35 + 0.1;
    let height = Math.random() * 0.35 + 0.1;
    let rotation = Math.random() * 2 * Math.PI;
    for(let i=0;i<size;i++) {
        // skipping points to get more interesting convex shapes
        if(Math.random() < 0.3) {
            continue;
        }

        // points are partially uniformly distributed
        let shiftedRelativeIndex = (i + Math.random()) / size;
        let angle = 2 * Math.PI * shiftedRelativeIndex + rotation;
        
        result.push([
            0.5 + width * Math.cos(angle),
            0.5 + height * Math.sin(angle)
        ]);
    }
    return result;
}
