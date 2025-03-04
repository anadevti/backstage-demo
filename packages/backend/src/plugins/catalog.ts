import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { DefaultEventBroker } from '@backstage/plugin-events-backend';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addProcessor(new ScaffolderEntitiesProcessor());

  const { processingEngine, router } = await builder.build();

  // Adicione o evento broker ao plugin de catálogo
  const eventBroker = new DefaultEventBroker(env.logger);
  builder.setEventBroker(eventBroker);

  await processingEngine.start();

  return router;
}