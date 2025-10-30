import { execSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";
import { join } from "node:path";

import { pascalCase } from "es-toolkit";

function addComponent(componentNames: string[]): void {
  const uiDir = join(process.cwd(), "src", "components", "ui");

  try {
    // Run the shadcn command
    console.log(`📦 Adding components: ${componentNames}`);

    execSync(`bunx shadcn@latest add ${componentNames.join(" ")}`, {
      stdio: "inherit",
    });

    for (const componentName of componentNames) {
      const oldPath = join(uiDir, `${componentName}.tsx`);
      const newPath = join(uiDir, `${pascalCase(componentName)}.tsx`);

      if (existsSync(oldPath)) {
        renameSync(oldPath, newPath);

        console.log(
          `✅ Renamed ${componentName}.tsx to ${pascalCase(componentName)}.tsx`,
        );
      } else {
        console.warn(
          `⚠️ Warning: ${componentName}.tsx not found in components/ui directory`,
        );
      }
    }
  } catch (error) {
    console.error("🚨 Error adding component:", error);
  }
}

const componentNames = process.argv.slice(2);

if (!componentNames.length) {
  console.error("Please provide at least one component name");
  process.exit(1);
}

addComponent(componentNames);
