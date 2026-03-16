import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Layers, Share2, Settings } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Inicia proyectos en minutos",
    description:
      "Crea la base de tu sitio con una estructura lista para produccion desde el primer dia.",
  },
  {
    icon: Layers,
    title: "Sistema de componentes listo",
    description:
      "Reutiliza bloques de interfaz para construir paginas consistentes sin repetir codigo.",
  },
  {
    icon: Share2,
    title: "Publicacion rapida",
    description:
      "Despliega y comparte tu web rapidamente en distintos entornos con una configuracion simple.",
  },
  {
    icon: Settings,
    title: "Configuracion centralizada",
    description:
      "Gestiona estilos, comportamiento y estructura del proyecto en un solo lugar.",
  },
];

export function WhatIsSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Que es Saywa?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Saywa es un framework para generar paginas web rapidas, escalables
            y faciles de mantener.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                    <Icon className="size-6 " />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
