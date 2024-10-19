import { spawn } from "node:child_process";

const ls = spawn("rspress build", {
  shell: true,
});

ls.stdout.on("data", (data) => {
  console.log(String(data));

  if (String(data).startsWith("success Pages rendered in")) {
    process.exit(0);
  }
});
