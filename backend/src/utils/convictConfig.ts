import convict from "convict";
import 'dotenv/config';

const definitions = {
  PORT: {
    env: "PORT",
    format: Number,
    default: 3000,
  },
  HOST: {
    env: "HOST",
    format: String,
    nullable: false,
    default: 'localhost',
  },
  SECRET_KEY: { 
    env: "SECRET_KEY",
    format: String,
    default: 'QWE123',
  },
};

const convictConfig = convict(definitions);
convictConfig.validate({ allowed: "strict" });

export default convictConfig;
