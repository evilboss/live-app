let prettyNumbers = (rawCents) => {
  rawCents |= 0;
  return (rawCents/100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
Modules.both.prettyNumbers = prettyNumbers;
