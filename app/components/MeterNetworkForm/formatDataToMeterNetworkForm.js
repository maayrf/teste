export const formatDataToForm = (data, listObject) => {
  if (data) {
    const getDataLabel = (key) => {
      let getLabel = '';
      listObject.filter((item) => {
        if (item.key === key) {
          getLabel = item.label;
        }
      });
      return getLabel;
    };
    return {
      key: data.key,
      label: data.key ? getDataLabel(data.key) : '',
    };
  }
};

export const revertFormattedDataOfForm = (data, listObject) => {
  const getDataKey = (label) => {
    let getKey = '';
    listObject.filter((item) => {
      if (item.label === label) {
        getKey = item.key;
      }
    });
    return getKey;
  };

  return data ? getDataKey(data.label) : '';
};
