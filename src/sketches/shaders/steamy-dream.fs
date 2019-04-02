uniform float change_rate 0.09
uniform float base_freq 10.0
uniform float num_freqs 4

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
        val += noiseComp(amp, freq, st + noise(st - vec2(100.*rand(off) + delta*rand(off+1.)*iTime, 100.*rand(off+2.) + delta*rand(off+3.)*iTime) + 2.0*iMouse.xy / iResolution.xy));
      summed_amp += amp;
    }
    
    return val / summed_amp;
} 

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 st = fragCoord.xy/iResolution.xy;
    st.x *= iResolution.x/iResolution.y;
    vec2 mouse = iMouse.xy / iResolution.xy;
    float mid_diag = length(vec2(0.5, 0.5));
  
    vec3 facts = vec3(
        pow(1.0 - min(length(mouse - vec2(0., 1.)), length(mouse-vec2(1., 0.))), 0.5),
        pow(1.0 - min(length(mouse - vec2(0., 0.)), length(mouse-vec2(1., 1.))), 0.5),
        pow(1.0 - length(mouse - vec2(0.5)) / mid_diag, 0.5)
    );
    
    float hue_offset = length(noise(mouse/1.39)) + change_rate*10000.*length(noise(vec2(iTime/150000., 0.0)));
    
    vec3 color = vec3(0.0);

    for (int i = 0; i < 3; i++) {
        float val = facts[i] * cloud(st, float(i), change_rate, base_freq, num_freqs);
        color += val * h2rgb(hue_offset + float(i)/3.0);
    }
  
    fragColor = vec4(color,1.0);
}
