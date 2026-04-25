import { EmptyState, Shell } from "../ui/primitives";

export default function HistoryPage() {
  return (
    <Shell title="Historique" subtitle="Tes sessions précédentes apparaîtront ici">
      <EmptyState
        title="Aucune session passée"
        message="Termine une première session pour commencer à constituer ton historique."
      />
    </Shell>
  );
}
