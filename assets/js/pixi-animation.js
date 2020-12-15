window.addEventListener('load', function () {
  var parent = document.querySelector("#home-landing-animation");
  const app = new PIXI.Application({transparent: true, resizeTo: parent});
  app.renderer.plugins.interaction.autoPreventDefault = false;
  app.renderer.view.style.touchAction = 'auto';

  parent.appendChild(app.view);

  // TODO: Change geometry on resize event.
  const canvasSize = app.screen.width;
  const geometry = new PIXI.Geometry()
      .addAttribute('aVertexPosition',
          [0, 0,
              canvasSize, 0,
              canvasSize, canvasSize,
              0, canvasSize],
          2)
      .addAttribute('aUvs', // the attribute name
          [0, 0, // u, v
              1, 0, // u, v
              1, 1,
              0, 1], // u, v
          2) // the size of the attribute
      .addIndex([0, 1, 2, 0, 2, 3]);

  const vertexSrc = `

      precision mediump float;

      attribute vec2 aVertexPosition;
      attribute vec2 aUvs;

      uniform mat3 translationMatrix;
      uniform mat3 projectionMatrix;

      varying vec2 vUvs;

      void main() {

          vUvs = aUvs;
          gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

      }`;

  const fragmentSrc = `

      precision mediump float;

      varying vec2 vUvs;

      uniform sampler2D uSampler2;
      uniform float time;

      void main() {

          gl_FragColor = texture2D(uSampler2, vUvs + sin( (time + (vUvs.x) * 14.) ) * 0.1 );
      }`;

  const uniforms = {
      uSampler2: PIXI.Texture.from("/assets/images/old.jpg"),
      time: 0,
  };

  const shader = PIXI.Shader.from(vertexSrc, fragmentSrc, uniforms);

  const quad = new PIXI.Mesh(geometry, shader);

  app.stage.addChild(quad);

  window.addEventListener('resize', resize);

  // Resize function window
  function resize() {
    // XXX: Support break points.
    var ratio;
    if (window.innerWidth <= 550)
      ratio = 0.80;
    else if (window.innerWidth <= 850)
      ratio = 0.75;
    else if (window.innerWidth <= 1100)
      ratio = 0.75;
    else
      ratio = 0.6;
    const canvasSize = window.innerWidth * ratio;
    quad.geometry = new PIXI.Geometry()
      .addAttribute('aVertexPosition',
        [0, 0,
          canvasSize, 0,
          canvasSize, canvasSize,
          0, canvasSize],
        2)
      .addAttribute('aUvs', // the attribute name
          [0, 0, // u, v
              1, 0, // u, v
              1, 1,
              0, 1], // u, v
          2) // the size of the attribute
      .addIndex([0, 1, 2, 0, 2, 3]);

  }

  app.ticker.add((delta) => {
      quad.shader.uniforms.time += 0.1;
  });
});
