import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Utensils } from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";

describe("StatCard", () => {
  const defaultProps = {
    title: "Recetas creadas",
    value: 24,
    change: "+12% este mes",
    icon: Utensils,
    bgColor: "bg-white",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  };

  it("should render the title", () => {
    render(<StatCard {...defaultProps} />);

    expect(screen.getByText("Recetas creadas")).toBeInTheDocument();
  });

  it("should render the value", () => {
    render(<StatCard {...defaultProps} />);

    expect(screen.getByText("24")).toBeInTheDocument();
  });

  it("should render the change text", () => {
    render(<StatCard {...defaultProps} />);

    expect(screen.getByText("+12% este mes")).toBeInTheDocument();
  });
});
