export const truncate = (words, length) => {
    let _wd = words?.length && words.trim();
    let wd = "";
    if (_wd?.length > length) {
      wd = `${_wd.slice(0, length)}...`;
    } else {
      wd = _wd;
    }
    return wd;
  };
  