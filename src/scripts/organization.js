const vid = name => require(`../videos/${name}`);
const img = name => require(`../images/${name}`);
const com = name => require(`../components/${name}`).default;
const can = name => require(`../sketches/${name}`).default;
const wid = name => require("../components/widgets")[name];


export const contents = [
  {
    tag: "creative",
    title: "Creative",
    thumbnail: "",
    passive: false,
    info: "",
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
            default: 1000,
            info: "",
            widget: wid("NumberWidget"),
            widgetProps: {
              min: 0,
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
              min: 0,
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
              min: 0,
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
              min: 0,
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
              min: 0,
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
        tag: "targets",
        title: "Targets",
        thumbnail: "",
        sketch: can("targets"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      // {
      //   tag: "dots",
      //   title: "Dots",
      //   thumbnail: "",
      //   sketch: can("dots"),
      //   date: new Date(2019, 1, 1),
      //   info: ""
      // }
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