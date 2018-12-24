const vid = file => require(`../videos/${file}`);
const img = file => require(`../images/${file}`);
const com = file => require(`../components/${file}`).default;
const can = file => require(`../sketches/${file}`).default;


export const contents = [
  {
    tag: "creative",
    title: "Creative",
    thumbnail: "",
    passive: false,
    info: "",
    component: com("P5Container"),
    configuration: "CreativeConfiguration",
    members: [
      {
        tag: "chord-art",
        title: "Chord Art",
        thumbnail: "chord-art.png",
        sketch: can("chord-art"),
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
    component: com("P5Container"),
    configuration: "GenerativeConfiguration",
    members: [
      {
        tag: "targets",
        title: "Targets",
        thumbnail: "",
        sketch: can("targets"),
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
        thumbnail: "plasma-ball.png",
        video: vid("plasma-ball.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "hexagon-star",
        title: "Hexagon Star",
        thumbnail: "hexagon-star.png",
        video: vid("hexagon-star.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "xt-square",
        title: "XT-Square",
        thumbnail: "xt-square.png",
        video: vid("xt-square.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "kochpinski",
        title: "Kochpinski",
        thumbnail: "kochpinski.png",
        video: vid("kochpinski.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "snowflake",
        title: "Snowflake",
        thumbnail: "snowflake.png",
        video: vid("snowflake.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "pentaspiral",
        title: "Pentaspiral",
        thumbnail: "pentaspiral.png",
        video: vid("pentaspiral.mp4"),
        date: new Date(2019, 1, 1),
        info: ""
      },
      {
        tag: "bouncy-rose",
        title: "Bouncy Rose",
        thumbnail: "bouncy-rose.png",
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