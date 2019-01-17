import { contents, getContentFromTag } from "organization";

class Tracker {
  constructor(members, shuffled=false) {
    this.length = members.length;
    this.array = Array(this.length).fill().map((_, i) => i);
    this.index = 0;
  }


}


const getMembersFromCategory = (category) => (
  getContentFromTag(category).members
);

const getMembersFromPassivity = (passivity) => {
  let members = [];
  contents.filter(item => item.passive === passivity).forEach((category) => {
    members = members.concat(category.members);
  });
};

const getAllMembers = (category, sameCategory=false) => {
  if (sameCategory) {
    return getMembersFromCategory(category);
  }
  return getMembersFromPassivity(getContentFromTag(category).passive);
};