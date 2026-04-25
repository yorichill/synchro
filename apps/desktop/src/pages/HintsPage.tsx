import { EmptyState, Shell } from "../ui/primitives";

export default function HintsPage() {
  return (
    <Shell title="Indices" subtitle="Aucune session active — pas d'indice à afficher">
      <EmptyState
        title="Aucun indice"
        message="Les indices apparaîtront ici dès qu'une session sera lancée."
      />
    </Shell>
  );
}
