import Link from "next/link";
import DatawrapperChart from "@/app/components/DatawrapperChart";

export default function ClimateIndicatorsPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="container mx-auto px-6 py-32 max-w-5xl">
        {/* Page Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">Geographic Indications</h1>

          <p className="text-lg leading-relaxed mb-6">
            Text text text
          </p>

          <div className="my-8">
            <DatawrapperChart
              chartId="DEUDJ/6?dark=true"
              title="Nr. of registered PDOs"
              ariaLabel="Line chart showing the number of registered PDOs over time"
              height={378}
            />
          </div>


          {/* Back to top link */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              ← Back to WINEMAP
            </Link>
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Eurac Research{" "}
            <Link href="/imprint-privacy" className="underline hover:text-gray-400">
              Imprint / Privacy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
