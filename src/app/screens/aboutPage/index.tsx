import ActiveUsers from "./ActiveUsers";
import ChoosingReason from "./Choosing.reason";

export default function AboutPage() {
  return (
    <div className="about-page">
      <ChoosingReason />
      <ActiveUsers />
    </div>
  );
}
