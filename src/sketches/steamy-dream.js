const fs = require("./shaders/steamy-dream.fs");

const sketch = (p) => {

  let sizes = {};
  let theShader;
  p.isSquare = false;
  p.settings = {
    changeRate: 0.09,
    baseFreq: 10.0,
    numFreqs: 4
  }

  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (p.isSquare) {
      return {width: p.min(width, height), height: p.min(width, height)}
    }
    return {width, height};
  }


  p.mousePressed = function() {
  }

  function setupShader() {
    const varying = "precision highp float; varying vec2 vPos;";

    const vs =
      varying +
      "attribute vec3 aPosition;" +
      "void main() { vPos = (gl_Position = vec4(aPosition,1.0)).xy; }";
    console.log("FS IS:", fs);
    const fs = varying + `
uniform float change_rate;
uniform float base_freq;
uniform int num_freqs;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

float rand(float val) {
    return -1.0 + 2.0 * fract(sin(val)*53.132356);
}

vec2 rand(vec2 st){
    st = vec2(dot(st,vec2(128.1001,311.7)), dot(st,vec2(269.5,183.3)));
    return -1.0 + 2.0 * fract(sin(st)*48.543123);
}

//  Adapted function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 h2rgb(in float h){
    vec3 rgb = clamp(abs(mod(h*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
    return rgb*rgb*(3.0-2.0*rgb);
}

// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( rand(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( rand(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( rand(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( rand(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

float noiseComp(float amp, float freq, vec2 st) {
    return amp * (noise(freq * st)*0.5 + 0.5);
}

float cloud(vec2 st, float seed, float delta, float main_freq, int num_parts) {
    float val = 0.;
    float summed_amp = 0.;
    for (int i = 1; i <= 8; i++) {
        if (num_parts < i) {
            return val / summed_amp;
        }
        float odd = mod(float(i), 2.0) == 1.0 ? 1.0 : 0.0;
        float off = 1000.*rand(seed) + 4.0*float(i-1);
        float amp = 1.0 / pow(2.0 * (1.0 + odd), float(i/2));
        float freq = main_freq * pow(2.0, float(i/2) * (1.0 - 2.0 * odd));
        val += noiseComp(amp, freq, st + noise(st - vec2(100.*rand(off) + delta*rand(off+1.)*u_time, 100.*rand(off+2.) + delta*rand(off+3.)*u_time) + 2.0*u_mouse.xy / u_resolution.xy));
      summed_amp += amp;
    }
    
    return val / summed_amp;
} 

void main() {
    vec2 st = vPos;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 mouse = u_mouse.xy / u_resolution.xy;
    float mid_diag = length(vec2(0.5, 0.5));
  
    vec3 facts = vec3(
        pow(1.0 - min(length(mouse - vec2(0., 1.)), length(mouse-vec2(1., 0.))), 0.5),
        pow(1.0 - min(length(mouse - vec2(0., 0.)), length(mouse-vec2(1., 1.))), 0.5),
        pow(1.0 - length(mouse - vec2(0.5)) / mid_diag, 0.5)
    );
    
    float hue_offset = length(noise(mouse/1.39)) + change_rate*10000.*length(noise(vec2(u_time/150000., 0.0)));
    
    vec3 color = vec3(0.0);

    for (int i = 0; i < 3; i++) {
        float val = facts[i] * cloud(st, float(i), change_rate, base_freq, num_freqs);
        color += val * h2rgb(hue_offset + float(i)/3.0);
    }

  
    gl_FragColor = vec4(color,1.0);
}
`;
    theShader = p.createShader(vs, fs);
    p.shader(theShader);

  }

  function updateShader() {
    console.log("THE SHADER: ", theShader);
    theShader.setUniform("change_rate", p.settings.changeRate / 100);
    theShader.setUniform("base_freq", p.settings.baseFreq);
    theShader.setUniform("num_freqs", p.settings.numFreqs);
    theShader.setUniform("u_time", p.millis() / 1000);
    theShader.setUniform("u_mouse", [p.mouseX, p.mouseY]);
    theShader.setUniform("u_resolution", [sizes.width, sizes.height]);
    console.log("THE SHADER: ", theShader);
  }

  p.windowResized = function() {
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
  }

  p.setup = function() {
    p.colorMode(p.HSB, 1);
    sizes = getCanvasSize();
    p.createCanvas(sizes.width, sizes.height, p.WEBGL);
    setupShader();
    p.noStroke();
  }

  p.draw = function() {
    p.background(0);
    updateShader();
    p.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  }

};

export default sketch;
