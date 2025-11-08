/**
 * Spell History Archive Page
 * Display completed spells with success tracking and outcomes
 */
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSampleSpells } from "@/lib/utils/spells";
import { SpellHistoryClient } from "@/components/spell-history-client";

export default async function SpellHistoryPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get spells data - filter to completed ones
  const allSpells = getSampleSpells();
  const completedSpells = allSpells.filter(s => s.status === 'completed');

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-b from-[#2C2416] to-[#1A1A1A]">
      <SpellHistoryClient spells={completedSpells} />
    </div>
  );
}
