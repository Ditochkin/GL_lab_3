
let gl = null;
function initWebGl(canvas)
{
    gl = canvas.getContext("webgl");

    if (!gl)
    {
        console.log("WebGL not supported")
        gl = canvas.getContext("experimental-webgl");
    }

    if (!gl)
    {
        alert("Your browser does not support WebGL");
    }

    gl.clearColor(1, 0.85, 0.85, 1);
    gl.enable(gl.DEPTH_TEST);
    //gl.enable(gl.CULL_FACE);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function loadShader(gl, type, source)
{
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Error! Shader compile status ", gl.getShaderInfoLog(shader));
        return;
    }
    return shader;
}

function initShaderProgram(gl, vsSource, fsSource)
{
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    {
        console.error("Error! Link program", gl.getProgramInfoLog(shaderProgram));
        return;
    }

    gl.validateProgram(shaderProgram)
    if (!gl.getProgramParameter(shaderProgram, gl.VALIDATE_STATUS))
    {
        console.error("Error! validate program", gl.getProgramInfoLog(shaderProgram));
        return;
    }

    return shaderProgram;
}

function initBuffersCube() 
{
	let squareVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

	let vertices = 
    [ // X, Y, Z           R, G, B
		// Front
		-0.5, -0.5, -0.5,   0.5, 0.5, 0.5, // 3
		-0.5, 0.5, -0.5,    0.5, 0.5, 0.5, // 1
		0.5, 0.5, -0.5,     0.5, 0.5, 0.5, // 2

        -0.5, -0.5, -0.5,   0.5, 0.5, 0.5, // 3
		0.5, 0.5, -0.5,     0.5, 0.5, 0.5, // 2
        0.5, -0.5, -0.5,     0.5, 0.5, 0.5, // 4

        // Top
        -0.5, 0.5, -0.5,    0.2, 0.7, 0.1, // 1
        -0.5, 0.5, 0.5,    0.2, 0.7, 0.1, // 5
        0.5, 0.5, 0.5,     0.2, 0.7, 0.1, // 6

        -0.5, 0.5, -0.5,    0.2, 0.7, 0.1, // 1
        0.5, 0.5, -0.5,     0.2, 0.7, 0.1, // 2
        0.5, 0.5, 0.5,     0.2, 0.7, 0.1, // 6

        // Bottom
        -0.5, -0.5, -0.5,   0.1, 0.5, 0.0, // 3
		0.5, -0.5, 0.5,     0.1, 0.5, 0.0, // 8
        0.5, -0.5, -0.5,     0.1, 0.5, 0.0, // 4

        -0.5, -0.5, -0.5,   0.1, 0.5, 0.0, // 3
		0.5, -0.5, 0.5,     0.1, 0.5, 0.0, // 8
        -0.5, -0.5, 0.5,   0.1, 0.5, 0.0, // 7

        // Left
        -0.5, -0.5, -0.5,   0.5, 0.0, 1.0, // 3
		-0.5, 0.5, -0.5,    0.5, 0.0, 1.0, // 1
        -0.5, -0.5, 0.5,   0.5, 0.0, 1.0, // 7

        -0.5, 0.5, 0.5,    0.5, 0.0, 1.0, // 5
		-0.5, 0.5, -0.5,    0.5, 0.0, 1.0, // 1
        -0.5, -0.5, 0.5,   0.5, 0.0, 1.0, // 7

        //Right
        0.5, 0.5, -0.5,     0.2, 1.0, 0.1, // 2
		0.5, -0.5, 0.5,     0.2, 1.0, 0.1, // 8
        0.5, -0.5, -0.5,     0.2, 1.0, 0.1, // 4

        0.5, 0.5, -0.5,     0.2, 1.0, 0.1, // 2
		0.5, -0.5, 0.5,     0.2, 1.0, 0.1, // 8
        0.5, 0.5, 0.5,     0.2, 1.0, 0.1, // 6

        //Back
        -0.5, 0.5, 0.5,    0.2, 0.3, 0.5, // 5
		0.5, 0.5, 0.5,     0.2, 0.3, 0.5, // 6
        -0.5, -0.5, 0.5,   0.2, 0.3, 0.5, // 7

        0.5, -0.5, 0.5,     0.2, 0.3, 0.5, // 8
		0.5, 0.5, 0.5,     0.2, 0.3, 0.5, // 6
        -0.5, -0.5, 0.5,   0.2, 0.3, 0.5, // 7
	];

    let verticesSecond = 
    [ // X, Y, Z           R, G, B
		// Front
		-0.5, -0.5, -0.5,   0.75, 0.75, 0.75, // 3
		-0.5, 0.5, -0.5,    0.75, 0.75, 0.75, // 1
		0.5, 0.5, -0.5,     0.75, 0.75, 0.75, // 2

        -0.5, -0.5, -0.5,   0.75, 0.75, 0.75, // 3
		0.5, 0.5, -0.5,     0.75, 0.75, 0.75, // 2
        0.5, -0.5, -0.5,     0.75, 0.75, 0.75, // 4

        // Top
        -0.5, 0.5, -0.5,    0.75, 0.75, 0.75, // 1
        -0.5, 0.5, 0.5,    0.75, 0.75, 0.75, // 5
        0.5, 0.5, 0.5,     0.75, 0.75, 0.75, // 6

        -0.5, 0.5, -0.5,    0.75, 0.75, 0.75, // 1
        0.5, 0.5, -0.5,     0.75, 0.75, 0.75, // 2
        0.5, 0.5, 0.5,     0.75, 0.75, 0.75, // 6

        // Bottom
        -0.5, -0.5, -0.5,   0.75, 0.75, 0.75, // 3
		0.5, -0.5, 0.5,     0.75, 0.75, 0.75, // 8
        0.5, -0.5, -0.5,     0.75, 0.75, 0.75, // 4

        -0.5, -0.5, -0.5,   0.75, 0.75, 0.75, // 3
		0.5, -0.5, 0.5,     0.75, 0.75, 0.75, // 8
        -0.5, -0.5, 0.5,   0.75, 0.75, 0.75, // 7

        // Left
        -0.5, -0.5, -0.5,   0.5, 0.0, 1.0, // 3
		-0.5, 0.5, -0.5,    0.5, 0.0, 1.0, // 1
        -0.5, -0.5, 0.5,   0.5, 0.0, 1.0, // 7

        -0.5, 0.5, 0.5,    0.5, 0.0, 1.0, // 5
		-0.5, 0.5, -0.5,    0.5, 0.0, 1.0, // 1
        -0.5, -0.5, 0.5,   0.5, 0.0, 1.0, // 7

        //Right
        0.5, 0.5, -0.5,     0.2, 1.0, 0.1, // 2
		0.5, -0.5, 0.5,     0.2, 1.0, 0.1, // 8
        0.5, -0.5, -0.5,     0.2, 1.0, 0.1, // 4

        0.5, 0.5, -0.5,     0.2, 1.0, 0.1, // 2
		0.5, -0.5, 0.5,     0.2, 1.0, 0.1, // 8
        0.5, 0.5, 0.5,     0.2, 1.0, 0.1, // 6

        //Back
        -0.5, 0.5, 0.5,    0.2, 0.3, 0.5, // 5
		0.5, 0.5, 0.5,     0.2, 0.3, 0.5, // 6
        -0.5, -0.5, 0.5,   0.2, 0.3, 0.5, // 7

        0.5, -0.5, 0.5,     0.2, 0.3, 0.5, // 8
		0.5, 0.5, 0.5,     0.2, 0.3, 0.5, // 6
        -0.5, -0.5, 0.5,   0.2, 0.3, 0.5, // 7
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesSecond), gl.STATIC_DRAW);
}

function enableVertexAttrib(shaderProgram, attributeName, size, stride, offset)
{
    let attribLocation = gl.getAttribLocation(shaderProgram, attributeName);
    gl.vertexAttribPointer(
        attribLocation,
        size,
        gl.FLOAT,
        false,
        stride * Float32Array.BYTES_PER_ELEMENT,
        offset * Float32Array.BYTES_PER_ELEMENT
    );

    return attribLocation;
}