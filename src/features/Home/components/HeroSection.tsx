import { Button } from "@/components/ui/button";
import { Rocket, Palette, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full bg-primary text-primary-foreground py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Crea paginas web rapidas con Saywa
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Saywa es un framework moderno para lanzar landing pages, sitios
              corporativos y paneles en minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                <Link href="/auth/sign-up">Comenzar con Saywa</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                <Link href="/c/dulce-hogar-reposteria">Ver demo</Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Rocket className="size-5" />
                <span className="text-sm">Setup inicial en minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="size-5" />
                <span className="text-sm">Componentes personalizables</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="size-5" />
                <span className="text-sm">Optimizado para SEO y moviles</span>
              </div>
            </div>
          </div>
          {/* Right Content - Image */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80"
              alt="Monitor mostrando código de programación"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
