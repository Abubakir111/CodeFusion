export const Typefiltration = (data) => {
  return data.map((data) => {
    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
      // if (typeof data === 'string') return `${data}`;
      // else return data;
      console.log(data);

      return data;
    } else return [data];
  });
};
export const isPrimitive = (value) => {
  return value !== Object(value); // Если значение не является объектом, значит это примитив
};
