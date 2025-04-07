import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeTab: "booking" | "reservations";
}

export default function Header({ activeTab }: HeaderProps) {
  return (
    <header className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">
        Sapphire Hotel
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={activeTab === "booking" ? "default" : "outline"}
          className={
            activeTab === "booking"
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : ""
          }
          asChild
        >
          <Link to="/">Booking</Link>
        </Button>

        <Button
          variant={activeTab === "reservations" ? "default" : "outline"}
          className={
            activeTab === "reservations"
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : ""
          }
          asChild
        >
          <Link to="/reservations">Reservations</Link>
        </Button>
      </div>
    </header>
  );
}
