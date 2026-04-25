import { EmptyState, Shell } from "../ui/primitives";

export default function OverlayPage() {
  return (
    <Shell title="Overlay OBS" subtitle="Lance une session pour activer l'overlay">
      <EmptyState
        title="Overlay indisponible"
        message="L'overlay sera disponible dès qu'une session sera active. L'URL s'affichera ici, prête à brancher comme Source navigateur dans OBS."
      />
    </Shell>
  );
}
