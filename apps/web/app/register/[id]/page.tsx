"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { motion } from "framer-motion";

export default function ExternalRegister() {
  const { id } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const performRegistration = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        // If not logged in, send them to login first
        router.push("/login");
        return;
      }

      const { error } = await supabase.from("rsvps").insert([
        {
          event_id: id,
          user_id: userData.user.id,
          user_email: userData.user.email,
        },
      ]);

      if (error && error.code !== "23505") { // 23505 is unique violation (already registered)
        setStatus("error");
      } else {
        setStatus("success");
      }
    };

    if (id) performRegistration();
  }, [id, router]);

  return (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-[#0A0C10] border border-white/10 rounded-[3rem] p-12 text-center shadow-2xl">
        {status === "loading" && (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto" />
        )}

        {status === "success" && (
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-[0_0_30px_rgba(79,70,229,0.5)]">
              ✓
            </div>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Success!</h1>
            <p className="text-slate-400 text-sm mb-8">You are officially registered for this event.</p>
            <button onClick={() => router.push("/dashboard")} className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl">
              Go to Dashboard
            </button>
          </motion.div>
        )}

        {status === "error" && (
          <div>
            <div className="h-20 w-20 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              !
            </div>
            <h1 className="text-2xl font-black mb-2">Failed</h1>
            <p className="text-slate-400 text-sm mb-8">Could not complete registration. You might already be registered.</p>
            <button onClick={() => router.push("/dashboard")} className="text-indigo-400 font-bold uppercase text-[10px]">Return to Events</button>
          </div>
        )}
      </div>
    </div>
  );
}