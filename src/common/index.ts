export const isNotEmpty = (val: any) => {
  return !(
    val == null ||
    val == undefined ||
    (val.hasOwnProperty('length') && val.length == 0) ||
    (val.constructor == Object && Object.keys(val).length == 0) ||
    (val instanceof Date && isNaN(val.getTime()))
  );
};
