import { Command, Flags } from "@oclif/core";

export default class Start extends Command {
  static override description = "Start the server";
  static examples = [
    `<%= config.bin %> <%= command.id %> - Start the sysforgeops server
`,
  ];
  static flags = {
    help: Flags.help(),
  };

  constructor(argv: string[], config: any) {
    super(argv, config);
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Start);
    console.log("Starting the server...");
    return;
  }
}
