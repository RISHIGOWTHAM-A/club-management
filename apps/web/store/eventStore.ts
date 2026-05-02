"use client";

import { create } from "zustand"
import { supabase } from "../lib/supabase"
import { eventSchema } from "../lib/validation/eventSchema"

type EventState = {
  title: string
  description: string
  date: string
  isSubmitting: boolean
  error: string | null

  setField: (field: string, value: string) => void
  createEvent: () => Promise<boolean>
}

export const useEventStore = create<EventState>((set, get) => ({
  title: "",
  description: "",
  date: "",
  isSubmitting: false,
  error: null,

  setField: (field, value) => {
    set({ [field]: value } as any)
  },

  createEvent: async () => {
    const { title, description, date } = get()

    // Validate with Zod
    const result = eventSchema.safeParse({ title, description, date })

    if (!result.success) {
      set({ error: result.error.issues?.[0]?.message || "Validation failed" })
      return false
    }

    set({ isSubmitting: true, error: null })

    const { error } = await supabase.from("events").insert([
      {
        title: title.trim(),
        description: description.trim(),
        date: new Date(date).toISOString(),
      },
    ])

    if (error) {
      set({ error: error.message, isSubmitting: false })
      return false
    }

    // ✅ Reset after success
    set({
      title: "",
      description: "",
      date: "",
      isSubmitting: false,
      error: null,
    })

    return true
  },
}))