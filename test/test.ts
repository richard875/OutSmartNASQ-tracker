let changed: boolean = false;

const changeState = (changed: boolean) => {
  changed = true;
};

changeState(changed);

console.log(changed);
