
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/typeDefs.ts",
  generates: {
    "./graphql/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;
