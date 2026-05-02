type Stack = "frontend" | "backend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";

type FrontendPackage =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style";

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

export const Log = async (
  stack: Stack,
  level: Level,
  pkg: FrontendPackage,
  message: string
) => {
  try {
    await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
  } catch {

  }
};