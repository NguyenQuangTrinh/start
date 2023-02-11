const starColorsHsb = [
    [226,  72, 86],
    [ 61, 100, 94],
    [267,  71, 75],
    [309,  60, 93],
    [  3,  81, 82]
  ];
  
  let stars;


  
  function setup() {
      function r() {
        return random(-700, 700);
      }
  
    createCanvas(windowWidth, windowHeight, WEBGL);

    loadImage('asset/logo500kuser.jpg')

    shineInput = createSlider(10, 100, 50, 1);
    noStroke();

    colorMode(HSB);
    stars = Array.apply(null, Array(1000)).map(() => [
        createVector(r(), r(), r()),
        int(random(starColorsHsb.length))
      ]);
  }
  
  function draw() {
    background(0);


    noStroke();
    ambientLight(60, 60, 60);
    pointLight(40, 100, 100, 0, 0 , 180);
    
    shininess(shineInput.value());
    specularMaterial(250);
    
    sphere(150);

    rotateZ(frameCount / 1000);
    for (const star of stars) {
      push();
      const pos = star[0];
      const z = cos(frameCount / 50) * 500;
      translate(pos.x, pos.y, z + pos.z);
      stroke(...starColorsHsb[star[1]]);
      sphere(1);
      pop();
    }
  }