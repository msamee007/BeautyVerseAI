import { getCityById } from "@/lib/config/cities";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityProfile = getCityById(city);

  if (!cityProfile) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-5xl font-bold capitalize">{cityProfile.name} BeautyVerse</h1>
        <p className="text-xl text-muted-foreground">{cityProfile.focus}</p>
        <p className="max-w-2xl mx-auto text-foreground/80">{cityProfile.description}</p>
      </div>

      <h2 className="text-3xl font-bold mb-8">Browse Localities</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cityProfile.localities.map((locality) => (
          <Link
            key={locality.id}
            href={`/${city}/${locality.id}`}
            className="p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all text-center hover:border-primary group"
          >
            <span className="font-medium text-card-foreground group-hover:text-primary transition-colors">
              {locality.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
