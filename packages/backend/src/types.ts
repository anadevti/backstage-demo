import { Config } from '@backstage/config';
import { PluginDatabaseManager } from '@backstage/backend-common';
import { PluginEndpointDiscovery } from '@backstage/backend-common';
import { TokenManager } from '@backstage/backend-common';
import { Logger } from 'winston';

export type PluginEnvironment = {
  logger: Logger;
  database: PluginDatabaseManager;
  config: Config;
  discovery: PluginEndpointDiscovery;
  tokenManager: TokenManager;
};