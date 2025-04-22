import React from "react";
import { testApi } from "../services/api";
export default function Test() {
  return (
    <div>
      <div>this is a test</div>
      <h1>{testApi}</h1>
    </div>
  );
}
