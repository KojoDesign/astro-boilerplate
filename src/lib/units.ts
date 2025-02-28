export function url(value: string) {
  return `url(${value})`;
}

export function rem(value: number) {
  return `${value}rem`;
}

export function em(value: number) {
  return `${value}em`;
}

export function px(value: number) {
  return `${value}px`;
}

export function percent(value: number) {
  return `${value}%`;
}

export function variable(name: string) {
  return `--${name}`;
}

export function reference(variable: string) {
  return `var(${variable})`;
}
