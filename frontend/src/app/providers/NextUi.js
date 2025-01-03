"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";

function NextUI({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default NextUI;