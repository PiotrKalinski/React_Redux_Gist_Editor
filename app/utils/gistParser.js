export const getTitle = (gist) => {
    if (!Object.keys(gist.files)) {
      return 'untitled';
    }
    const files = Object.keys(gist.files).reduce(
      (memo, file, index) => {
        const value = Object.values(gist.files)[index];
        if (value !== null) {
          return memo.concat(value.filename);
        }
        return memo;
      }
    , []);
    if (files.length) {
      return files[0];
    }
    else {
      return 'no-files';
    };
  };
