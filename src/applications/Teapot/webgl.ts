import { mat4 } from "gl-matrix";

import {
  COLOR_BLACK,
  COLOR_RED,
  INDICES,
  NORMALS,
  POSITIONS,
  SOURCE_FS,
  SOURCE_VS,
} from "./constants";

// @see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial
export const main = (canvas: HTMLCanvasElement): void => {
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    return;
  }

  const shaderProgram = gl.createProgram();
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);

  if (
    shaderProgram === null ||
    fragmentShader === null ||
    vertexShader === null
  ) {
    return;
  }

  const indexBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const positionBuffer = gl.createBuffer();

  gl.clearColor(...COLOR_BLACK);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.shaderSource(fragmentShader, SOURCE_FS);
  gl.compileShader(fragmentShader);
  gl.attachShader(shaderProgram, fragmentShader);

  gl.shaderSource(vertexShader, SOURCE_VS);
  gl.compileShader(vertexShader);
  gl.attachShader(shaderProgram, vertexShader);

  gl.linkProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(NORMALS), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(POSITIONS), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(INDICES),
    gl.STATIC_DRAW
  );

  const aVertexNormal = gl.getAttribLocation(shaderProgram, "aVertexNormal");
  const aVertexPosition = gl.getAttribLocation(
    shaderProgram,
    "aVertexPosition"
  );
  const uColor = gl.getUniformLocation(shaderProgram, "uColor");
  const uModelViewMatrix = gl.getUniformLocation(
    shaderProgram,
    "uModelViewMatrix"
  );
  const uNormalMatrix = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
  const uProjectionMatrix = gl.getUniformLocation(
    shaderProgram,
    "uProjectionMatrix"
  );

  let rotation = 0;
  let deltaTime = 0;
  let then = 0;

  const draw = (): void => {
    const modelViewMatrix = mat4.create();
    const normalMatrix = mat4.create();
    const projectionMatrix = mat4.create();

    gl.clearColor(...COLOR_BLACK);
    gl.clearDepth(1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(
      projectionMatrix,
      (45 * Math.PI) / 180,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0, 0, -6]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [0, 0, 1]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation * 0.7, [0, 1, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation * 0.3, [1, 0, 0]);
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(aVertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexNormal);

    gl.useProgram(shaderProgram);

    gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);
    gl.uniformMatrix4fv(uNormalMatrix, false, normalMatrix);
    gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);

    gl.uniform4f(uColor, ...COLOR_RED);

    gl.drawElements(gl.TRIANGLES, INDICES.length, gl.UNSIGNED_SHORT, 0);
  };

  const frameRequestCallback = (now: number): void => {
    now *= 0.001;
    deltaTime = now - then;
    then = now;

    draw();

    rotation += deltaTime;

    requestAnimationFrame(frameRequestCallback);
  };

  requestAnimationFrame(frameRequestCallback);
};
