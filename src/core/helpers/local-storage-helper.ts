const getAndParseToJsonItem = (key: string): any => {
  try {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.log("Erro ao tentar realizar o parse(JSON) referente a: ", key);
  }
};

export { getAndParseToJsonItem };
