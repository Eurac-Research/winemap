type WinemapDescriptionProps = {
  className?: string;
};

export default function WinemapDescription({
  className,
}: WinemapDescriptionProps) {
  return (
    <div className={className}>
      <p>
        The Winemap is a comprehensive digital resource on European
        viticulture. It is aimed towards anyone interested in wine or who works
        in the wine industry or related sectors. The goal of the Winemap is to
        provide an essential resource for understanding wine heritage, climate
        adaptation, and governance frameworks. It combines climate data,
        environmental indicators, data on ecosystem-based adaptation strategies,
        and legal regulations with interactive tools and map-applications to
        support sustainable, climate-smart viticulture.
      </p>
      <p className="mt-3">
        The Winemap is developed by the Institute for Alpine Environment at
        Eurac Research in Bolzano, Italy. Our interdisciplinary research team
        specializes in climate adaptation, environmental science, and
        sustainable agriculture. The data behind the Winemap was generated in
        various scientific projects and publications and is therefore based on
        a collection and harmonization of data from different sources.
      </p>
      <p className="mt-3">
        The Winemap was originally created in the framework of the RESPOnD
        project. RESPOnD is co-financed by the European Regional Development
        Fund through the Interreg Alpine Space programme 2021-2027.
      </p>
    </div>
  );
}
