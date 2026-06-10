import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle, Ship, Construction, Package, Wrench, ChevronRight } from 'lucide-react';

const services: Record<string, {
  icon: any; title: string; description: string;
  longDescription: string; features: string[];
  process: { step: string; title: string; desc: string }[];
  benefits: string[];
}> = {
  'manutention-portuaire': {
    icon: Ship,
    title: 'Manutention Portuaire',
    description: 'Chargement, déchargement et transit de marchandises avec des équipements de dernière génération.',
    longDescription: `SOLOMA SUARL assure l'ensemble des opérations de manutention portuaire avec une expertise reconnue.
      Notre équipe de professionnels certifiés opère 24h/24, 7j/7 pour garantir la fluidité de vos flux logistiques
      et le respect de vos délais, quelle que soit la nature ou le volume des marchandises.`,
    features: ['Chargement et déchargement de navires', 'Gestion de conteneurs', 'Stockage sécurisé', 'Transit et dédouanement', 'Manutention de vrac', 'Opérations 24h/24'],
    process: [
      { step: '01', title: 'Planification', desc: 'Analyse des besoins, planning des opérations et mobilisation des ressources.' },
      { step: '02', title: 'Déploiement', desc: 'Mise en place des équipements et des équipes sur le site portuaire.' },
      { step: '03', title: 'Exécution', desc: 'Réalisation des opérations selon les standards de sécurité les plus stricts.' },
      { step: '04', title: 'Livraison', desc: 'Remise des marchandises avec documentation complète et rapport d\'opération.' },
    ],
    benefits: ['Réduction des temps d\'escale', 'Sécurisation des marchandises', 'Traçabilité complète', 'Conformité réglementaire'],
  },
  'levage-industriel': {
    icon: Construction,
    title: 'Levage Industriel',
    description: 'Location de grues mobiles et réalisation d\'opérations de levage complexes, de 50T à 500T.',
    longDescription: `Notre division levage industriel dispose d'une flotte de grues mobiles allant de 50T à 500T,
      opérées par des grutiers certifiés CACES. Chaque opération est précédée d'une étude de levage détaillée
      garantissant la sécurité des personnes et des biens.`,
    features: ['Grues mobiles 50T à 500T', 'Grutiers certifiés CACES', 'Études de levage', 'Montage industriel', 'Levage en milieu confiné', 'Intervention d\'urgence'],
    process: [
      { step: '01', title: 'Étude technique', desc: 'Visite de site, analyse des contraintes et rédaction du plan de levage.' },
      { step: '02', title: 'Préparation', desc: 'Sélection de la grue adaptée, acheminement et installation sur site.' },
      { step: '03', title: 'Levage', desc: 'Exécution du levage sous la supervision d\'un chef de manœuvre certifié.' },
      { step: '04', title: 'Repli', desc: 'Démontage de l\'installation et remise en état du site.' },
    ],
    benefits: ['Sécurité maximale', 'Précision au centimètre', 'Respect des délais', 'Équipe expérimentée'],
  },
  'operations-logistiques': {
    icon: Package,
    title: 'Opérations Logistiques',
    description: 'Coordination multimodale et transport terrestre avec suivi GPS en temps réel.',
    longDescription: `Notre service logistique prend en charge l'ensemble de la chaîne de transport de vos marchandises,
      de l'entrepôt de départ jusqu'à la livraison finale. Un suivi GPS en temps réel vous garantit
      une visibilité totale sur vos flux.`,
    features: ['Transport terrestre', 'Entreposage sécurisé', 'Suivi GPS temps réel', 'Coordination multimodale', 'Gestion import/export', 'Dédouanement'],
    process: [
      { step: '01', title: 'Réception', desc: 'Prise en charge et vérification des marchandises à l\'entrepôt.' },
      { step: '02', title: 'Stockage', desc: 'Entreposage sécurisé avec gestion informatisée des stocks.' },
      { step: '03', title: 'Transport', desc: 'Acheminement par le mode de transport le plus adapté.' },
      { step: '04', title: 'Livraison', desc: 'Remise au destinataire avec preuve de livraison électronique.' },
    ],
    benefits: ['Traçabilité totale', 'Délais optimisés', 'Coûts maîtrisés', 'Flexibilité opérationnelle'],
  },
  'services-associes': {
    icon: Wrench,
    title: 'Services Associés',
    description: 'Conseil, inspection et formation pour accompagner vos projets industriels.',
    longDescription: `En complément de nos services principaux, SOLOMA SUARL propose une gamme de prestations
      d'accompagnement pour optimiser vos opérations industrielles et portuaires, de la phase de conseil
      jusqu'au suivi opérationnel.`,
    features: ['Conseil technique', 'Inspection qualité', 'Formation des équipes', 'Maintenance préventive', 'Assistance MOE', 'Audit opérationnel'],
    process: [
      { step: '01', title: 'Diagnostic', desc: 'Analyse de vos besoins et évaluation de votre situation actuelle.' },
      { step: '02', title: 'Proposition', desc: 'Élaboration d\'un plan d\'action personnalisé et chiffré.' },
      { step: '03', title: 'Mise en œuvre', desc: 'Déploiement de la solution avec accompagnement terrain.' },
      { step: '04', title: 'Suivi', desc: 'Évaluation des résultats et ajustements continus.' },
    ],
    benefits: ['Expertise reconnue', 'Approche sur-mesure', 'Transfert de compétences', 'Amélioration continue'],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services[params.slug];
  if (!service) return { title: 'Service introuvable' };
  return { title: service.title, description: service.description };
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services[params.slug];
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <div className="bg-navy pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{service.title}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-sm bg-brand-orange/20 flex items-center justify-center">
              <Icon size={28} className="text-brand-orange" />
            </div>
            <h1 className="font-display font-black text-white text-4xl md:text-5xl uppercase tracking-wide">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="font-display font-bold text-navy text-2xl uppercase tracking-wide mb-4">
                Présentation
              </h2>
              <p className="text-steel text-sm leading-relaxed whitespace-pre-line">
                {service.longDescription}
              </p>
            </div>

            {/* Process */}
            <div>
              <h2 className="font-display font-bold text-navy text-2xl uppercase tracking-wide mb-6">
                Notre Processus
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.process.map((p) => (
                  <div key={p.step} className="bg-white rounded-sm p-5 border border-navy/5 shadow-sm">
                    <div className="font-display font-black text-brand-orange/30 text-3xl leading-none mb-2">
                      {p.step}
                    </div>
                    <h3 className="font-bold text-navy text-sm uppercase tracking-wide mb-1">{p.title}</h3>
                    <p className="text-steel text-xs leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prestations */}
            <div>
              <h2 className="font-display font-bold text-navy text-2xl uppercase tracking-wide mb-4">
                Nos Prestations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-navy/80">
                    <CheckCircle size={15} className="text-brand-orange shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Bénéfices */}
            <div className="bg-navy rounded-sm p-6">
              <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide mb-4">
                Vos Bénéfices
              </h3>
              <ul className="space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-brand-orange rounded-sm p-6">
              <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide mb-2">
                Intéressé ?
              </h3>
              <p className="text-white/80 text-xs mb-4">
                Contactez notre équipe pour discuter de votre projet.
              </p>
              <Link href="/contact" className="block bg-white text-brand-orange font-bold text-xs uppercase
                                               tracking-wider text-center py-3 rounded-sm hover:bg-[#F4F6F9]
                                               transition-colors">
                Demander un devis
              </Link>
            </div>

            {/* Autres services */}
            <div className="bg-white rounded-sm p-5 border border-navy/5 shadow-sm">
              <h3 className="font-semibold text-navy text-xs uppercase tracking-wider mb-3">
                Autres Services
              </h3>
              <div className="space-y-2">
                {Object.entries(services)
                  .filter(([slug]) => slug !== params.slug)
                  .map(([slug, s]) => (
                    <Link
                      key={slug}
                      href={`/services/${slug}`}
                      className="flex items-center justify-between text-sm text-steel
                                 hover:text-brand-orange transition-colors py-1"
                    >
                      {s.title} <ArrowRight size={12} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
