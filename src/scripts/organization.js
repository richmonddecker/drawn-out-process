const vid = name => require(`../videos/${name}`);
const img = name => require(`../images/${name}`);
const com = name => require(`../components/${name}`).default;
const can = name => require(`../sketches/${name}`).default;
const wid = name => require("../components/widgets")[name];
const pag = name => require(`../components/pages/${name}`).default;


// TODO: ADD A "RANDOM" BUTTON WHICH IS LIKE DEFAULTS, BUT APPLIES RANDOM SETTINGS
// TODO: TRIGGERS INCORRECTLY ACTIVATE WHEN CLICKED ON A PAGE WHERE IT CAN'T BE USED

export const contents = [
  {
    tag: "informative",
    title: "Informative",
    url: "/",
    thumbnail: "",
    passive: false,
    info: "",
    configuration: "CreativeConfiguration",
    members: [
      {
        tag: "instructions",
        title: "Instructions",
        component: pag("Instructions")
      }
    ]
  },
  {
    tag: "creative",
    title: "Creative",
    thumbnail: "",
    passive: false,
    info: "Here are Creative Projects",
    component: com("P5Canvas"),
    configuration: "CreativeConfiguration",
    members: [
      {
        tag: "chord-art",
        title: "Chord Art",
        thumbnail: img("chord-art.png"),
        sketch: can("chord-art"),
        date: new Date(2019, 1, 1),
        info: "",
        parameters: [
          {
            tag: "hueCycles",
            title: "Color Cycles",
            default: 3,
            info: "",
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
            info: "",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
              max: 100,
              step: 1
            }
          },
          {
            tag: "lineSpeed",
            title: "Line Speed",
            default: 500,
            info: "",
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
            info: "",
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
            info: "",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 1
            }
          },
          {
            tag: "spanPower",
            title: "Span Power",
            default: 1,
            info: "",
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
            info: "",
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
        date: new Date(2019, 1, 1),
        info: "",
        parameters: [
          {
            tag: "hueCycles",
            title: "Color Cycles",
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
        date: new Date(2019, 1, 1),
        info: "",
        parameters: [
          {
            tag: "hueCycles",
            title: "Color Cycles",
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
            default: 100,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 1,
              max: 100,
              step: 1
            }
          },
          {
            tag: "sinePower",
            title: "Web Power",
            default: 4,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 2,
              max: 32,
              step: 1
            }
          }
        ],
        attributes: [
          {
            tag: "numPetals",
            title: "Number of Petals",
            default: 5,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 3,
              max: 20,
              step: 1,
              snap: true
            }
          },
          {
            tag: "petalRatio",
            title: "Petal Ratio",
            default: 1,
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0.1,
              max: 10,
              step: 0.1,
              precision: 1
            }
          }
        ]
      }
    ]
  },
  {
    tag: "interactive",
    title: "Interactive",
    thumbnail: "",
    passive: false,
    info: "",
    component: com("P5Canvas"),
    configuration: "CreativeConfiguration",
    members: [
      {
        tag: "pointers",
        title: "Pointers",
        thumbnail: undefined,
        sketch: can("pointers"),
        date: new Date(2019, 1, 1),
        info: ""
      }
    ]
  },
  {
    tag: "generative",
    title: "Generative",
    thumbnail: "",
    passive: true,
    info: "",
    component: com("P5Canvas"),
    configuration: "GenerativeConfiguration",
    members: [
      {
        tag: "maze-balls",
        title: "Maze Balls",
        thumbnail: undefined,//img("maze-balls.png"),
        sketch: can("maze-balls"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "dvd-sim",
        title: "DVD Simulator",
        thumbnail: img("dvd-sim.png"),
        sketch: can("dvd-sim"),
        date: new Date(2019, 1, 1),
        info: "",
        parameters: [
          {
            tag: "string",
            title: "Text",
            default: "GOOSE",
            info: "",
            map: (str) => str.toUpperCase(),
            widget: wid("TextWidget"),
            widgetProps: {}
          },
          {
            tag: "size",
            title: "Font Size",
            default: 100,
            info: "",
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
            info: "",
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
            info: "",
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
            info: "",
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
            info: "",
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
        tag: "mandala",
        title: "Mandala",
        thumbnail: img("mandala.png"),
        sketch: can("mandala"),
        date: new Date(2019, 1, 1),
        info: ""
      }
    ]
  },
  {
    tag: "repetitive",
    title: "Repetitive",
    thumbnail: "",
    passive: true,
    info: "",
    component: com("Repetitive"),
    configuration: "RepetitiveConfiguration",
    members: [
      {
        tag: "plasma-ball",
        title: "Plasma Ball",
        thumbnail: img("plasma-ball.png"),
        video: vid("plasma-ball.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "hexagon-star",
        title: "Hexagon Star",
        thumbnail: img("hexagon-star.png"),
        video: vid("hexagon-star.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "xt-square",
        title: "XT-Square",
        thumbnail: img("xt-square.png"),
        video: vid("xt-square.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "kochpinski",
        title: "Kochpinski",
        thumbnail: img("kochpinski.png"),
        video: vid("kochpinski.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "snowflake",
        title: "Snowflake",
        thumbnail: img("snowflake.png"),
        video: vid("snowflake.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "pentaspiral",
        title: "Pentaspiral",
        thumbnail: img("pentaspiral.png"),
        video: vid("pentaspiral.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "bouncy-rose",
        title: "Bouncy Rose",
        thumbnail: img("bouncy-rose.png"),
        video: vid("bouncy-rose.mp4"),
        date: new Date(2019, 1, 1),
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