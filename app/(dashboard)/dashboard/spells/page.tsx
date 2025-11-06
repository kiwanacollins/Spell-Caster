/**
 * My Spells Page
 * Display user's spell requests with filtering and sorting
 */
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSampleSpells } from "@/lib/utils/spells";
import { SpellsPageClient } from "@/components/spells-page-client";

export default async function SpellsPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get spells data (server-side)
  const spells = getSampleSpells();

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-b from-[#2C2416] to-[#1A1A1A]">
      <SpellsPageClient spells={spells} />
    </div>
  );
}
