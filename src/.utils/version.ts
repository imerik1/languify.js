export const buildVersion = (version: string | number) => {
  return `v${version}`;
};

export const parse = (v: string) => {
  const clean = v.replace(/^v/, "");
  const [major, minor, patch] = clean.split(".").map(Number);

  return {
    raw: v,
    major,
    minor,
    patch,
  };
};
