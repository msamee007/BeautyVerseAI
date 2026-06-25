import { getCityById } from "@/lib/config/cities";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LocalityProviderList } from "@/components/LocalityProviderList";

export default async function LocalityPage({
  params,
}: {
  params: Promise<{ city: string; locality: string }>;
}) {
  const { city, locality } = await params;
  const cityProfile = getCityById(city);

  if (!cityProfile) {
    notFound();
  }

  const localityData = cityProfile.localities.find((l) => l.id === locality);

  if (!localityData) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm font-medium text-muted-foreground mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${city}`} className="hover:text-primary transition-colors capitalize">{cityProfile.name}</Link>
        <span>/</span>
        <span className="text-foreground">{localityData.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{localityData.name} Beauty & Grooming</h1>
        <p className="text-lg text-muted-foreground">
          Discover the highest-rated salons and independent stylists in {localityData.name}, {cityProfile.name}.
        </p>
      </div>

      {/* Dynamic List */}
      <LocalityProviderList city={city} locality={locality} localityName={localityData.name} />
    </div>
  );
}
