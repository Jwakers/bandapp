export const objectsToArray = (object, setID = false) => {
    const transformedObject = Object.entries(object).map((obj) => {
        const newObj = { ...obj[1] }
        if (setID) newObj.id = obj[0]
        return newObj
    });
    return transformedObject
};
