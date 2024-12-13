export function isValidLabel(label: string): boolean {
  const invalidLabels = ['offensive', 'explicit', 'violence', 'drugs'];

  return invalidLabels.includes(label.toLowerCase());
}
