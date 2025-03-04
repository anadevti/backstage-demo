import { createRouter } from '@backstage/plugin-auth-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { providers } from '@backstage/plugin-auth-backend';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    discovery: env.discovery,
    tokenManager: env.tokenManager,
    providerFactories: {
      github: providers.github.create({
        signIn: {
          resolver: async (info, ctx) => {
            const { profile } = info;
            if (!profile.email) {
              throw new Error('Email não encontrado no perfil do GitHub');
            }
            return ctx.signInWithCatalogUser({
              entityRef: { name: profile.email.split('@anadevti')[0] },
            });
          },
        },
      }),
    },
  });
}