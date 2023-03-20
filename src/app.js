
let vsSource =
    [
        'precision mediump float;',
        'attribute vec3 vertPositions;',
        'attribute vec3 vertColor;',
        'varying vec3 fragColor;',
        '',
        'uniform vec3 uColors;',
        'uniform mat4 mWorld;',
        'uniform mat4 mView;',
        'uniform mat4 mProj;',
        '',
        'void main()',
        '{',
        '   fragColor = uColors;',
        '   gl_Position = mProj * mView * mWorld * vec4(vertPositions, 1.0);',
        '}',
    ].join('\n');

let fsSource =
    [
        'precision mediump float;',
        '',
        'varying vec3 fragColor;',
        'void main()',
        '{',
        '   gl_FragColor = vec4(fragColor, 1.0);',
        '}',
    ].join('\n');

let canvas = document.getElementById("canvas1");
canvas.width = 1000;
canvas.height = 1000;

initWebGl(canvas);

let shaderProgram = initShaderProgram(gl, vsSource, fsSource);
gl.useProgram(shaderProgram);

initBuffersCube()

let positionAttribLocationCube = enableVertexAttrib(shaderProgram, "vertPositions", 3, 6, 0);
gl.enableVertexAttribArray(positionAttribLocationCube);

// Matrices for rotations
let worldMatrix = gl.getUniformLocation(shaderProgram, "mWorld");
let viewMatrix = gl.getUniformLocation(shaderProgram, "mView");
let projMatrix = gl.getUniformLocation(shaderProgram, "mProj");
let vecColors = gl.getUniformLocation(shaderProgram, "uColors");

let worldMatrixCube = new Float32Array(16);
let viewMatrixCube = new Float32Array(16);
let projMatrixCube = new Float32Array(16);
let uColorsCube = [0.0, 0.0, 0.0]

glMatrix.mat4.identity(worldMatrixCube)
glMatrix.mat4.lookAt(viewMatrixCube, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
glMatrix.mat4.perspective(projMatrixCube, toRadians(45), canvas.width / canvas.height, 0.1, 1000.0);

gl.uniformMatrix4fv(worldMatrix, false, worldMatrixCube);
gl.uniformMatrix4fv(viewMatrix, false, viewMatrixCube);
gl.uniformMatrix4fv(projMatrix, false, projMatrixCube);
gl.uniform3fv(vecColors, uColorsCube)

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// Matrices for cubes
let arr = new Float32Array(16);
let identityMatrix = glMatrix.mat4.identity(arr);

let topCubeMatrix = new Float32Array(16);
let botCubeMatrix = new Float32Array(16);
let leftCubeMatrix = new Float32Array(16);
let rightCubeMatrix = new Float32Array(16);

const norm = 1;
const defaultX = 0.5;
const defaultY = -1;
const defaultZ = -1;

glMatrix.mat4.translate(topCubeMatrix, identityMatrix, [defaultX, norm + defaultY, defaultZ]);
glMatrix.mat4.translate(botCubeMatrix, identityMatrix, [defaultX, defaultY, defaultZ]);
glMatrix.mat4.translate(leftCubeMatrix, identityMatrix, [norm + defaultX, defaultY, defaultZ]);
glMatrix.mat4.translate(rightCubeMatrix, identityMatrix, [-norm + defaultX, defaultY, defaultZ]);

// Actrions for rotations
let currentAngle = 0;
let currentAngleY = 0;

document.addEventListener('keydown', (event) => {
    let key = event.key;
    let angleRot = 3

    if (key == "ArrowLeft")
    {
        currentAngle -= angleRot;
        glMatrix.mat4.rotate(topCubeMatrix, topCubeMatrix, toRadians(-angleRot), [0, 1, 0]);
        glMatrix.mat4.rotate(botCubeMatrix, botCubeMatrix, toRadians(-angleRot), [0, 1, 0]);

        glMatrix.mat4.translate(leftCubeMatrix, identityMatrix, [norm * Math.cos(toRadians(-currentAngle + currentAngleY)) + defaultX, defaultY, norm * Math.sin(toRadians(-currentAngle + currentAngleY)) + defaultZ]);
        glMatrix.mat4.rotate(leftCubeMatrix, leftCubeMatrix, toRadians(currentAngle), [0, 1, 0]);

        glMatrix.mat4.translate(rightCubeMatrix, identityMatrix, [norm * Math.cos(toRadians(180 - currentAngle + currentAngleY)) + defaultX, defaultY, norm * Math.sin(toRadians(180 - currentAngle + currentAngleY)) + defaultZ]);
        glMatrix.mat4.rotate(rightCubeMatrix, rightCubeMatrix, toRadians(currentAngle), [0, 1, 0]);
    }
    else if (key == "ArrowRight")
    {
        currentAngle += angleRot;
        glMatrix.mat4.rotate(topCubeMatrix, topCubeMatrix, toRadians(angleRot), [0, 1, 0]);
        glMatrix.mat4.rotate(botCubeMatrix, botCubeMatrix, toRadians(angleRot), [0, 1, 0]);

        glMatrix.mat4.translate(leftCubeMatrix, identityMatrix, [norm * Math.cos(toRadians(-currentAngle + currentAngleY)) + defaultX, defaultY, norm * Math.sin(toRadians(-currentAngle + currentAngleY)) + defaultZ]);
        glMatrix.mat4.rotate(leftCubeMatrix, leftCubeMatrix, toRadians(currentAngle), [0, 1, 0]);

        glMatrix.mat4.translate(rightCubeMatrix, identityMatrix, [norm * Math.cos(toRadians(180 - currentAngle + currentAngleY)) + defaultX, defaultY, norm * Math.sin(toRadians(180 - currentAngle + currentAngleY)) + defaultZ]);
        glMatrix.mat4.rotate(rightCubeMatrix, rightCubeMatrix, toRadians(currentAngle), [0, 1, 0]);
    }

    else if (key == "a")
    {
        currentAngle -= angleRot;
        currentAngleY -= angleRot;
        glMatrix.mat4.rotate(topCubeMatrix, topCubeMatrix, toRadians(-angleRot), [0, 1, 0]);
        glMatrix.mat4.rotate(botCubeMatrix, botCubeMatrix, toRadians(-angleRot), [0, 1, 0]);
        glMatrix.mat4.rotate(leftCubeMatrix, leftCubeMatrix, toRadians(-angleRot), [0, 1, 0]);
        glMatrix.mat4.rotate(rightCubeMatrix, rightCubeMatrix, toRadians(-angleRot), [0, 1, 0]);
    }
    else if (key == "d")
    {
        currentAngle += angleRot;
        currentAngleY += angleRot;
        glMatrix.mat4.rotate(topCubeMatrix, topCubeMatrix, toRadians(angleRot), [0, 1, 0]);
        glMatrix.mat4.rotate(botCubeMatrix, botCubeMatrix, toRadians(angleRot), [0, 1, 0]);
        glMatrix.mat4.rotate(leftCubeMatrix, leftCubeMatrix, toRadians(angleRot), [0, 1, 0]);
        glMatrix.mat4.rotate(rightCubeMatrix, rightCubeMatrix, toRadians(angleRot), [0, 1, 0]);
    }

    else if (key == "q")
    {
        glMatrix.mat4.rotate(viewMatrixCube, viewMatrixCube, toRadians(-angleRot), [0, 1, 0]);
    }
    else if (key == "e")
    {
        glMatrix.mat4.rotate(viewMatrixCube, viewMatrixCube, toRadians(angleRot), [0, 1, 0]);
    }
}, false);

let loop = () =>
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(viewMatrix, false, viewMatrixCube);  
    
    gl.uniform3fv(vecColors, [0.83, 0.68, 0.215])
    glMatrix.mat4.copy(worldMatrixCube, topCubeMatrix);
    gl.uniformMatrix4fv(worldMatrix, false, worldMatrixCube);  
    gl.drawArrays(gl.TRIANGLES, 0, 40);

    glMatrix.mat4.copy(worldMatrixCube, botCubeMatrix);
    gl.uniformMatrix4fv(worldMatrix, false, worldMatrixCube);
    gl.drawArrays(gl.TRIANGLES, 0, 40);

    gl.uniform3fv(vecColors, [0.75, 0.75, 0.75])
    glMatrix.mat4.copy(worldMatrixCube, leftCubeMatrix);
    gl.uniformMatrix4fv(worldMatrix, false, worldMatrixCube);
    gl.drawArrays(gl.TRIANGLES, 0, 40);

    gl.uniform3fv(vecColors, [0.8, 0.498, 0.196])
    glMatrix.mat4.copy(worldMatrixCube, rightCubeMatrix);
    gl.uniformMatrix4fv(worldMatrix, false, worldMatrixCube);
    gl.drawArrays(gl.TRIANGLES, 0, 40);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);