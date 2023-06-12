export const BEM = (block) => (elem, mods) => {
  let base = `.${block}`,
    data,
    formatter;

  if (!elem) {
    return base;
  }

  // Handle multiple bases e.g. comma-separated elements.
  let bases = [base];

  if (typeof elem === 'object') {
    mods = elem;
    elem = '';
  }

  if (elem !== '') {
    bases = elem.split(',').map(elem => {
      elem = elem.trim();
      data = { block, elem };
      formatter = template(options.elementFormat);
      return formatter(data);
    });
  }

  return bases.map(base => {
    return mods ? Object.entries(mods).reduce((target, [key, value]) => {
      if (!value) {
        return target;
      }

      data = { base, key, value };
      formatter = value === true ? template(options.modifierFormatTrue) : template(options.modifierFormat);
      target += formatter(data);

      return target;
    }, '') : base;
  }).join(', ');
};
