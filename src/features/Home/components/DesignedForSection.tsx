import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, ShoppingBag, Building2, MessageCircle } from "lucide-react";

const solutions = [
  {
    icon: Lightbulb,
    title: "Startups",
    description:
      "Lanza MVPs y landings de validacion rapidamente sin frenar al equipo.",
  },
  {
    icon: ShoppingBag,
    title: "Agencias digitales",
    description:
      "Estandariza la creacion de sitios para clientes con una base reutilizable.",
  },
  {
    icon: Building2,
    title: "Equipos de producto",
    description:
      "Construye experiencias web mantenibles con arquitectura clara y componentes compartidos.",
  },
  {
    icon: MessageCircle,
    title: "Freelancers",
    description:
      "Entrega proyectos mas rapido con una herramienta flexible para distintos rubros.",
  },
];

export function DesignedForSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Disenado para equipos que construyen en serio
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Card key={solution.title}>
                <CardHeader>
                  <Icon className="size-8 mb-4 text-primary" />
                  <CardTitle>{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{solution.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
