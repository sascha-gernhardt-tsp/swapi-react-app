import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import type { AxeResults, Result, NodeResult } from "axe-core";

export const useAxe = () => {
  const location = useLocation();
  const runningRef = useRef(false);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const runAxe = async () => {
      if (runningRef.current) return;

      runningRef.current = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Starting accessibility test...");
        const { default: axe } = await import("axe-core");
        const results = await axe.run();
        logResults("Accessibility Results:", results);
      } catch (err) {
        console.error("Error running accessibility tests:", err);
      } finally {
        runningRef.current = false;
      }
    };

    runAxe();
  }, [location]);
};

function logResults(title: string, results: AxeResults) {
  if (results.violations.length) {
    console.group(title);
    console.group(
      "%cAccessibility Violations",
      "color: #f00; font-size: 14px; font-weight: bold;",
    );
    console.log(`Found ${results.violations.length} violations`);

    results.violations.forEach((violation: Result) => {
      console.groupCollapsed(
        `%c${violation.impact?.toUpperCase()} Impact: ${violation.help}`,
        `color: ${getImpactColor(violation.impact)}; font-weight: bold;`,
      );

      console.log("Description:", violation.description);
      console.log("Help URL:", violation.helpUrl);

      console.group("Affected Elements:");
      violation.nodes.forEach((node: NodeResult) => {
        console.log("Target:", node.target.join(" > "));
        console.log("HTML:", node.html);
        if (node.failureSummary) {
          console.log("Issue:", node.failureSummary);
        }
      });
      console.groupEnd();
      console.groupEnd();
    });

    console.groupEnd();
    console.groupEnd();
  } else {
    console.log(
      "%c✓ No accessibility violations found!",
      "color: #4CAF50; font-weight: bold;",
    );
  }
}

function getImpactColor(impact: string | null | undefined) {
  const colors: Record<string, string> = {
    minor: "#2196F3",
    moderate: "#FF9800",
    serious: "#f44336",
    critical: "#d50000",
  };
  return colors[impact || "minor"] || "#000";
}
