const serialize = (data) => {
  return JSON.stringify(data);
};

const deserialize = (data) => {
  return JSON.parse(data);
};

export const db = (id) => {
  const ldb = localStorage;

  return (m, data) => {
    if (m === 'read') {
      return deserialize(ldb.getItem(id)) || {};
    }

    if (m === 'write') {
      return ldb.setItem(id, serialize(data));
    }

    if (m === 'remove') return ldb.removeItem(id);
  };
};

export const read = (db) => {
  return db('read');
};

export const write = (db, data) => {
  return db('write', data);
};

export const remove = (db) => {
  return db('remove');
};
