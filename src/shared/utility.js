export const objectCollectionToArray = (objectCollection) => {
    return Object.entries(objectCollection).map((obj) => ({
        ...obj[1],
        id: obj[0],
    }));
};
