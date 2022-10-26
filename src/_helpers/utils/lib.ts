/* eslint-disable no-extend-native */
import { v4 as uuidv4 } from "uuid";

export const addressWalletCompact = (address) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

export async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

export const randomKeyUUID = () => {
  return uuidv4();
};