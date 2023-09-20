"use client";
import React from "react";

import store from "./lib/redux/store";
import { Provider } from "react-redux";

function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
