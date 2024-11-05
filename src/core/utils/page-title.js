/* jshint esversion:6 */

const title = "Facility Integrity Management System | PT Pertamina (Persero)";

export default function getPageTitle(key) {
  const hasKey = key;
  if (hasKey) {
    const pageName = key;
    return `${pageName} - ${title}`;
  }
  return `${title}`;
}
