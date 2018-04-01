// inspired by Flux Standard Action
export const action = (type, payload) => {
    if (typeof payload === 'undefined') {
      return { type };
    }
    return { type, payload };
  };
