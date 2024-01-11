import { IFilter } from "../hooks/useFilter";

/**
 * Creates the api url to fetch the words from.
 *
 * @param language what language to filter out the words
 * @param filterObj filterObj contains the filters that will be applied to filter out the words
 * @param lastWord lastWord is the last word that has been filtered out before 
 *                 filtering out the first 100 words
 * @returns returns the api address to fetch the words from
 */
export const api_url = (
  language: string,
  filterObj: IFilter,
  lastWord?: string
): string => {
  const lastWordFilter = lastWord ? `&lastWord=${lastWord}` : "";
  let filter: string = "";

  for (const [key, value] of Object.entries(filterObj)) {
    filter += `&${key}=${value}`;
  }

  return `${import.meta.env.VITE_API_URL}?language=${language}${filter}${lastWordFilter}`;
};

/**
 * Determines if an object is empty ({}) or not.
 *
 * @param obj object that will be verified whether it is empty or not
 * @returns a boolean whether the object is empty or not.
 */
export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Returns the last string from the last page.
 *
 * @param obj word object with pages as keys and arrays of strings as values that represents the
 *            strings found by applying the filter.
 * @returns The last string from the last page object.
 */
export const lastWord = (obj: Record<number, string[]>): string => {
  const lastObjNum = Object.keys(obj).length - 1;
  const lastObjArr = obj[lastObjNum];
  return lastObjArr[lastObjArr.length - 1];
};

export const uniqueId = (): string => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}