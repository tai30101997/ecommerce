import mongoose, { Connection, SchemaOptions } from 'mongoose';

export class MongoDBUtils {

  public static parseHostName(uri: string): string {
    try {
      return new URL(uri).hostname;
    } catch {
      return "unknown-host";
    }
  }

  public static getDefaultSchemaOptions(): SchemaOptions {
    return {
      collation: { locale: "en_US", strength: 1 },
      autoIndex: false,
      bufferCommands: true
    };
  }
  public static async connectDB(uri: string, retry = 3): Promise<boolean> {
    if (!uri) throw new Error(" Missing MongoDB connection URI");

    const host = MongoDBUtils.parseHostName(uri);

    // Global: auto-trim all string
    mongoose.Schema.Types.String.set("trim", true);

    for (let attempt = 1; attempt <= retry; attempt++) {
      console.log(`Connecting to MongoDB @ ${host} (attempt ${attempt}/${retry})`);
      const start = Date.now();
      try {
        await mongoose.connect(uri);
        const ms = Date.now() - start;
        console.log(`Connected to MongoDB @ ${host} in ${(ms / 1000).toFixed(2)}s`);
        return true;
      } catch (err) {
        console.error(`Failed to connect to ${host} on attempt ${attempt}`);
        console.error(err);
        if (attempt < retry) {
          console.log(` Retrying in 2 seconds...\n`);
          await new Promise((res) => setTimeout(res, 2000));
        }
      }
    }

    console.error(" All retry attempts failed.");
    return false;
  }
}
