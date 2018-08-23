export default function transformObjectToArray(objectData) {
  return Object.keys(objectData).map((key) => objectData[key]);
}
