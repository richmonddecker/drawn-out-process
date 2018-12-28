import { contents } from "./organization";

let defaults = {};

contents.forEach((category) => {
  defaults[category.tag] = {};
  category.members.forEach((element) => {
    defaults[category.tag][element.tag] = {
      parameters: {},
      attributes: {}
    };
    if (element.parameters) {
      element.parameters.forEach((parameter) => {
        defaults[category.tag][element.tag].parameters[parameter.tag] = parameter.default;
      });
    }
    if (element.attributes) {
      element.attributes.forEach((attribute) => {
        defaults[category.tag][element.tag].attributes[attribute.tag] = attribute.default;
      });
    }
  });
});

export default defaults;