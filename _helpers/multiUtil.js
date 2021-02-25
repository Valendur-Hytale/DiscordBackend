async function merge(object){
    console.log("actual merge object: " + JSON.stringify(object));
    console.log("");
    let final = object;
    console.log("after merge deep copy");

    for (key in object){
        if (key.includes("__")) {
            var keyString = key.slice(0,key.indexOf("__"));
            if (final[keyString] == undefined){
                final[keyString] = new Array();
            }
            if(Array.isArray(object[key])){
                for (let ref of object[key]){
                     final[keyString].push(ref);
                }
            } else {
                final[keyString].push(object[key]);
            }
            final[key] = undefined;
        }
    }
    return final;
}

function seperate(object){
    console.log("object: " + object + "\n");
    let newObject = deepCopy(object);
    for (key in object){
        if (Array.isArray(object[key])){
            if (object[key].length != 0 ){
                for (ref of object[key]){
                    let keyIndex = key + "__" + ref.OBJECT_TYPE;
                    if (newObject[keyIndex] == undefined){
                        newObject[keyIndex] = [];
                    }
                    newObject[keyIndex].push(ref);
                }
            }
        }
    }
    console.log("newObject: " + JSON.stringify(newObject));
    return newObject;
}

function deepCopy(obj) {
    console.log("deep copy...: " + JSON.stringify(obj));
    var copy;
  
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" !== typeof obj) return obj;
  
    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
  
    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = deepCopy(obj[i]);
      }
      return copy;
    }
  
    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
      }
      return copy;
    }
  
    throw new Error("Unable to copy obj! Its type isn't supported. "  + JSON.stringify(obj));
  }


  module.exports = {
    deepCopy,
    seperate
};