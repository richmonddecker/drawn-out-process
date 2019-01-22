import { contents, getContentFromTag } from "./organization";


export class Tracker {
  constructor(category, element, keepCategory, shuffle) {
    this.category = category;
    this.element = element;
    console.log("Keep category:", keepCategory)
    this.keepCategory = keepCategory;
    this.orderedMembers = getAllMembers(category, keepCategory);
    console.log("MEMBERS", this.orderedMembers)
    this.length = this.orderedMembers.length;
    this.shuffle = shuffle;
    this.handleShuffle(shuffle);
    console.log(this.orderedMembers);
  }

  findIndex(category, element) {
    this.index = this.members.findIndex((x) => x.category === category && x.tag === element);
  }

  handleShuffle(shuffle) {
    console.log("Handle shuffle")
    this.shuffle = shuffle;
    if (!shuffle) {
      this.members = this.orderedMembers;
    } else {
      this.members = this.orderedMembers.slice();
      // Shuffle this array.
      // From https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
      for (let i = this.members.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.members[i], this.members[j]] = [this.members[j], this.members[i]];
      }
    }
    this.findIndex(this.category, this.element);
  }
  
  handleKeepCategory(keepCategory) {
    console.log("HANDLE KEEP category", keepCategory)
    this.keepCategory = keepCategory;
    this.orderedMembers = getAllMembers(this.category, keepCategory);
    this.handleShuffle(this.shuffle);
  }

  changeElement(category, element) {
    this.category = category;
    this.element = element;
    console.log("THIS KEEP CAT:")
    const newOrderedMembers = getAllMembers(category, this.keepCategory);
    console.log("NEW ORD: ", newOrderedMembers, "ORD", this.orderedMembers)
    if (JSON.stringify(newOrderedMembers) !== JSON.stringify(this.orderedMembers)) {
      this.orderedMembers = newOrderedMembers;
      console.log("INSIDE");
      this.length = this.orderedMembers.length;
      this.handleShuffle(this.shuffle);
    }
    this.findIndex(category, element);
  }

  nextElement() {
    if (this.index + 1 >= this.members.length) {
      return this.members[0];
    }
    return this.members[this.index + 1];
  }

  previousElement() {
    if (this.index === 0) {
      return this.members[this.members.length - 1];
    }
    return this.members[this.index - 1];
  }
}


const getMembersFromCategory = (category) => (
  getContentFromTag(category).members.map((x) => ({...x, category}))
);

const getMembersFromPassivity = (passivity) => {
  let members = [];
  contents.filter(item => item.passive === passivity).forEach((category) => {
    members = members.concat(getContentFromTag(category.tag).members.map((x) => ({...x, category: category.tag})));
  });
  return members;
};

const getAllMembers = (category, keepCategory) => {
  if (keepCategory) {
    return getMembersFromCategory(category);
  }
  return getMembersFromPassivity(getContentFromTag(category).passive);
};