import { Check } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Layouts y secciones reutilizables",
    description: "Arma paginas con bloques reutilizables para acelerar cada entrega.",
  },
  {
    title: "Estilos configurables",
    description: "Adapta tipografias, colores y espaciados para cada marca o producto.",
  },
  {
    title: "Integraciones listas",
    description: "Conecta autenticacion, formularios y APIs sin empezar desde cero.",
  },
  {
    title: "Desarrollo rapido",
    description: "Itera en tiempo real con una experiencia de desarrollo fluida.",
  },
  {
    title: "Responsive por defecto",
    description: "Cada pantalla se adapta automaticamente a movil, tablet y desktop.",
  },
];

export function EasyToUseSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Facil de usar y totalmente personalizable
            </h2>
            <p className="text-lg text-muted-foreground">
              Construye paginas web con una base moderna, clara y lista para
              escalar desde el primer release.
            </p>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature.title} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="size-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="size-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Right Content - Image */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?auto=format&fit=crop&w=1600&q=80"
              alt="Escritorio con laptop y monitor"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
