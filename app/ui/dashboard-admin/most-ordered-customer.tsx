import { shadowsIntoLightTwo, newRocker } from "@/app/ui/fonts";

export function MostOrderedCostume({
  name,
  quantity,
}: {
  name: string;
  quantity: number;
}) {
  return (
    <div className="bg-white text-black rounded-lg border border-white">
      <div className={`bg-black text-white px-4 py-2 rounded-t-lg font-semibold ${newRocker.className}`}>
        Kostum Terbanyak
      </div>
      <div className={`p-6 ${shadowsIntoLightTwo.className}`}>
        <h2 className="text-lg font-semibold mb-2">
          Kostum Terbanyak Dipesan Hari Ini:
        </h2>
        {name ? (
          <p>
            <span className="font-bold">{name}</span> sebanyak{" "}
            <span className="font-bold">{quantity}</span> kali
          </p>
        ) : (
          <p>Tidak ada kostum yang dipesan hari ini.</p>
        )}
      </div>
    </div>
  );
}