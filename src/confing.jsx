import { useSelector } from "react-redux";
import React from "react";
export function baseU() {
  const baseUrl = useSelector((state) => state.baseUrl);

  return baseUrl;
}
