const vid = name => require(`../videos/${name}`);
const img = name => require(`../images/index/${name}`);
const icn = name => require(`../images/icon/${name}`);
const com = name => require(`../components/${name}`).default;
const can = name => require(`../sketches/${name}`).default;
const wid = name => require("../components/widgets")[name];
const pag = name => require(`../components/pages/${name}`).default;


// TODO: ADD A "RANDOM" BUTTON WHICH IS LIKE DEFAULTS, BUT APPLIES RANDOM SETTINGS
// TODO: MADE "INFO" ITEMS READ AS HTML, SO I CAN ADD LINKS AND PARAGRAPHS AND STUFF

export const contents = [
  {
    tag: "informative",
    title: "Informative",
    url: "/",
    thumbnail: "",
    info: "",
    configuration: "CreativeConfiguration",
    noInteraction: true,
    members: [
      {
        tag: "instructions",
        title: "Instructions",
        component: pag("Instructions"),
        thumbnail: icn("instruction.png")
      },
      {
        tag: "purpose",
        title: "Purpose",
        component: pag("Purpose"),
        thumbnail: icn("goal.png")
      },
      {
        tag: "personal",
        title: "Personal",
        component: pag("Personal"),
        thumbnail: icn("question.png")
      },
      {
        tag: "technical",
        title: "Technical",
        component: pag("Technical"),
        thumbnail: icn("computer.png")
      }
    ]
  },
  {
    tag: "creative",
    title: "Creative",
    thumbnail: "",
    passive: false,
    info: "The Creative category is a set of active PODs for you to create your own art. Each POD will define a canvas and a set of rules for drawing, and you must take advantage of these constrainst to produce beautiful designs. Within any single POD, make sure to play around with the parameters and attributes to maximize your artistic potential. Pressing the Save button will download your creation to your device.",
    component: com("P5Canvas"),
    configuration: "CreativeConfiguration",
    members: [
      {
        tag: "chord-art",
        title: "Chord Art",
        thumbnail: img("chord-art.png"),
        sketch: can("chord-art"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        phrase: "Draw colorful strings across a circular surface.",
        info: "This POD allows you to make colorful string art on a circular canvas. When you click on a point, lines are generated randomly to fill in an angled section around this point. The color changes based on the angle around the circle. Closer to the center, the angle span is greater, and the lines less colorful. By changing the controls, you can produce a large number of different styles.",
        parameters: [
          {
            tag: "hueCycles",
            title: "Color Cycles",
            default: 3,
            info: "How many color cycles there are around the circle. With a higher number, the color hue changes more rapidly as the mouse moves around the circle.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1,
              snap: true,
              strict: true
            }
          },
          {
            tag: "hueOffset",
            title: "Color Offset",
            default: 0,
            info: "This is to shift the base hue by a percentage, to change what colors correspond to what point. For example, at 50%, what is normally red will be cyan.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 2
            }
          },
          {
            tag: "lineSpeed",
            title: "Line Speed",
            default: 500,
            info: "How fast the lines are drawn on the image. Specifically, how many lines are drawn per second.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100000,
              step: 100
            }
          },
          {
            tag: "lineThickness",
            title: "Line Thickness",
            default: 1,
            info: "The thickness in pixels of the lines.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 1
            }
          },
          {
            tag: "lineOpacity",
            title: "Line Opacity",
            default: 50,
            info: "The opacity percentage of the lines.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 3
            }
          },
          {
            tag: "spanPower",
            title: "Span Power",
            default: 1,
            info: "How constrained the angle of the lines in. For a higher number, the lines are constrained to a tighter ankle.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1
            }
          },
          {
            tag: "colorPower",
            title: "Color Power",
            default: 2,
            info: "How strongly the color fades towards the center. With a higher value, the color fades less noticeably.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1
            }
          }
        ]
      },
      {
        tag: "polystrings",
        title: "Polystrings",
        thumbnail: img("polystrings.png"),
        sketch: can("polystrings"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        phrase: "Draw using orthogonal lines inside a polygon.",
        info: "Here we explore the effects of orthogonal lines inside a polygon. When you click the mouse inside the polygon, a line will be drawn to project onto each edge possible. The color of the line depends on its length. Tap or drag your pointer around to see what interesting patterns you can make.",
        parameters: [
          {
            tag: "hueCycles",
            title: "Color Cycles",
            info: "How many color cycles exist along the span of this polygon. For higher numbers, the color changes more quickly with mouse movement.",
            default: 2,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1,
              snap: true,
              strict: true
            }
          },
          {
            tag: "hueOffset",
            title: "Color Offset",
            info: "This is to shift the base hue by a percentage, to change what colors correspond to what point. For example, at 50%, what is normally red will be cyan.",
            default: 0,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1
            }
          },
          {
            tag: "lineThickness",
            title: "Line Thickness",
            info: "The thickness in pixels of the lines.",
            default: 2,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 1
            }
          },
          {
            tag: "lineOpacity",
            title: "Line Opacity",
            info: "The opacity percentage of the lines.",
            default: 50,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 1
            }
          }
        ],
        attributes: [
          {
            tag: "numSides",
            title: "Number of Sides",
            info: "The number of sides of the polygon.",
            default: 6,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 3,
              max: 100,
              step: 1,
              snap: true,
              strict: true
            }
          }
        ]
      },
      {
        tag: "flower-webs",
        title: "Flower Webs",
        thumbnail: img("flower-webs.png"),
        sketch: can("flower-webs"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        phrase: "Draw web or feather-like patterns inside a flower.",
        info: "Here you can create interesting designs inside of a flower shape. Web-like curves are drawn based on the location of the pointer, on every petal except where the pointer itself is. This adds an interesting challenge to produce desired patterns. With the petal ratio lowered, the flower looks more like a circle. The color is based on the angle of the pointer around the circle, and the webs are shaped to never leave the flower.",
        parameters: [
          {
            tag: "hueCycles",
            title: "Color Cycles",
            info: "How many color cycles there are around the circle. The higher the value, the more sensitive the color is to changing mouse position.",
            default: 4,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1,
              snap: true,
              strict: true
            }
          },
          {
            tag: "hueOffset",
            title: "Color Offset",
            info: "This is to shift the base hue by a percentage, to change what colors correspond to what point. For example, at 50%, what is normally red will be cyan.",
            default: 0,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1,
              strict: true
            }
          },
          {
            tag: "lineOpacity",
            title: "Line Opacity",
            info: "The opacity percentage of the lines drawn.",
            default: 100,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 1,
              strict: true
            }
          },
          {
            tag: "sinePower",
            title: "Web Power",
            info: "This controls the roundness/squareness of the web shapes. For higher values, the webs appear more square.",
            default: 4,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 2,
              max: 32,
              step: 1,
              strict: true
            }
          },
          {
            tag: "easyMode",
            title: "Easy Mode",
            info: "This toggles easy mode, where the webs drawn fully enclose the circle, for more symmetry.",
            default: false,
            widget: wid("CheckboxWidget")
          }
        ],
        attributes: [
          {
            tag: "numPetals",
            title: "Number of Petals",
            info: "The number of petals in the flower.",
            default: 5,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 3,
              max: 20,
              step: 1,
              strict: true
            }
          },
          {
            tag: "petalRatio",
            title: "Petal Ratio",
            info: "How long the petals are compared to the size of the flower. At 0, it is just a circle.",
            default: 1,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 10,
              step: 0.1,
              precision: 1
            }
          }
        ]
      },
      {
        tag: "falling-trees",
        title: "Falling Trees",
        thumbnail: img("falling-trees.png"),
        sketch: can("falling-trees"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        phrase: "Form and trace colorful tree structures.",
        info: "XXX",
        parameters: [
          {
            tag: "scaleFactor",
            title: "Scale Factor",
            default: 0.5,
            info: "XXX",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0.05,
              max: 5,
              step: 0.05
            }
          },
          {
            tag: "speed",
            title: "Drawing Speed",
            default: 1.0,
            info: "XXX",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0.1,
              max: 10,
              step: 0.1,
              snap: true,
              strict: true
            }
          },
          {
            tag: "thickness",
            title: "Thickness",
            default: 5,
            info: "xxx",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 20,
              step: 1
            }
          },
          {
            tag: "opacity",
            title: "Opacity",
            default: 100,
            info: "xxx",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 2,
              max: 100,
              step: 2
            }
          },
          {
            tag: "steepness",
            title: "Steepness",
            default: 1,
            info: "xxx",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 5,
              step: 0.2
            }
          },
          {
            tag: "leafNumber",
            title: "Branch Number",
            default: 2,
            info: "XXX",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 2,
              max: 10,
              step: 1
            }
          },
          {
            tag: "persistence",
            title: "Persistence",
            default: 0.75,
            info: "XXX",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 1,
              step: 0.05
            }
          },
          {
            tag: "flipside",
            title: "Flipside",
            default: false,
            info: "XXX",
            widget: wid("CheckboxWidget"),
          },
          // {
          //   tag: "easyMode",
          //   title: "Easy Mode",
          //   default: false,
          //   info: "XXX",
          //   widget: wid("CheckboxWidget"),
          // }
        ]
      }
    ]
  },
  {
    tag: "interactive",
    title: "Interactive",
    thumbnail: "",
    passive: false,
    info: "The Interactive category is a set of PODS requiring your participation. Whether by clicking or moving the pointer, you will create and control the interesting visual effects that you see.",
    component: com("P5Canvas"),
    configuration: "CreativeConfiguration",
    members: [
      {
        tag: "galaxy-tracer",
        title: "Galaxy Tracer",
        thumbnail: img("galaxy-tracer.png"),
        sketch: can("galaxy-tracer"),
        date: new Date(2019, 2, 22),
        author: "Justin Richmond-Decker",
        phrase: "Fling a ball to trace out beautiful galaxy patterns.",
        info: "This is a really colorful simulation of 2D harmonic motion. Picture the ball as being fixed between springs. As you drag or fling the ball, it will be pulled back to the center. You can send it in orbit around the center, and watch the path it traces out. Increase the Force Strength to create faster movement, whereas the Damping Factor will affect how fast the motion slows. Change the Line Count to make the appearanace more or less smooth. With 0 lines, you will see only the motion of the ball.",
        parameters: [
          {
            tag: "thickness",
            title: "Line Thickness",
            default: 1,
            info: "The thickness of the lines, in pixels.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 20,
              step: 1
            }
          },
          {
            tag: "force",
            title: "Force Strength",
            default: 5,
            info: "The strength of the spring force.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 20,
              step: 1
            }
          },
          {
            tag: "count",
            title: "Line Count",
            default: 20,
            info: "The number of lines to draw.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1
            }
          },
          {
            tag: "damping",
            title: "Damping Factor",
            default: 1,
            info: "How fast the motion decays.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: -2,
              max: 20,
              step: 1
            }
          },
          {
            tag: "trailLength",
            title: "Trail Length",
            default: 1000,
            info: "How long of a trail to display.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 2000,
              step: 25
            }
          },
        ]
      },
      {
        tag: "doppler",
        title: "Doppler",
        thumbnail: img("doppler.png"),
        sketch: can("doppler"),
        date: new Date(2019, 2, 18),
        author: "Justin Richmond-Decker",
        phrase: "Create circular waves and watch them interact.",
        info: "You've probably played with something like this before, but I promise this one is way trippier. It's fairly self explanatory; just watch colorful circles emanate outwards from your mouse pointer. Move it around and watch them interact. While the pointer is held down, waves will cycle through the color spectrum. Otherwise, their colors are random.",
        parameters: [
          {
            tag: "frequency",
            title: "Wave Frequency",
            default: 5,
            info: "The number of waves generated per second.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0.5,
              max: 20,
              step: 0.5
            }
          },
          {
            tag: "velocity",
            title: "Wave Velocity",
            default: 100,
            info: "The propagation velocity of the wave, in pixels per second.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 25,
              max: 1000,
              step: 25
            }
          },
          {
            tag: "thickness",
            title: "Wave Thickness",
            default: 3,
            info: "The thickness of the circles drawn.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 50,
              step: 2
            }
          },
          {
            tag: "opacity",
            title: "Wave Opacity",
            default: 100,
            info: "The opacity percentage of the circles.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 3
            }
          },
        ]
      },
      {
        tag: "pointers",
        title: "Pointers",
        thumbnail: img("pointers.png"),
        sketch: can("pointers"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        phrase: "Watch colorful lines follow you in waves.",
        info: "These lines will move to point to your pointer, but only after they receive the signal to move. The farther away, the longer this takes, creating wave-like effects. The color of the lines depends on their own angle, as well as the location of your pointer. I highly encourage upping the Pointer Length for very interesting visuals. Also, try quickly clicking or tapping on different points of the screen.",
        parameters: [
          {
            tag: "length",
            title: "Pointer Length",
            default: 1,
            info: "The length of the pointers, as a fraction of their spacing.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0.25,
              max: 10,
              step: 0.25
            }
          },
          {
            tag: "thickness",
            title: "Pointer Thickness",
            default: 2,
            info: "The thickness of the pointers, in pixels.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 20,
              step: 1
            }
          },
          {
            tag: "speed",
            title: "Wave Speed",
            default: 10,
            info: "The speed at which information moves, essentially the speed of the waves.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 2,
              max: 100,
              step: 2
            }
          }
        ],
        attributes: [
          {
            tag: "count",
            title: "Pointer Count",
            default: 25,
            info: "How many rows of pointers there are.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 1,
              strict: true
            }
          }
        ]
      }
    ]
  },
  {
    tag: "generative",
    title: "Generative",
    thumbnail: "",
    passive: true,
    info: "The Generative category is a set of passive PODs, meant purely for viewing enjoyment. Most of them work by randomly generating visuals from a predefined set of rules. So, each time the feel will be similar, but it will never repeat. Note that although these visuals are not interactive, you can still change parameters and attributes to have a large effect on what gets generated.",
    component: com("P5Canvas"),
    configuration: "GenerativeConfiguration",
    members: [
      {
        tag: "wedge-wheel",
        title: "Wedge Wheel",
        thumbnail: img("wedge-wheel.png"),
        sketch: can("wedge-wheel"),
        date: new Date(2019, 5, 19),
        author: "Justin Richmond-Decker",
        phrase: "Watch a spinning wheel of wedges transform.",
        info: "XXX",
        parameters: [
          {
            tag: "changeRate",
            title: "Change Rate",
            info: "How fast the wedge wheel transforms.",
            default: 10,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 2,
              strict: true
            }
          }
        ],
        attributes: [
          {
            tag: "numWedges",
            title: "Number of Wedges",
            info: "The number of wedge slices in the circle.",
            default: 24,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 4,
              max: 100,
              step: 1,
              snap: true,
              strict: true
            }
          },
          {
            tag: "numRings",
            title: "Number of Rings",
            info: "The number of black rings sections in the circle.",
            default: 12,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 2,
              max: 100,
              step: 1,
              snap: true,
              strict: true
            }
          }
        ]
      },
      {
        tag: "steamy-dream",
        title: "Steamy Dream",
        thumbnail: img("steamy-dream.png"),
        sketch: can("steamy-dream"),
        date: new Date(2019, 3, 2),
        author: "Justin Richmond-Decker",
        phrase: "Play with a trippy steam cloud.",
        info: "This is my first foray into shaders. It's a totally different way of programming visuals, using GPUs, and confusing C code. Anyway, this is a fun example of colorful morphing waves created by random noise. You can add to the motion yourself by moving the mouse around.<",
        parameters: [
          {
            tag: "changeRate",
            title: "Change Rate",
            info: "How quickly things change in the dream cloud.",
            default: 10,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 5,
              strict: true
            }
          },
          {
            tag: "baseFreq",
            title: "Base Frequency",
            info: "How high the frequency of the waves is. Higher numbers mean denser waves.",
            default: 10,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 30,
              step: 3,
              strict: true
            }
          },
          {
            tag: "numFreqs",
            title: "Number of Layers",
            info: "How many layers of frequencies should be rendered.",
            default: 4,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 6,
              step: 1,
              strict: true
            }
          }
        ]
      },
      {
        tag: "mandala",
        title: "Mandala",
        thumbnail: img("mandala.png"),
        sketch: can("mandala"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        phrase: "Enjoy a randomly generated moving mandala.",
        info: "This POD uses predefined rules to generate randomized mandala, with randomized motion. Concentric rings are formed with different colors and patterns. They each rotate and expand at changing rates, to provide a very interesting warping effect. Every fixed interval (or if you click), the mandala will regenerate itself to a new random design.",
        parameters: [
          {
            tag: "axialSpeed",
            title: "Axial Speed",
            info: "How fast the rings can rotate around their center.",
            default: 10,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 5,
              strict: true
            }
          },
          {
            tag: "petalSpeed",
            title: "Petal Speed",
            info: "How fast the petals can grow and shrink.",
            default: 10,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 5,
              strict: true
            }
          },
          {
            tag: "radialSpeed",
            title: "Radial Speed",
            info: "How fast the rings can expand and shrink.",
            default: 10,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 5,
              strict: true
            }
          },
          {
            tag: "changeRate",
            title: "Change Rate",
            info: "How often (how many times per minute) the pattern of the mandala regenerates.",
            default: 5,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 5,
              strict: true
            }
          }
        ],
        attributes: [
          {
            tag: "numRings",
            title: "Number of Rings",
            info: "The number of concentric rings to render.",
            default: 10,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 2,
              max: 30,
              step: 1,
              snap: true,
              strict: true
            }
          }
        ]
      },
      {
        tag: "maze-balls",
        title: "Maze Balls",
        thumbnail: img("maze-balls.png"),
        sketch: can("maze-balls"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        phrase: "Watch balls bounce around the walls of a maze.",
        info: "This POD uses an algorithm to randomly generate a maze. It then places a number of colored balls inside the maze with some speed. The balls then bounce off the walls, revealing the shape of the maze. There are also black balls which slightly erase the colors, to provide a more dynamic effect. This can look amazing with a high number of rows. Use \"Reset\" to generate a new empty random maze.",
        parameters: [
          {
            tag: "ballSize",
            title: "Ball Size (%)",
            default: 20,
            info: "The size of the ball as a percentage of the row size.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 30,
              step: 1,
              strict: true
            }
          },
          {
            tag: "ballSpeed",
            title: "Ball Speed",
            default: 3,
            info: "How fast (on average) the balls move around the maze.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0.5,
              max: 5,
              step: 0.5
            }
          },
          {
            tag: "opacity",
            title: "Opacity",
            default: 5,
            info: "The opacity percentage of the balls. With a low opacity (<10), we see interesting fading/blending effects.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 4
            }
          },
          {
            tag: "darkSide",
            title: "Dark Side",
            default: true,
            info: "Whether or not to include the erasing effect of the black balls.",
            widget: wid("CheckboxWidget")
          }
        ],
        attributes: [
          {
            tag: "numRows",
            title: "Number of Rows",
            default: 10,
            info: "The number of rows to generate for this maze. The number of columns is determined accordingly.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 2,
              max: 50,
              step: 1,
              strict: true
            }
          },
          {
            tag: "wallSize",
            title: "Wall Size (%)",
            default: 25,
            info: "How thick the walls are, as a percentage of the row size. With a higher value, the path for the balls is narrower",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 50,
              step: 1,
              strict: true
            }
          },
          {
            tag: "ballDensity",
            title: "Ball Density (%)",
            default: 25,
            info: "How many balls (on average) per unit square. A higher number will cause the maze to fill in much faster.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 3
            }
          }
        ]
      },
      {
        tag: "dvd-sim",
        title: "DVD Simulator",
        thumbnail: img("dvd-sim.png"),
        sketch: can("dvd-sim"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        phrase: "Enjoy everyone's favorite living room pasttime.",
        info: "Watch a piece of colored text bounce around the screen on a simple linear trajectory, just like those DVD screens. Wait for it to hit the corner and lose your shit.",
        parameters: [
          {
            tag: "string",
            title: "Text",
            default: "GOOSE",
            info: "The text to display. Always uses capital letters.",
            map: (str) => str.toUpperCase(),
            widget: wid("TextWidget"),
            widgetProps: {}
          },
          {
            tag: "size",
            title: "Font Size",
            default: 100,
            info: "How large the text is.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 5,
              max: 300,
              step: 5
            }
          },
          {
            tag: "font",
            title: "Font",
            default: "Verdana",
            info: "What font face to use to display the text. (Please choose Comic Sans.)",
            widget: wid("ChoiceWidget"),
            widgetProps: {
              options: [
                {
                  type: "group",
                  name: "Serif",
                  items: [
                    "Georgia",
                    "Palatino",
                    "Times"
                  ]
                },
                {
                  type: "group",
                  name: "Sans-Serif",
                  items: [
                    "Arial",
                    {value: "Comic Sans MS", label: "Comic Sans"},
                    "Impact",
                    "Lucida Grande",
                    "Tahoma",
                    "Verdana"
                  ]
                },
                {
                  type: "group",
                  name: "Monospace",
                  items: [
                    "Courier",
                    "Lucida Console"
                  ]
                }
              ]
            }
          },
          {
            tag: "color",
            title: "Color",
            default: "#FF0000",
            info: "What color to display the text.",
            widget: wid("ColorWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1
            }
          },
          {
            tag: "angle",
            title: "Angle",
            default: 45,
            info: "Controls what angle the text bounces at. Usually this is 45, but go wild.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 90,
              step: 5
            }
          },
          {
            tag: "speed",
            title: "Speed",
            default: 200,
            info: "How fast the text bounces around.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 2000,
              step: 20
            }
          }
        ]
      },
      {
        tag: "helispheres",
        title: "Helispheres",
        thumbnail: img("helispheres.png"),
        sketch: can("helispheres"),
        date: new Date(2019, 2, 20),
        author: "Justin Richmond-Decker",
        phrase: "Watch coloful helices warp and flow in 3D.",
        info: "This is an adaptation of the first project I made in PyOpenGL. We define a helix of spheres in three dimensional space, which a ton of variables. These include, number of loops, number of color cycles, oscillation frequency, radial oscillation, and more. We have these variables vary over time, to produce very randomized but patterned behavior. Pop three of these babies onto the three axial directions, and you get some really nice effects. You can turn them around in space, and zoom in and out.",
        parameters: [
          {
            tag: "maxFrequency",
            title: "Frequency",
            default: 0.6,
            info: "This is the frequency of change/oscillation of the helices. Higher numbers mean faster motion.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 2,
              step: 0.1
            }
          },
          {
            tag: "maxAmplitude",
            title: "Oscillation",
            default: 0.5,
            info: "How significant the size expansion/contraction is of the oscillation.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 1,
              step: 0.1
            }
          },
          {
            tag: "maxLoops",
            title: "Max Loops",
            default: 10,
            info: "The maximum number of loops for a helix.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 20,
              step: 1
            }
          },
          {
            tag: "numBalls",
            title: "Number of Balls",
            default: 100,
            info: "The number of balls per helix.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 10,
              max: 500,
              step: 10
            }
          },
          {
            tag: "ballSize",
            title: "Ball Size",
            default: 2,
            info: "The relative ball size (compared to a calculated default). With higher values, the balls can overlap, creating a cool effect.",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0.2,
              max: 10,
              step: 0.2
            }
          }
        ]
      }
    ]
  },
  {
    tag: "repetitive",
    title: "Repetitive",
    thumbnail: "",
    passive: true,
    info: "This category is for looping visuals, that can repeat endlessly. These are not generated in real time, but instead are effectively just repeating video files played in your browser. These videos are programatically generated frame by frame, and then assembled together.",
    component: com("Repetitive"),
    configuration: "RepetitiveConfiguration",
    members: [
      {
        tag: "tribal-stars",
        title: "Tribal Stars",
        thumbnail: img("tribal-stars.png"),
        video: vid("tribal-stars.mp4"),
        date: new Date(2019, 2, 24),
        author: "Justin Richmond-Decker",
        info: ""
      },
      {
        tag: "plasma-ball",
        title: "Plasma Ball",
        thumbnail: img("plasma-ball.png"),
        video: vid("plasma-ball.mp4"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        info: ""
      },
      {
        tag: "hexagon-star",
        title: "Hexagon Star",
        thumbnail: img("hexagon-star.png"),
        video: vid("hexagon-star.mp4"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        info: ""
      },
      {
        tag: "xt-square",
        title: "XT-Square",
        thumbnail: img("xt-square.png"),
        video: vid("xt-square.mp4"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        info: ""
      },
      {
        tag: "kochpinski",
        title: "Kochpinski",
        thumbnail: img("kochpinski.png"),
        video: vid("kochpinski.mp4"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        info: ""
      },
      {
        tag: "snowflake",
        title: "Snowflake",
        thumbnail: img("snowflake.png"),
        video: vid("snowflake.mp4"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        info: ""
      },
      {
        tag: "pentaspiral",
        title: "Pentaspiral",
        thumbnail: img("pentaspiral.png"),
        video: vid("pentaspiral.mp4"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        info: ""
      },
      {
        tag: "bouncy-rose",
        title: "Bouncy Rose",
        thumbnail: img("bouncy-rose.png"),
        video: vid("bouncy-rose.mp4"),
        date: new Date(2019, 2, 7),
        author: "Justin Richmond-Decker",
        info: ""
      }
    ]
  }
];

export const getContentFromTag = (category) => (
  contents.filter(item => item.tag === category)[0]
);

export const getContentFromTags = (category, element) => {
  const content = getContentFromTag(category);
  if (content === undefined) {
    return undefined;
  }
  const member = content.members.filter(item => item.tag === element)[0];
  if (member === undefined) {
    return undefined;
  }
  const {thumbnail, info, members, ...object} = content;
  object.member = member;
  return object;
};