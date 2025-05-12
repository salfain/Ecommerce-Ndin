'use client';

import { ActionResult } from "@/types";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { LogOut } from "lucide-react";
import React from "react";

import { Logout } from "../lib/actions";
import { useFormState } from "react-dom";

const initialState : ActionResult = {
  error: ''
}

export default function FormLogout() {
  const [state, formAction]= useFormState(Logout, initialState)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <form action={formAction}>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </button>
        </form>
      </TooltipTrigger>
      
      <TooltipContent side="right">Logout</TooltipContent>
    </Tooltip>
  );
}
