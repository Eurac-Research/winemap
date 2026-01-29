import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

import allCountries from "@/app/data/countryCodesFromDataHub.io.json";
import pdoData from "@/app/data/PDO_EU_id.json";
import pdoPoints from "@/app/data/pdo-points.json";
import vulnerability from "@/app/data/vulnerability.json";

const datasets = {
  "country-codes": allCountries,
  "pdo-eu-id": pdoData,
  "pdo-points": pdoPoints,
  vulnerability,
};

type DatasetKey = keyof typeof datasets;

export function generateStaticParams() {
  return Object.keys(datasets).map((dataset) => ({ dataset }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ dataset: string }> },
) {
  const { dataset } = await params;
  const key = dataset as DatasetKey;
  const payload = datasets[key];

  if (!payload) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
